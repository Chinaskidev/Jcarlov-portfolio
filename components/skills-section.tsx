const skills = [
  {
    title: "Machine Learning",
    description:
      "Modelos de clasificación, regresión y clustering con scikit-learn y XGBoost. Fine-tuning de Transformers y optimización de embeddings para búsqueda semántica con Hugging Face y PyTorch.",
  },
  {
    title: "Análisis de Datos",
    description:
      "Limpieza, transformación y EDA avanzado con Pandas y NumPy. Visualizaciones dinámicas con Matplotlib y Seaborn para extraer insights de negocio.",
  },
  {
    title: "Desarrollo Full-Stack",
    description:
      "React/Next.js en el frontend, Nest.js/FastAPI en el backend, TypeScript, Python y Prisma.",
  },
  {
    title: "Bases de Datos",
    description: "SQL, PostgreSQL, diseño de esquemas y optimización de consultas.",
  },
  {
    title: "MLOps & Cloud",
    description: "Docker, Kubernetes, AWS, GCP, CI/CD y despliegue de modelos en producción.",
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-12 border-t border-border/50">
      <h2 className="text-lg font-semibold tracking-tight mb-6">Habilidades</h2>
      <ul className="space-y-6">
        {skills.map((skill) => (
          <li key={skill.title}>
            <h3 className="font-medium">{skill.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mt-1">
              {skill.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
