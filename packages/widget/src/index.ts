import { DEFAULT_CONFIG, type RemoteConfig, type WidgetInitOptions } from "../../core/src/index"

type WidgetState = {
  open: boolean
  theme: "light" | "dark"
  position: "left" | "right"
  textScale: number
  contrast: boolean
  grayscale: boolean
  focus: boolean
  linkHighlight: boolean
  ttsEnabled: boolean
  ttsRate: number
}

type WindowWithNANAiRO = Window & {
  __NANAiRO_WIDGET__?: boolean
}

const HOST_ID = "nanairo-widget-host"
const GLOBAL_STYLE_ID = "nanairo-global-style"

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const createGlobalStyle = () => {
  if (document.getElementById(GLOBAL_STYLE_ID)) return

  const style = document.createElement("style")
  style.id = GLOBAL_STYLE_ID
  style.textContent = `
html.nanairo-text-scale {
  font-size: calc(100% * var(--nanairo-text-scale, 1));
}
html.nanairo-contrast {
  filter: contrast(1.2);
}
html.nanairo-grayscale {
  filter: grayscale(1);
}
html.nanairo-focus *:focus {
  outline: 3px solid #ffbf47 !important;
  outline-offset: 2px;
}
html.nanairo-link-highlight a {
  text-decoration: underline !important;
  text-decoration-thickness: 2px;
  text-underline-offset: 2px;
}
  `.trim()
  document.head.appendChild(style)
}

const applyGlobalState = (state: WidgetState) => {
  const root = document.documentElement

  root.style.setProperty("--nanairo-text-scale", String(state.textScale))

  root.classList.toggle("nanairo-text-scale", state.textScale !== 1)
  root.classList.toggle("nanairo-contrast", state.contrast)
  root.classList.toggle("nanairo-grayscale", state.grayscale)
  root.classList.toggle("nanairo-focus", state.focus)
  root.classList.toggle("nanairo-link-highlight", state.linkHighlight)
}

const createButton = (label: string) => {
  const button = document.createElement("button")
  button.type = "button"
  button.textContent = label
  button.className = "nanairo-btn"
  return button
}

const createToggle = (label: string, initial: boolean, onChange: (next: boolean) => void) => {
  const wrapper = document.createElement("div")
  wrapper.className = "nanairo-row"

  const text = document.createElement("span")
  text.textContent = label
  text.className = "nanairo-label"

  const toggle = document.createElement("button")
  toggle.type = "button"
  toggle.className = "nanairo-toggle"
  toggle.setAttribute("aria-pressed", String(initial))
  toggle.textContent = initial ? "ON" : "OFF"

  toggle.addEventListener("click", () => {
    const next = toggle.getAttribute("aria-pressed") !== "true"
    toggle.setAttribute("aria-pressed", String(next))
    toggle.textContent = next ? "ON" : "OFF"
    onChange(next)
  })

  wrapper.append(text, toggle)
  return wrapper
}

const speakText = (text: string, rate: number) => {
  if (!("speechSynthesis" in window)) return
  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = rate
  window.speechSynthesis.speak(utterance)
}

const getReadableText = () => {
  const selection = window.getSelection()?.toString().trim()
  if (selection) return selection

  const bodyText = document.body?.innerText?.trim() ?? ""
  return bodyText.slice(0, 5000)
}

