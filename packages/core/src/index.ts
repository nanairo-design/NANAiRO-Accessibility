export const LOADER_VERSION = "1.0.0"

export type RemoteConfig = {
  version: string
  theme?: "light" | "dark"
  position?: "left" | "right"
  features?: {
    tts?: boolean
    contrast?: boolean
    translate?: boolean
    grayscale?: boolean
    focus?: boolean
    linkHighlight?: boolean
    textSize?: boolean
  }
}

export const DEFAULT_CONFIG: RemoteConfig = {
  version: "1.0.0",
  theme: "light",
  position: "right",
  features: {
    tts: true,
    contrast: true,
    translate: false,
    grayscale: true,
    focus: true,
    linkHighlight: true,
    textSize: true
  }
}

export type LoaderUsageEvent = {
  event: string
  payload?: Record<string, unknown>
}

export type LoaderInitOptions = {
  siteKey?: string
  configUrl?: string
  widgetBaseUrl?: string
  usageUrl?: string
  timeoutMs?: number
  retries?: number
}

export type WidgetInitOptions = {
  config: RemoteConfig
  host?: HTMLElement
}
