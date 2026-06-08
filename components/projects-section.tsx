"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const projects = [
  {
    title: "MATI — Agentes como Servicio (AaaS)",
    description:
      "Plataforma de Agentes como Servicio que automatiza trámites legales y tributarios para contadores en El Salvador: gestión multi-tenant, alertas de vencimientos, calendario de obligaciones fiscales, generación de documentos legales y un agente de IA conversacional.",
    tags: ["NestJS", "Next.js", "TypeScript", "Prisma", "PostgreSQL", "Anthropic SDK"],
    image: "maticartoon.png",
    imageContain: true,
    github: "https://github.com/yultic/S.I.P.A.T-/tree/main/sipatagent",
    demo: "https://github.com/yultic",
  },
  {
    title: "SKINNER",
    description:
      "Software de gestión administrativa inteligente que combina IA avanzada con gestión de talento humano para optimizar procesos y fortalecer la infraestructura tecnológica de las organizaciones.",
    tags: ["Python", "Transformers", "FastAPI", "Docker", "Nest.js", "Next.js"],
    image: "skinner-logo.png",
    imageContain: true,
    github: "https://github.com/Skinner-SAS-de-CV",
    demo: "https://www.skinnersv.net/companies",
  },
  {
    title: "Run an LLM Locally — Agente local",
    description:
      "Agente de IA que corre un modelo de lenguaje de forma local para captación de leads y agendamiento, sin depender de servicios en la nube.",
    tags: ["TypeScript", "LLM local", "Agentes IA"],
    image: "agente.png",
    github: "https://github.com/Chinaskidev/Run-an-LLM-Locally-.",
    demo: "",
  },
  {
    title: "Doom-Fuzz — Pedal de guitarra (C++)",
    description:
      "Pedal de fuzz/distorsión de alta ganancia implementado como procesador de señal digital (DSP). Núcleo en C++ portable a hardware (Daisy Seed, Teensy) y plugin de audio vía JUCE.",
    tags: ["C++", "Faust", "JUCE", "DSP"],
    image: "Sunn-O))).webp",
    github: "https://github.com/Chinaskidev/Doom-Fuzz",
    demo: "",
  },
  {
    title: "Predicción de ventas para un petshop",
    description:
      "Sistema de predicción de ventas para pymes del sector de alimento para mascotas. El modelo principal, basado en XGBoost para series temporales, alcanza ~77 % de precisión (R²).",
    tags: ["Python", "FastAPI", "MLflow", "Docker", "XGBoost"],
    image: "petshop.jpg",
    github: "https://github.com/yultic",
    demo: "https://github.com/yultic/Petshop-dashboard",
  },
    {
    title: "Your-Mindz",
    description:
      "Aplicación web que permite contratar y agendar sesiones de bienestar mental de forma autónoma: selección de sesión, pago y confirmación con enlace de cita, sin intermediarios.",
    tags: ["TypeScript", "Tailwind CSS", "shadcn/ui"],
    image: "LOGO_2.png",
    github: "https://github.com/yultic/your-mindz",
    demo: "https://your-mindz-web.vercel.app/",
  },
  
  {
    title: "ETL Climático Automatizado para El Salvador",
    description:
      "Pipeline ETL completo de datos meteorológicos que automatiza extracción, transformación y carga del clima para El Salvador con Apache Airflow, Docker y Google Cloud.",
    tags: ["Apache Airflow", "Python", "Google Cloud", "PostgreSQL"],
    image: "lluvias.jpg",
    github: "https://github.com/Chinaskidev/ETL-Clima-ElSalvador",
    demo: "https://github.com/Chinaskidev/ETL-Clima-ElSalvador",
  },
  {
    title: "Agente-en-X-ElizaOs",
    description:
      "Agente de IA basado en ElizaOS, diseñado para operar en X (Twitter) y generar conversaciones especializadas sobre Blockchain y Web3.",
    tags: ["TypeScript", "PLpgSQL", "Shell", "Docker"],
    image: "eliza_banner.jpg",
    github: "https://github.com/Chinaskidev/Agente-en-X-ElizaOs",
    demo: "https://github.com/Chinaskidev/Agente-en-X-ElizaOs",
  },
  {
    title: "Dapp-SivarETH",
    description:
      "Proyecto que integra contratos inteligentes de Ethereum con una interfaz web para crear y gestionar NFTs, con conexión de wallets vía Wagmi.",
    tags: ["Next.js", "TypeScript", "Solidity", "IPFS"],
    image: "sivar.png",
    github: "https://github.com/Chinaskidev/Sivar-ETH",
    demo: "https://github.com/Chinaskidev/Sivar-ETH",
  },
  {
    title: "Raymapu Web",
    description:
      "Plataforma web moderna para digitalizar y posicionar un negocio de apicultura: información institucional, catálogo de productos y una arquitectura frontend limpia y escalable.",
    tags: ["TypeScript", "Tailwind CSS", "shadcn/ui"],
    image: "raymapu2.png",
    github: "https://github.com/yultic/Raymapu-web",
    demo: "https://raymapu.cl/",
  },

]

export function ProjectsSection() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: -1 | 1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector("article")
    const amount = card ? card.clientWidth + 16 : el.clientWidth * 0.9
    el.scrollBy({ left: dir * amount, behavior: "smooth" })
  }

  return (
    <section id="projects" className="py-12 border-t border-border/50">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-semibold tracking-tight">Proyectos</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll(-1)}
            aria-label="Proyecto anterior"
            className="rounded-full border border-border/60 p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Proyecto siguiente"
            className="rounded-full border border-border/60 p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-2"
      >
        {projects.map((project) => {
          const hasDemo = Boolean(project.demo) && project.demo !== project.github
          const primaryLink = project.demo || project.github
          return (
            <article
              key={project.title}
              className="snap-start shrink-0 w-[82%] sm:w-[360px] overflow-hidden rounded-xl border border-border/60 bg-card/40"
            >
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                  }}
                  className={`h-full w-full ${
                    project.imageContain ? "object-contain p-6" : "object-cover"
                  }`}
                />
              </div>
              <div className="p-5">
                <h3 className="font-medium leading-snug">
                  <a
                    href={primaryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {project.title}
                  </a>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                <p className="mt-3 font-mono text-xs text-muted-foreground/80">
                  {project.tags.join(" · ")}
                </p>
                <div className="mt-4 flex gap-4 text-sm">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Código ↗
                  </a>
                  {hasDemo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Demo ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
