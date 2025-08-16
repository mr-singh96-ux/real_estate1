import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { AuthProvider } from "@/components/auth/auth-context"
import { PropertyProvider } from "@/lib/property-store"
import { AnalyticsProvider } from "@/lib/analytics-store"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "EstateHub - Find Your Dream Home",
  description: "Modern real estate platform for buying, selling, and renting properties",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
            <PropertyProvider>
              <AnalyticsProvider>{children}</AnalyticsProvider>
            </PropertyProvider>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  )
}
