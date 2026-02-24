export type Tenant = {
  id: string
  name: string
  plan: string
  domainCount: number
}

export type DomainConfig = {
  version: string
  theme: "light" | "dark"
  position: "left" | "right"
  features: {
    tts: boolean
    contrast: boolean
    translate: boolean
    grayscale: boolean
    focus: boolean
    linkHighlight: boolean
    textSize: boolean
  }
}

export type Domain = {
  id: string
  tenantId: string
  tenantName: string
  domain: string
  apiKey: string
  usageCount: number
  config: DomainConfig | null
}

export type Stats = {
  activeDomains: number
  tenants: number
  totalUsage: number
  usage24h: number
  uptime: string
}

const API_BASE = process.env.NEXT_PUBLIC_NANAIRO_API_BASE ?? "http://localhost:4000"

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(body || `Request failed: ${response.status}`)
  }

  return (await response.json()) as T
}

export const api = {
  listTenants: () => request<Tenant[]>("/api/tenants"),
  createTenant: (payload: { name: string; plan: string }) =>
    request<Tenant>("/api/tenants", { method: "POST", body: JSON.stringify(payload) }),
  listDomains: () => request<Domain[]>("/api/domains"),
  createDomain: (payload: { tenantId: string; domain: string }) =>
    request<{ id: string; config: DomainConfig | null }>("/api/domains", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  updateSettings: (domainId: string, payload: DomainConfig) =>
    request<DomainConfig>(`/api/domains/${domainId}/settings`, {
      method: "PATCH",
      body: JSON.stringify(payload)
    }),
  stats: () => request<Stats>("/api/stats")
}
