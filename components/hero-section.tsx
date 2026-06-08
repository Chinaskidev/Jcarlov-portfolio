import { Github, Linkedin, Mail } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="pt-32 pb-16">
      <img
        src="yo.jpeg"
        alt="Juan Carlos Vásquez"
        className="w-28 h-28 rounded-full object-cover border border-border mb-8"
      />

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
        Hola! Soy Juan Carlos Vásquez,{" "}
        
      </h1>

      <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
        En esta web te enseño los proyectos que mejor representan cómo pienso y construyo-desde plataformas 
         SaaS-AaaS-hasta pipelines de IA aplicada.
         Actualmente soy fundandor de {" "}
        <span className="text-foreground">Yultic</span> y co-fundandor de{" "}
        <span className="text-foreground">Skinner</span>.
        Esta ultima fue mi mayor escuela, donde aprendí a construir productos digitales desde cero, 
        liderar equipos y entender las necesidades del mercado.
        Y es asi como he llegado a donde estoy hoy, con {" "} <span className="text-foreground">Yultic</span>, 
        mi proyecto actual, donde aplico todo lo que he aprendido 
        para crear soluciones innovadoras y de impacto para Pymes.
      </p>

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
    </section>
  )
}
