import { prisma } from "../../../lib/prisma"
import { json, preflight } from "../../../lib/http"

type UsageBody = {
  key?: string
  domain?: string
  event?: string
  payload?: Record<string, unknown> | null
}

export async function OPTIONS() {
  return preflight()
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as UsageBody
  const key = body.key?.trim()
  const domain = body.domain?.trim().toLowerCase()
  const event = body.event?.trim()

  if (!key || !domain || !event) {
    return json({ error: "Missing key, domain, or event" }, 400)
  }

  const domainEntity = await prisma.domain.findFirst({
    where: {
      domain,
      apiKey: key
    }
  })

  if (!domainEntity) {
    return json({ error: "Domain or API key not found" }, 404)
  }

  await prisma.usageLog.create({
    data: {
      domainId: domainEntity.id,
      event,
      payload: body.payload ? JSON.stringify(body.payload) : null
    }
  })

  return json({ ok: true }, 201)
}
