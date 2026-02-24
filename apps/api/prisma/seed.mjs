import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const createApiKey = () => `nk_${Math.random().toString(36).slice(2, 12)}`

async function main() {
  const existingTenant = await prisma.tenant.findFirst({ where: { name: "Demo Tenant" } })

  const tenant =
    existingTenant ??
    (await prisma.tenant.create({
      data: {
        name: "Demo Tenant",
        plan: "pro"
      }
    }))

  const existingDomain = await prisma.domain.findUnique({ where: { domain: "localhost" } })

  const domain =
    existingDomain ??
    (await prisma.domain.create({
      data: {
        tenantId: tenant.id,
        domain: "localhost",
        apiKey: createApiKey()
      }
    }))

  await prisma.setting.upsert({
    where: { domainId: domain.id },
    create: {
      domainId: domain.id,
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
    },
    update: {}
  })

  console.log("Seed complete")
  console.log({ tenantId: tenant.id, domain: domain.domain, apiKey: domain.apiKey })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
