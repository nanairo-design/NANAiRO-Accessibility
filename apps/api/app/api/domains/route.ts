import { prisma } from "../../../lib/prisma"
import { json, preflight } from "../../../lib/http"
import { toRemoteConfig } from "../../../lib/config"

type DomainBody = {
  tenantId?: string
  domain?: string
}

const createApiKey = () => `nk_${Math.random().toString(36).slice(2, 12)}`

export async function OPTIONS() {
  return preflight()
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const tenantId = url.searchParams.get("tenantId")

  const domains = await prisma.domain.findMany({
    where: tenantId ? { tenantId } : undefined,
    include: {
      settings: true,
      tenant: {
        select: {
          name: true
        }
      },
      _count: {
        select: {
          usageLogs: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return json(
    domains.map((item) => ({
      id: item.id,
      tenantId: item.tenantId,
      tenantName: item.tenant.name,
      domain: item.domain,
      apiKey: item.apiKey,
      createdAt: item.createdAt,
      usageCount: item._count.usageLogs,
      config: item.settings ? toRemoteConfig(item.settings) : null
    }))
  )
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as DomainBody
  const tenantId = body.tenantId?.trim()
  const domain = body.domain?.trim().toLowerCase()

  if (!tenantId || !domain) {
    return json({ error: "tenantId and domain are required" }, 400)
  }

  const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } })
  if (!tenant) {
    return json({ error: "Tenant not found" }, 404)
  }

  const created = await prisma.domain.create({
    data: {
      tenantId,
      domain,
      apiKey: createApiKey(),
      settings: {
        create: {
          version: "1.0.0",
          theme: "dark",
          position: "right",
          tts: true,
          contrast: true,
          translate: false,
          grayscale: true,
          focus: true,
          linkHighlight: true,
          textSize: true
        }
      }
    },
    include: {
      settings: true
    }
  })

  return json(
    {
      id: created.id,
      tenantId: created.tenantId,
      domain: created.domain,
      apiKey: created.apiKey,
      config: created.settings ? toRemoteConfig(created.settings) : null
    },
    201
  )
}
