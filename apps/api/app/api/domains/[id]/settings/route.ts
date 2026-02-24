import { prisma } from "../../../../../lib/prisma"
import { json, preflight } from "../../../../../lib/http"
import { toRemoteConfig } from "../../../../../lib/config"

type SettingsBody = {
  version?: string
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

export async function OPTIONS() {
  return preflight()
}

export async function GET(_: Request, context: { params: { id: string } }) {
  const domain = await prisma.domain.findUnique({
    where: { id: context.params.id },
    include: { settings: true }
  })

  if (!domain || !domain.settings) {
    return json({ error: "Domain settings not found" }, 404)
  }

  return json(toRemoteConfig(domain.settings))
}

export async function PATCH(request: Request, context: { params: { id: string } }) {
  const body = (await request.json().catch(() => ({}))) as SettingsBody

  const domain = await prisma.domain.findUnique({
    where: { id: context.params.id },
    include: { settings: true }
  })

  if (!domain || !domain.settings) {
    return json({ error: "Domain settings not found" }, 404)
  }

  const next = await prisma.setting.update({
    where: { domainId: domain.id },
    data: {
      version: body.version ?? domain.settings.version,
      theme: body.theme ?? domain.settings.theme,
      position: body.position ?? domain.settings.position,
      tts: body.features?.tts ?? domain.settings.tts,
      contrast: body.features?.contrast ?? domain.settings.contrast,
      translate: body.features?.translate ?? domain.settings.translate,
      grayscale: body.features?.grayscale ?? domain.settings.grayscale,
      focus: body.features?.focus ?? domain.settings.focus,
      linkHighlight: body.features?.linkHighlight ?? domain.settings.linkHighlight,
      textSize: body.features?.textSize ?? domain.settings.textSize
    }
  })

  return json(toRemoteConfig(next))
}
