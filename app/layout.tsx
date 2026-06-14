import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display-family",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-terminal",
  display: "swap",
})

// URL absoluta del sitio en GitHub Pages (incluye basePath). Los crawlers y
// link-previews necesitan URLs absolutas: no resuelven rutas relativas ni el basePath.
const SITE_URL = "https://chinaskidev.github.io/Jcarlov-portfolio"
const OG_IMAGE = `${SITE_URL}/og-image.png`
const OG_DESCRIPTION = "Desarrollo de software e Inteligencia Artificial. Proyectos en IA, consultoría y Web3."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Juan Carlos Vasquez - Portafolio",
  description: "Desarrollo de software y A.I.",
  generator: "yultic.v.1.0.0",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "Juan Carlos Vásquez",
    title: "Juan Carlos Vásquez — Portafolio",
    description: OG_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Juan Carlos Vásquez — Portafolio (terminal Monokai)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Juan Carlos Vásquez — Portafolio",
    description: OG_DESCRIPTION,
    images: [OG_IMAGE],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { try { const d = document.documentElement; const saved = localStorage.getItem('theme'); const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; d.classList.toggle('dark', saved ? saved === 'dark' : prefersDark); } catch (e) {} })();`,
          }}
        />
      </head>
      <body className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-sans antialiased grain-overlay`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
