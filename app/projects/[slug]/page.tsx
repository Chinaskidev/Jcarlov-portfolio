import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { featuredProjects, getProject } from "@/lib/projects"
import { ProjectImage } from "@/components/project-image"

// Export estático: solo se generan las páginas de los proyectos destacados.
export const dynamicParams = false

export function generateStaticParams() {
  return featuredProjects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  const title = `${project.title} — Juan Carlos Vásquez`
  const description = project.tagline
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [`/portfolio/${project.image}`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="py-8 border-t border-border/50">
      <h2 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)

  if (!project || !project.featured || !project.caseStudy) {
    notFound()
  }

  const { caseStudy } = project
  const hasDemo = Boolean(project.demo) && project.demo !== project.github

  return (
    <>
      {/* Misma estética que la home: siempre en modo oscuro */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.classList.add('dark')`,
        }}
      />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Proyectos
        </Link>

        <header className="mt-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {project.description}
          </p>
          <p className="mt-5 font-mono text-xs text-muted-foreground/80">
            {project.tags.join(" · ")}
          </p>
          <div className="mt-5 flex gap-5 text-sm">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-muted-foreground transition-colors"
            >
              Código ↗
            </a>
            {hasDemo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-muted-foreground transition-colors"
              >
                Demo ↗
              </a>
            )}
          </div>
        </header>

        <div className="mt-10 aspect-video overflow-hidden rounded-xl border border-border/60 bg-muted">
          <ProjectImage
            src={`../../portfolio/${project.image}`}
            alt={project.title}
            className={`h-full w-full ${
              project.imageContain ? "object-contain p-8" : "object-cover"
            }`}
          />
        </div>

        {caseStudy.lead && (
          <p className="mt-10 border-l-2 border-border pl-5 italic text-muted-foreground leading-relaxed">
            {caseStudy.lead}
          </p>
        )}

        <Section title="El problema">
          <p className="text-muted-foreground leading-relaxed">{caseStudy.problem}</p>
        </Section>

        <Section title="Mi rol">
          <p className="text-muted-foreground leading-relaxed">{caseStudy.role}</p>
        </Section>

        <Section title="La solución y las decisiones">
          <ul className="space-y-3">
            {caseStudy.solution.map((item, i) => (
              <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Resultado e impacto">
          <ul className="space-y-3">
            {caseStudy.impact.map((item, i) => (
              <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        {caseStudy.deepDive && (
          <Section title={caseStudy.deepDive.title}>
            <p className="text-muted-foreground leading-relaxed">
              {caseStudy.deepDive.intro}
            </p>
            <div className="mt-6 space-y-7">
              {caseStudy.deepDive.blocks.map((block, i) => (
                <div key={i}>
                  <h3 className="text-sm font-medium text-foreground">{block.heading}</h3>
                  <p className="mt-1.5 text-muted-foreground leading-relaxed">{block.body}</p>
                  {block.formula && (
                    <pre className="mt-3 overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-4 font-mono text-xs leading-relaxed text-foreground/80">
                      {block.formula}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {caseStudy.video && (
          <Section title="Demo en video">
            <video
              controls
              preload="metadata"
              playsInline
              className="w-full rounded-xl border border-border/60 bg-muted"
            >
              <source src={`../../portfolio/${caseStudy.video}`} type="video/mp4" />
              Tu navegador no puede reproducir el video.
            </video>
          </Section>
        )}

        <div className="pt-10 border-t border-border/50">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a proyectos
          </Link>
        </div>
      </main>
    </>
  )
}
