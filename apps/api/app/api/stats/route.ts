import { prisma } from "../../../lib/prisma"
import { json, preflight } from "../../../lib/http"

export async function OPTIONS() {
  return preflight()
}

export async function GET() {
  const [domainCount, tenantCount, totalUsage, recentUsage] = await Promise.all([
    prisma.domain.count(),
    prisma.tenant.count(),
    prisma.usageLog.count(),
    prisma.usageLog.count({
      where: {
        timestamp: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
      }
    })
  ])

  return json({
    activeDomains: domainCount,
    tenants: tenantCount,
    totalUsage,
    usage24h: recentUsage,
    uptime: "99.9%"
  })
}
