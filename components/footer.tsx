import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="py-16 border-t border-border/50">
      <h2 className="text-lg font-semibold tracking-tight mb-3">Contacto</h2>
      <p className="text-muted-foreground leading-relaxed">
        ¿Tienes un proyecto en mente? Hablemos.
      </p>
      <a
        href="mailto:hello@yultic.dev"
        className="inline-block mt-3 text-foreground hover:underline"
      >
        hello@yultic.dev ↗
      </a>

      <div className="mt-8 flex items-center gap-5">
        <a
          href="https://github.com/Chinaskidev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="GitHub"
        >
          <Github className="h-5 w-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/juancarlosvz/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a
          href="mailto:hello@yultic.dev"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Email"
        >
          <Mail className="h-5 w-5" />
        </a>
      </div>

      <p className="mt-12 text-xs text-muted-foreground">
        © 2026 Juan Carlos Vásquez
      </p>
    </footer>
  )
}
