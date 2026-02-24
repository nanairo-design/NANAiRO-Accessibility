import { prisma } from "../../../lib/prisma"
import { json, preflight } from "../../../lib/http"

type TenantBody = {
  name?: string
  plan?: string
}

export async function OPTIONS() {
  return preflight()
}

export async function GET() {
  const tenants = await prisma.tenant.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          domains: true
        }
      }
    }
  })

  return json(
    tenants.map((tenant) => ({
      id: tenant.id,
      name: tenant.name,
      plan: tenant.plan,
      createdAt: tenant.createdAt,
      domainCount: tenant._count.domains
    }))
  )
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as TenantBody
  const name = body.name?.trim()
  const plan = body.plan?.trim() || "starter"

  if (!name) {
    return json({ error: "Tenant name is required" }, 400)
  }

  const tenant = await prisma.tenant.create({
    data: {
      name,
      plan
    }
  })

  return json(
    {
      id: tenant.id,
      name: tenant.name,
      plan: tenant.plan,
      domainCount: 0
    },
    201
  )
}
