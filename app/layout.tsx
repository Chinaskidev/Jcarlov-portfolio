import type React from "react"
import type { Metadata } from "next"
import { Cinzel, DM_Sans, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const cinzel = Cinzel({
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
const SITE_URL = "https://jcarlov.yultic.dev"
const OG_IMAGE = `${SITE_URL}/og-image.png`
const OG_DESCRIPTION = "Desarrollo de software e Inteligencia Artificial. Proyectos en IA, consultoría y Web3."

// Cloudflare Web Analytics (gratis, sin cookies, sin dominio propio).
// Pega aquí el token que te da Cloudflare en: Web Analytics → Add a site → modo JS snippet.
// Mientras esté vacío, el script no se carga ni se registran visitas.
const CLOUDFLARE_ANALYTICS_TOKEN = "0aa2b7c86ace45c4b76622688d2f5783"

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
      <body className={`${cinzel.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-sans antialiased grain-overlay`}>
        {children}
        {CLOUDFLARE_ANALYTICS_TOKEN && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: CLOUDFLARE_ANALYTICS_TOKEN })}
          />
        )}
      </body>
    </html>
  )
}
