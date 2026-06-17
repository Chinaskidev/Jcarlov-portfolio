import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, BookOpen, Download, Mail } from "lucide-react"
import { relato } from "@/lib/relato"

export const metadata: Metadata = {
  title: `${relato.title} — ${relato.autor}`,
  description: relato.tagline,
  openGraph: {
    title: `${relato.title} — ${relato.autor}`,
    description: relato.tagline,
    ...(relato.cover ? { images: [`/portfolio/${relato.cover}`] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: `${relato.title} — ${relato.autor}`,
    description: relato.tagline,
  },
}

function Cta() {
  const { cta } = relato
  const hasStore = cta.url.trim().length > 0

  return (
    <aside className="mt-16 rounded-2xl border border-border/60 bg-card/40 p-7 sm:p-9">
      <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
        {hasStore ? "La obra completa" : "Próximamente"}
      </p>

      <h2 className="mt-3 font-display text-2xl sm:text-3xl leading-tight">
        {hasStore ? "¿Querés seguir leyendo?" : "El relato todavía se está escribiendo"}
      </h2>

      <p className="mt-3 text-muted-foreground leading-relaxed">
        {hasStore
          ? "Leíste el fragmento de muestra. La obra completa está disponible para leer online y descargar."
          : "Acabás de leer un fragmento. Estoy terminando de escribirlo — dejá tu correo y te aviso apenas salga."}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground/80">
        {cta.pages && (
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" />
            {cta.pages}
          </span>
        )}
        {cta.formats.length > 0 && <span>{cta.formats.join(" · ")}</span>}
        {hasStore && cta.price && <span className="text-foreground">{cta.price}</span>}
      </div>

      <div className="mt-7">
        {hasStore ? (
          <a
            href={cta.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <Download className="h-4 w-4" />
            {cta.label}
          </a>
        ) : cta.notifyEmail ? (
          <a
            href={`mailto:${cta.notifyEmail}?subject=${encodeURIComponent(
              `Avisame cuando salga "${relato.title}"`,
            )}`}
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <Mail className="h-4 w-4" />
            Avisame cuando salga
          </a>
        ) : null}
      </div>

      {hasStore && (
        <p className="mt-4 text-xs text-muted-foreground/70">
          El pago y la entrega los gestiona la plataforma de venta de forma segura.
        </p>
      )}
    </aside>
  )
}

export default function RelatoPage() {
  return (
    <>
      {/* Misma estética que el resto del sitio: siempre en modo oscuro */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.classList.add('dark')`,
        }}
      />
      <main className="max-w-2xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Inicio
        </Link>

        <header className="mt-10">
          <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
            Relato
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
            {relato.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {relato.tagline}
          </p>
          <p className="mt-3 font-mono text-xs text-muted-foreground/80">
            por {relato.autor}
          </p>
        </header>

        {relato.cover && (
          <div className="mt-10 overflow-hidden rounded-xl border border-border/60 bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`../portfolio/${relato.cover}`}
              alt={`Portada de ${relato.title}`}
              className="w-full object-cover"
            />
          </div>
        )}

        <article className="mt-12">
          {relato.lead && (
            <p className="border-l-2 border-border pl-5 italic text-muted-foreground leading-relaxed">
              {relato.lead}
            </p>
          )}

          {relato.preview.map((block, i) => (
            <section key={i} className="mt-12 first:mt-12">
              {block.heading && (
                <h2 className="mb-5 font-display text-2xl leading-snug">
                  {block.heading}
                </h2>
              )}
              <div className="space-y-5">
                {block.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    className="text-[1.05rem] leading-[1.85] text-foreground/85"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </article>

        <Cta />

        <div className="mt-14 border-t border-border/50 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
      </main>
    </>
  )
}
