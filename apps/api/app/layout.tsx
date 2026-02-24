export const metadata = {
  title: "NANAiRO API",
  description: "NANAiRO config and management API"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
