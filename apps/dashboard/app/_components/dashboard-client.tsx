"use client"

import { useMemo, useState } from "react"
import { api, type Domain, type DomainConfig, type Stats, type Tenant } from "../../lib/api"

type Props = {
  initialTenants: Tenant[]
  initialDomains: Domain[]
  initialStats: Stats
}

const plans = ["starter", "pro", "enterprise"]

const featureLabels: Array<keyof DomainConfig["features"]> = [
  "tts",
  "contrast",
  "translate",
  "grayscale",
  "focus",
  "linkHighlight",
  "textSize"
]

export function DashboardClient({ initialTenants, initialDomains, initialStats }: Props) {
  const [tenants, setTenants] = useState(initialTenants)
  const [domains, setDomains] = useState(initialDomains)
  const [stats, setStats] = useState(initialStats)
  const [tenantName, setTenantName] = useState("")
  const [tenantPlan, setTenantPlan] = useState("starter")
  const [domainValue, setDomainValue] = useState("")
  const [selectedTenantId, setSelectedTenantId] = useState(initialTenants[0]?.id ?? "")
  const [selectedDomainId, setSelectedDomainId] = useState(initialDomains[0]?.id ?? "")
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const selectedDomain = useMemo(
    () => domains.find((domain) => domain.id === selectedDomainId),
    [domains, selectedDomainId]
  )

  const [draftConfig, setDraftConfig] = useState<DomainConfig | null>(selectedDomain?.config ?? null)

  const refreshStats = async () => {
    const next = await api.stats()
    setStats(next)
  }

  const reloadDomains = async () => {
    const next = await api.listDomains()
    setDomains(next)
  }

  const onCreateTenant = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setSaving(true)

    try {
      const tenant = await api.createTenant({ name: tenantName, plan: tenantPlan })
      setTenants((prev) => [tenant, ...prev])
      setSelectedTenantId(tenant.id)
      setTenantName("")
      await refreshStats()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create tenant")
    } finally {
      setSaving(false)
    }
  }

  const onCreateDomain = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setSaving(true)

    try {
      const domain = await api.createDomain({ tenantId: selectedTenantId, domain: domainValue })
      await reloadDomains()
      setSelectedDomainId(domain.id)
      setDraftConfig(domain.config)
      setDomainValue("")
      await refreshStats()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create domain")
    } finally {
      setSaving(false)
    }
  }

  const onSaveSettings = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!selectedDomainId || !draftConfig) return

    setError(null)
    setSaving(true)

    try {
      const next = await api.updateSettings(selectedDomainId, draftConfig)
      setDomains((prev) =>
        prev.map((item) => (item.id === selectedDomainId ? { ...item, config: next } : item))
      )
      await refreshStats()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update settings")
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#1d2433_0%,_#0a0d14_48%,_#040507_100%)] px-6 py-8 text-zinc-100 md:px-10">
      <section className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_1.4fr]">
        <div className="space-y-6 rounded-3xl border border-zinc-800/80 bg-zinc-900/70 p-6 backdrop-blur">
          <h1
            className="text-3xl font-semibold"
            style={{ fontFamily: "\"Avenir Next\", \"Hiragino Sans\", sans-serif" }}
          >
            NANAiRO Dashboard
          </h1>
          <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
            <div className="rounded-xl border border-zinc-700/70 bg-zinc-950/40 p-3">
              <p className="text-zinc-400">Domains</p>
              <p className="mt-1 text-xl font-semibold">{stats.activeDomains}</p>
            </div>
            <div className="rounded-xl border border-zinc-700/70 bg-zinc-950/40 p-3">
              <p className="text-zinc-400">Tenants</p>
              <p className="mt-1 text-xl font-semibold">{stats.tenants}</p>
            </div>
            <div className="rounded-xl border border-zinc-700/70 bg-zinc-950/40 p-3">
              <p className="text-zinc-400">Events(24h)</p>
              <p className="mt-1 text-xl font-semibold">{stats.usage24h}</p>
            </div>
          </div>

          <form onSubmit={onCreateTenant} className="space-y-3 rounded-2xl border border-zinc-700/80 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">Create Tenant</p>
            <input
              value={tenantName}
              onChange={(event) => setTenantName(event.target.value)}
              placeholder="Tenant name"
              className="w-full rounded-lg border border-zinc-600 bg-zinc-950/60 px-3 py-2 text-sm"
              required
            />
            <select
              value={tenantPlan}
              onChange={(event) => setTenantPlan(event.target.value)}
              className="w-full rounded-lg border border-zinc-600 bg-zinc-950/60 px-3 py-2 text-sm"
            >
              {plans.map((plan) => (
                <option key={plan} value={plan}>
                  {plan}
                </option>
              ))}
            </select>
            <button disabled={saving} className="w-full rounded-lg bg-cyan-400 px-3 py-2 text-sm font-semibold text-zinc-950">
              Add Tenant
            </button>
          </form>

          <form onSubmit={onCreateDomain} className="space-y-3 rounded-2xl border border-zinc-700/80 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">Create Domain</p>
            <select
              value={selectedTenantId}
              onChange={(event) => setSelectedTenantId(event.target.value)}
              className="w-full rounded-lg border border-zinc-600 bg-zinc-950/60 px-3 py-2 text-sm"
              required
            >
              <option value="">Select tenant</option>
              {tenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name} ({tenant.plan})
                </option>
              ))}
            </select>
            <input
              value={domainValue}
              onChange={(event) => setDomainValue(event.target.value)}
              placeholder="example.com"
              className="w-full rounded-lg border border-zinc-600 bg-zinc-950/60 px-3 py-2 text-sm"
              required
            />
            <button disabled={saving || !selectedTenantId} className="w-full rounded-lg bg-emerald-400 px-3 py-2 text-sm font-semibold text-zinc-950">
              Add Domain
            </button>
          </form>
        </div>

        <div className="space-y-4 rounded-3xl border border-zinc-800/80 bg-zinc-900/70 p-6 backdrop-blur">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">Domains</p>
            <select
              value={selectedDomainId}
              onChange={(event) => {
                const domainId = event.target.value
                setSelectedDomainId(domainId)
                const domain = domains.find((item) => item.id === domainId)
                setDraftConfig(domain?.config ?? null)
              }}
              className="w-full rounded-lg border border-zinc-600 bg-zinc-950/60 px-3 py-2 text-sm"
            >
              <option value="">Select domain</option>
              {domains.map((domain) => (
                <option key={domain.id} value={domain.id}>
                  {domain.domain} ({domain.tenantName})
                </option>
              ))}
            </select>
            {selectedDomain ? (
              <p className="text-xs text-zinc-400">API Key: {selectedDomain.apiKey}</p>
            ) : null}
          </div>

          {draftConfig ? (
            <form onSubmit={onSaveSettings} className="space-y-4">
              <div className="grid gap-3 md:grid-cols-3">
                <label className="space-y-1 text-sm">
                  <span className="text-zinc-400">Version</span>
                  <input
                    value={draftConfig.version}
                    onChange={(event) => setDraftConfig({ ...draftConfig, version: event.target.value })}
                    className="w-full rounded-lg border border-zinc-600 bg-zinc-950/60 px-3 py-2"
                  />
                </label>
                <label className="space-y-1 text-sm">
                  <span className="text-zinc-400">Theme</span>
                  <select
                    value={draftConfig.theme}
                    onChange={(event) =>
                      setDraftConfig({ ...draftConfig, theme: event.target.value as DomainConfig["theme"] })
                    }
                    className="w-full rounded-lg border border-zinc-600 bg-zinc-950/60 px-3 py-2"
                  >
                    <option value="light">light</option>
                    <option value="dark">dark</option>
                  </select>
                </label>
                <label className="space-y-1 text-sm">
                  <span className="text-zinc-400">Position</span>
                  <select
                    value={draftConfig.position}
                    onChange={(event) =>
                      setDraftConfig({
                        ...draftConfig,
                        position: event.target.value as DomainConfig["position"]
                      })
                    }
                    className="w-full rounded-lg border border-zinc-600 bg-zinc-950/60 px-3 py-2"
                  >
                    <option value="left">left</option>
                    <option value="right">right</option>
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {featureLabels.map((feature) => (
                  <label key={feature} className="flex items-center justify-between rounded-lg border border-zinc-700 px-3 py-2 text-sm">
                    <span>{feature}</span>
                    <input
                      type="checkbox"
                      checked={draftConfig.features[feature]}
                      onChange={(event) =>
                        setDraftConfig({
                          ...draftConfig,
                          features: {
                            ...draftConfig.features,
                            [feature]: event.target.checked
                          }
                        })
                      }
                    />
                  </label>
                ))}
              </div>

              <button disabled={saving} className="rounded-lg bg-amber-300 px-4 py-2 text-sm font-semibold text-zinc-950">
                Save Settings
              </button>
            </form>
          ) : (
            <p className="text-sm text-zinc-400">Select a domain to edit settings.</p>
          )}

          {error ? <p className="rounded-lg bg-red-500/20 px-3 py-2 text-sm text-red-100">{error}</p> : null}
        </div>
      </section>
    </main>
  )
}
