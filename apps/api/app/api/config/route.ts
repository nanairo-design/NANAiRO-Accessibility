import { prisma } from "../../../lib/prisma"
import { json, preflight } from "../../../lib/http"
import { toRemoteConfig } from "../../../lib/config"

export async function OPTIONS() {
  return preflight()
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const key = url.searchParams.get("key")
  const domainParam = url.searchParams.get("domain")

  if (!key || !domainParam) {
    return json({ error: "Missing key or domain" }, 400)
  }

  const domain = domainParam.toLowerCase()

  const entity = await prisma.domain.findFirst({
    where: {
      domain,
      apiKey: key
    },
    include: {
      settings: true
    }
  })

  if (!entity || !entity.settings) {
    return json({ error: "Domain or API key not found" }, 404)
  }

  return json(toRemoteConfig(entity.settings))
}
