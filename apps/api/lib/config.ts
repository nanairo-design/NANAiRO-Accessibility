import type { Setting } from "@prisma/client"
import type { RemoteConfig } from "@nanairo/core"

export const toRemoteConfig = (setting: Setting): RemoteConfig => ({
  version: setting.version,
  theme: setting.theme === "dark" ? "dark" : "light",
  position: setting.position === "left" ? "left" : "right",
  features: {
    tts: setting.tts,
    contrast: setting.contrast,
    translate: setting.translate,
    grayscale: setting.grayscale,
    focus: setting.focus,
    linkHighlight: setting.linkHighlight,
    textSize: setting.textSize
  }
})