export const init = ({ config, host }: WidgetInitOptions) => {
  const win = window as WindowWithNANAiRO
  if (win.__NANAiRO_WIDGET__) return
  win.__NANAiRO_WIDGET__ = true

  const resolvedConfig: RemoteConfig = {
    ...DEFAULT_CONFIG,
    ...config,
    features: {
      ...DEFAULT_CONFIG.features,
      ...config.features
    }
  }

  createGlobalStyle()

  const state: WidgetState = {
    open: false,
    theme: resolvedConfig.theme ?? "light",
    position: resolvedConfig.position ?? "right",
    textScale: 1,
    contrast: false,
    grayscale: false,
    focus: false,
    linkHighlight: false,
    ttsEnabled: Boolean(resolvedConfig.features?.tts),
    ttsRate: 1
  }

  applyGlobalState(state)

  const hostElement = host ?? document.createElement("div")
  hostElement.id = HOST_ID
  if (!hostElement.parentElement) document.body.appendChild(hostElement)

  const shadow = hostElement.attachShadow({ mode: "open" })

  const style = document.createElement("style")
  style.textContent = `
:host {
  all: initial;
}
.nanairo-root {
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
  position: fixed;
  bottom: 24px;
  z-index: 2147483647;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.nanairo-root.left {
  left: 24px;
}
.nanairo-root.right {
  right: 24px;
}
.nanairo-button {
  width: 56px;
  height: 56px;
  border-radius: 28px;
  border: none;
  background: var(--nanairo-accent);
  color: var(--nanairo-bg);
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
.nanairo-panel {
  width: 280px;
  padding: 16px;
  border-radius: 16px;
  background: var(--nanairo-bg);
  color: var(--nanairo-fg);
  box-shadow: 0 16px 40px rgba(0,0,0,0.25);
  display: none;
  gap: 12px;
}
.nanairo-panel.open {
  display: flex;
  flex-direction: column;
}
.nanairo-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  font-size: 14px;
}
.nanairo-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.nanairo-label {
  font-size: 13px;
}
.nanairo-btn {
  border: 1px solid var(--nanairo-border);
  background: transparent;
  color: inherit;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
}
.nanairo-toggle {
  min-width: 52px;
  border: 1px solid var(--nanairo-border);
  background: transparent;
  color: inherit;
  padding: 6px 10px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 12px;
}
.nanairo-slider {
  width: 100%;
}
.nanairo-section-title {
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.7;
}
.nanairo-theme-light {
  --nanairo-bg: #ffffff;
  --nanairo-fg: #0b0b0f;
  --nanairo-border: rgba(0,0,0,0.1);
  --nanairo-accent: #0b0b0f;
}
.nanairo-theme-dark {
  --nanairo-bg: #0f1115;
  --nanairo-fg: #f3f3f3;
  --nanairo-border: rgba(255,255,255,0.2);
  --nanairo-accent: #f3f3f3;
}
  `.trim()

  const root = document.createElement("div")
  root.className = `nanairo-root ${state.position}`
  root.classList.add(state.theme === "dark" ? "nanairo-theme-dark" : "nanairo-theme-light")

  const button = document.createElement("button")
  button.type = "button"
  button.className = "nanairo-button"
  button.textContent = "N"
  button.setAttribute("aria-label", "Open accessibility tools")

  const panel = document.createElement("div")
  panel.className = "nanairo-panel"

  const header = document.createElement("div")
  header.className = "nanairo-header"
  header.textContent = "NANAiRO"

  const closeButton = createButton("Close")
  closeButton.addEventListener("click", () => {
    state.open = false
    panel.classList.remove("open")
  })
  header.appendChild(closeButton)

  button.addEventListener("click", () => {
    state.open = !state.open
    panel.classList.toggle("open", state.open)
  })

  const textSectionTitle = document.createElement("div")
  textSectionTitle.className = "nanairo-section-title"
  textSectionTitle.textContent = "Text"

  const textRow = document.createElement("div")
  textRow.className = "nanairo-row"

  const textLabel = document.createElement("span")
  textLabel.textContent = "Size"
  textLabel.className = "nanairo-label"

  const textControls = document.createElement("div")
  textControls.className = "nanairo-row"

  const decrease = createButton("-")
  const reset = createButton("Reset")
  const increase = createButton("+")

  decrease.addEventListener("click", () => {
    state.textScale = clamp(state.textScale - 0.1, 0.9, 1.6)
    applyGlobalState(state)
  })

  increase.addEventListener("click", () => {
    state.textScale = clamp(state.textScale + 0.1, 0.9, 1.6)
    applyGlobalState(state)
  })

  reset.addEventListener("click", () => {
    state.textScale = 1
    applyGlobalState(state)
  })

  textControls.append(decrease, reset, increase)
  textRow.append(textLabel, textControls)

  const visualSectionTitle = document.createElement("div")
  visualSectionTitle.className = "nanairo-section-title"
  visualSectionTitle.textContent = "Visual"

  const contrastToggle = createToggle("Contrast", false, (next) => {
    state.contrast = next
    applyGlobalState(state)
  })

  const grayscaleToggle = createToggle("Grayscale", false, (next) => {
    state.grayscale = next
    applyGlobalState(state)
  })

  const focusToggle = createToggle("Focus", false, (next) => {
    state.focus = next
    applyGlobalState(state)
  })

  const linkToggle = createToggle("Link Highlight", false, (next) => {
    state.linkHighlight = next
    applyGlobalState(state)
  })

  const uiSectionTitle = document.createElement("div")
  uiSectionTitle.className = "nanairo-section-title"
  uiSectionTitle.textContent = "Widget"

  const themeToggle = createToggle("Dark Theme", state.theme === "dark", (next) => {
    state.theme = next ? "dark" : "light"
    root.classList.toggle("nanairo-theme-dark", next)
    root.classList.toggle("nanairo-theme-light", !next)
  })

  const positionToggle = createToggle("Left Side", state.position === "left", (next) => {
    state.position = next ? "left" : "right"
    root.classList.toggle("left", next)
    root.classList.toggle("right", !next)
  })

  const ttsSectionTitle = document.createElement("div")
  ttsSectionTitle.className = "nanairo-section-title"
  ttsSectionTitle.textContent = "Speech"

  const ttsRow = document.createElement("div")
  ttsRow.className = "nanairo-row"

  const ttsButton = createButton("Read")
  const ttsStop = createButton("Stop")

  ttsButton.addEventListener("click", () => {
    if (!state.ttsEnabled) return
    const text = getReadableText()
    if (text) speakText(text, state.ttsRate)
  })

  ttsStop.addEventListener("click", () => {
    if (!("speechSynthesis" in window)) return
    window.speechSynthesis.cancel()
  })

  ttsRow.append(ttsButton, ttsStop)

  const ttsRateRow = document.createElement("div")
  ttsRateRow.className = "nanairo-row"

  const ttsRateLabel = document.createElement("span")
  ttsRateLabel.className = "nanairo-label"
  ttsRateLabel.textContent = "Rate"

  const ttsRate = document.createElement("input")
  ttsRate.type = "range"
  ttsRate.className = "nanairo-slider"
  ttsRate.min = "0.5"
  ttsRate.max = "2"
  ttsRate.step = "0.1"
  ttsRate.value = String(state.ttsRate)
  ttsRate.addEventListener("input", () => {
    state.ttsRate = Number(ttsRate.value)
  })

  ttsRateRow.append(ttsRateLabel, ttsRate)

  panel.append(
    header,
    textSectionTitle,
    textRow,
    visualSectionTitle,
    contrastToggle,
    grayscaleToggle,
    focusToggle,
    linkToggle,
    uiSectionTitle,
    themeToggle,
    positionToggle
  )

  if (resolvedConfig.features?.tts) {
    panel.append(ttsSectionTitle, ttsRow, ttsRateRow)
  }

  const visualItems: HTMLElement[] = []
  if (!resolvedConfig.features?.textSize) {
    textRow.remove()
    textSectionTitle.remove()
  }
  if (!resolvedConfig.features?.contrast) contrastToggle.remove()
  else visualItems.push(contrastToggle)
  if (!resolvedConfig.features?.grayscale) grayscaleToggle.remove()
  else visualItems.push(grayscaleToggle)
  if (!resolvedConfig.features?.focus) focusToggle.remove()
  else visualItems.push(focusToggle)
  if (!resolvedConfig.features?.linkHighlight) linkToggle.remove()
  else visualItems.push(linkToggle)
  if (visualItems.length === 0) visualSectionTitle.remove()

  root.append(button, panel)
  shadow.append(style, root)
}
