const experiences = [

  {
    title: "Founder & Software Architect",
    company: "Yultic.dev",
    period: "2026-Presente",
    description:
      "Fundador de un estudio de desarrollo de productos digitales y soluciones inteligentes. Diseño arquitecturas escalables, desarrollo aplicaciones full-stack e implemento soluciones basadas en IA.",
  },
  {
    title: "Co-Founder & AI Product Engineer",
    company: "Skinner",
    period: "2026-Presente",
    description:
      "Co-fundador de una plataforma enfocada en análisis inteligente de CVs y optimización de procesos de reclutamiento. Lidero la arquitectura full-stack, la integración de NLP, el backend en Python (FastAPI) y el frontend en TypeScript.",
  },
  {
    title: "Análisis de Auditoría Forense de la Seguridad Tecnológica",
    company: "Escuela Superior de Innovación y Tecnología (ESIT)",
    period: "08/06/2026",
    description:
      "Aplicar técnicas de informática forense para identificar, adquirir, preservar, analizar y presentar datos válidos como evidencias digitales en incidentes de seguridad o cibercrímenes.",
  },

  {
    title: "Curso de Ciberseguridad Preventiva",
    company: "Platzy",
    period: "13/04/2025",
    description:
      "Prevención, hardening y buenas prácticas de defensa en ciberseguridad.",
  },

  {
    title: "Ciberseguridad y Hacking Ético",
    company: "Platzy",
    period: "10/03/2025",
    description:
      "Hacking ético y fundamentos de pruebas de penetración (pentesting).",
  },
  {
    title: "Introducción a la Seguridad de Smart Contracts",
    company: "Kipu ETH",
    period: "20/12/2024",
    description:
      "Seguridad y vulnerabilidades comunes en contratos inteligentes (Web3).",
  },

  {
    title: "Ciencia de Datos",
    company: "Bootcamp Henry",
    period: "12/03/2024",
    description:
      "Python, análisis de datos, estadística aplicada y fundamentos de Machine Learning.",
  },

  {
    title: "Ingeniería en Agroecología",
    company: "Universidad Luterana Salvadoreña",
    period: "Universidad",
    description:
      "Formación con enfoque en pensamiento sistémico, análisis técnico y resolución estructurada de problemas.",
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-12 border-t border-border/50">
      <h2 className="text-lg font-semibold tracking-tight mb-8">
        Experiencia &amp; Educación
      </h2>

      <ul className="space-y-8">
        {experiences.map((exp) => (
          <li key={exp.title} className="flex flex-col sm:flex-row sm:gap-6">
            <span className="text-xs text-muted-foreground font-mono whitespace-nowrap sm:w-28 sm:flex-shrink-0 sm:pt-1 mb-1 sm:mb-0">
              {exp.period}
            </span>
            <div className="flex-1">
              <h3 className="font-medium">{exp.title}</h3>
              {exp.company && (
                <p className="text-sm text-muted-foreground">{exp.company}</p>
              )}
              <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                {exp.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
