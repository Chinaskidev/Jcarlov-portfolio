"use client"

import { useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { featuredProjects, otherProjects } from "@/lib/projects"

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
        <h2 className="text-lg font-semibold tracking-tight">Proyectos destacados</h2>
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
        {featuredProjects.map((project) => {
          const hasDemo = Boolean(project.demo) && project.demo !== project.github
          return (
            <article
              key={project.slug}
              className="group snap-start shrink-0 w-[82%] sm:w-[360px] overflow-hidden rounded-xl border border-border/60 bg-card/40 transition-colors hover:border-border"
            >
              <Link href={`/projects/${project.slug}`} className="block">
                <div className="aspect-video overflow-hidden bg-muted">
                  <img
                    src={`portfolio/${project.image}`}
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
              </Link>
              <div className="p-5">
                <h3 className="font-medium leading-snug">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:underline"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {project.tagline}
                </p>
                <p className="mt-3 font-mono text-xs text-muted-foreground/80">
                  {project.tags.join(" · ")}
                </p>
                <div className="mt-4 flex items-center gap-4 text-sm">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-foreground hover:text-muted-foreground transition-colors"
                  >
                    Ver caso →
                  </Link>
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

      {/* Más proyectos — lista compacta */}
      <h3 className="mt-14 mb-6 text-sm font-mono uppercase tracking-widest text-muted-foreground">
        Más proyectos
      </h3>
      <ul className="divide-y divide-border/50 border-y border-border/50">
        {otherProjects.map((project) => {
          const hasDemo = Boolean(project.demo) && project.demo !== project.github
          return (
            <li
              key={project.slug}
              className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div className="min-w-0">
                <p className="font-medium leading-snug">{project.title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">
                  {project.tagline}
                </p>
              </div>
              <div className="flex shrink-0 gap-4 text-sm">
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
            </li>
          )
        })}
      </ul>
    </section>
  )
}
