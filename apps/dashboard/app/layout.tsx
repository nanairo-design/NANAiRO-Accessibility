import "./globals.css"

export const metadata = {
  title: "NANAiRO Dashboard",
  description: "Tenant and domain management"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
