import { DashboardClient } from "./_components/dashboard-client"
import { api } from "../lib/api"

const fallbackStats = {
  activeDomains: 0,
  tenants: 0,
  totalUsage: 0,
  usage24h: 0,
  uptime: "99.9%"
}

export default async function Page() {
  const [initialTenants, initialDomains, initialStats] = await Promise.all([
    api.listTenants().catch(() => []),
    api.listDomains().catch(() => []),
    api.stats().catch(() => fallbackStats)
  ])

  return (
    <DashboardClient
      initialTenants={initialTenants}
      initialDomains={initialDomains}
      initialStats={initialStats}
    />
  )
}
