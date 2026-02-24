import {
  DEFAULT_CONFIG,
  LOADER_VERSION,
  type LoaderInitOptions,
  type LoaderUsageEvent,
  type RemoteConfig
} from "../../core/src/index"

type WindowWithNANAiRO = Window & {
  NANAiRO_CONFIG?: Partial<RemoteConfig>
  __NANAiRO_LOADED__?: boolean
}

const GLOBAL_KEY = "__NANAiRO_LOADED__" as const
const BOOTSTRAP_SCRIPT = document.currentScript as HTMLScriptElement | null

const warn = (message: string, error?: unknown) => {
  if (typeof console !== "undefined") {
    console.warn(`[NANAiRO Loader] ${message}`, error ?? "")
  }
}

const safeJsonParse = <T>(value?: string | null): T | undefined => {
  if (!value) return undefined
  try {
    return JSON.parse(value) as T
  } catch {
    return undefined
  }
}

const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms))

const parseMajor = (version: string) => Number(version.split(".")[0] ?? 0)

const isCompatibleVersion = (remoteVersion: string) => parseMajor(remoteVersion) === parseMajor(LOADER_VERSION)

const resolveApiBase = (configUrl?: string) => {
  if (!configUrl) return undefined
  try {
    const url = new URL(configUrl)
    return `${url.protocol}//${url.host}`
  } catch {
    return undefined
  }
}

const resolveSiteKey = (explicit: string | undefined, configUrl: string | undefined) => {
  if (explicit) return explicit
  if (!configUrl) return undefined
  try {
    return new URL(configUrl).searchParams.get("key") ?? undefined
  } catch {
    return undefined
  }
}

const sendUsageEvent = async (usageUrl: string | undefined, key: string | undefined, event: LoaderUsageEvent) => {
  if (!usageUrl || !key) return

  const body = JSON.stringify({
    key,
    domain: window.location.hostname,
    event: event.event,
    payload: event.payload ?? null
  })

  try {
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      const blob = new Blob([body], { type: "application/json" })
      navigator.sendBeacon(usageUrl, blob)
      return
    }

    await fetch(usageUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true
    })
  } catch {
    // Non-blocking analytics
  }
}

const fetchConfigWithRetry = async (
  url: string,
  timeoutMs: number,
  retries: number
): Promise<RemoteConfig | null> => {
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const controller = "AbortController" in window ? new AbortController() : undefined
      const timeout = controller ? window.setTimeout(() => controller.abort(), timeoutMs) : undefined
      const response = await fetch(url, {
        credentials: "omit",
        signal: controller?.signal
      })
      if (timeout) window.clearTimeout(timeout)

      if (!response.ok) {
        if (attempt < retries) {
          await sleep(200 * (attempt + 1))
          continue
        }
        return null
      }

      return (await response.json()) as RemoteConfig
    } catch (error) {
      if (attempt < retries) {
        await sleep(200 * (attempt + 1))
        continue
      }
      warn("Config fetch failed after retries, falling back to defaults.", error)
      return null
    }
  }

  return null
}

const resolveOptions = (): LoaderInitOptions & { inlineConfig?: Partial<RemoteConfig> } => {
  const script =
    BOOTSTRAP_SCRIPT ??
    (document.querySelector('script[data-key][src*="loader"]') as HTMLScriptElement | null) ??
    (document.querySelector('script[data-config-url][src*="loader"]') as HTMLScriptElement | null)

  const inlineConfig = safeJsonParse<Partial<RemoteConfig>>(script?.dataset.config)

  return {
    siteKey: script?.dataset.key,
    configUrl: script?.dataset.configUrl,
    widgetBaseUrl: script?.dataset.widgetBaseUrl,
    usageUrl: script?.dataset.usageUrl,
    timeoutMs: script?.dataset.timeoutMs ? Number(script.dataset.timeoutMs) : undefined,
    retries: script?.dataset.retries ? Number(script.dataset.retries) : undefined,
    inlineConfig
  }
}

const mergeConfig = (
  defaults: RemoteConfig,
  remote?: Partial<RemoteConfig> | null,
  inline?: Partial<RemoteConfig>,
  global?: Partial<RemoteConfig>
): RemoteConfig => ({
  ...defaults,
  ...remote,
  ...inline,
  ...global,
  features: {
    ...defaults.features,
    ...remote?.features,
    ...inline?.features,
    ...global?.features
  }
})

const loadWidget = async (baseUrl: string, version: string, config: RemoteConfig) => {
  const url = `${baseUrl.replace(/\/$/, "")}/widget-core-${version}.js`
  try {
    const module = await import(/* @vite-ignore */ url)
    if (module?.init && typeof module.init === "function") {
      module.init({ config })
      return true
    }
    warn("Widget module does not export init().")
    return false
  } catch (error) {
    warn("Widget import failed.", error)
    return false
  }
}

export const init = async (options?: LoaderInitOptions) => {
  const win = window as WindowWithNANAiRO
  if (win[GLOBAL_KEY]) return
  win[GLOBAL_KEY] = true

  const resolved = resolveOptions()
  const configUrl = options?.configUrl ?? resolved.configUrl
  const siteKey = resolveSiteKey(options?.siteKey ?? resolved.siteKey, configUrl)
  const apiBase = resolveApiBase(configUrl)
  const usageUrl = options?.usageUrl ?? resolved.usageUrl ?? (apiBase ? `${apiBase}/api/usage` : undefined)
  const widgetBaseUrl = options?.widgetBaseUrl ?? resolved.widgetBaseUrl ?? "https://cdn.nanairo.com/widget"
  const timeoutMs = options?.timeoutMs ?? resolved.timeoutMs ?? 2500
  const retries = options?.retries ?? resolved.retries ?? 2

  let remoteConfig: RemoteConfig | null = null
  if (configUrl) {
    remoteConfig = await fetchConfigWithRetry(configUrl, timeoutMs, retries)
  } else if (siteKey) {
    const url = `https://api.nanairo.com/config?key=${encodeURIComponent(siteKey)}&domain=${encodeURIComponent(
      window.location.hostname
    )}`
    remoteConfig = await fetchConfigWithRetry(url, timeoutMs, retries)
  }

  if (!remoteConfig) {
    await sendUsageEvent(usageUrl, siteKey, {
      event: "config_fetch_failed",
      payload: { timeoutMs, retries }
    })
  }

  if (remoteConfig?.version && !isCompatibleVersion(remoteConfig.version)) {
    warn(`Version mismatch. Loader ${LOADER_VERSION} is incompatible with widget ${remoteConfig.version}`)
    await sendUsageEvent(usageUrl, siteKey, {
      event: "incompatible_version",
      payload: { loader: LOADER_VERSION, widget: remoteConfig.version }
    })
    remoteConfig = {
      ...remoteConfig,
      version: DEFAULT_CONFIG.version
    }
  }

  const finalConfig = mergeConfig(DEFAULT_CONFIG, remoteConfig, resolved.inlineConfig, win.NANAiRO_CONFIG)
  const loaded = await loadWidget(widgetBaseUrl, finalConfig.version, finalConfig)

  await sendUsageEvent(usageUrl, siteKey, {
    event: loaded ? "widget_loaded" : "widget_load_failed",
    payload: { version: finalConfig.version, loaderVersion: LOADER_VERSION }
  })
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    void init()
  })
} else {
  void init()
}
