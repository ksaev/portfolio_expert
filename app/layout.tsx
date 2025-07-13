import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "KOUASSI SIEBE A.E.V - Expert Marketing Digital & Management",
  description:
    "Portfolio professionnel de KOUASSI SIEBE ADELPHE EYMARD VIANNEY, Expert Marketing Digital et Manager. Spécialisé en campagnes publicitaires, génération de leads et transformation digitale.",
  keywords:
    "marketing digital, expert marketing, manager, LinkedIn ads, Facebook ads, génération leads, Abidjan, Côte d'Ivoire, KSAEV, ArtiVisio",
  authors: [{ name: "KOUASSI SIEBE ADELPHE EYMARD VIANNEY" }],
  creator: "KOUASSI SIEBE ADELPHE EYMARD VIANNEY",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://ksaev-marketing.vercel.app",
    title: "KOUASSI SIEBE A.E.V - Expert Marketing Digital",
    description:
      "Expert Marketing Digital et Manager - Spécialiste en campagnes publicitaires et transformation digitale",
    siteName: "KSAEV Marketing Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "KOUASSI SIEBE A.E.V - Expert Marketing Digital",
    description: "Expert Marketing Digital et Manager - Spécialiste en campagnes publicitaires",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
