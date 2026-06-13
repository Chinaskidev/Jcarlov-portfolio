// Fuente única de datos de proyectos.
//
// Los proyectos `featured: true` tienen un `caseStudy` completo y su propia página
// en /projects/[slug]. El resto se muestra en la lista compacta "Más proyectos".
//
// ⚠️ MÉTRICAS: los borradores de abajo se redactaron desde los READMEs de los repos.
// Las afirmaciones son verdaderas, pero faltan NÚMEROS DUROS (tiempos, %, nº de clientes,
// volumen procesado). Búscalos marcados con "TODO(jc)" y reemplázalos por datos reales:
// una métrica concreta es la señal #1 de credibilidad ante un reclutador o cliente.

export type CaseStudy = {
  /** El dolor real que motivó el proyecto: qué problema, para quién. */
  problem: string
  /** Qué hiciste tú (clave cuando fue en equipo / con Yultic). */
  role: string
  /** Qué construiste y, sobre todo, POR QUÉ esas decisiones (los trade-offs). */
  solution: string[]
  /** Resultado / impacto. Idealmente con métricas. */
  impact: string[]
}

export type Project = {
  slug: string
  title: string
  /** Frase corta de una línea para cards y listas. */
  tagline: string
  /** Párrafo descriptivo (resumen). */
  description: string
  tags: string[]
  image: string
  imageContain?: boolean
  github: string
  demo?: string
  featured?: boolean
  caseStudy?: CaseStudy
}

export const projects: Project[] = [
  {
    slug: "ixtli",
    title: "Ixtli — Reclutamiento con IA",
    tagline: "Analiza CVs y los puntúa contra cada puesto, 100% local.",
    description:
      "Sistema de reclutamiento potenciado por IA que analiza currículums y los compara con los puestos definidos por cada cliente, para encontrar al talento ideal de forma más rápida, objetiva y privada.",
    tags: ["Python", "FastAPI", "PostgreSQL", "Ollama", "Embeddings", "LLM local"],
    image: "ixtli-logo.png",
    imageContain: true,
    github: "https://github.com/Chinaskidev/agent-resume-analyzer",
    featured: true,
    caseStudy: {
      problem:
        "Filtrar candidatos es lento y subjetivo: los equipos revisan cientos de CVs a mano, el criterio cambia entre revisores, y los datos sensibles de los postulantes terminan en servicios de terceros. Las empresas necesitan cribar talento rápido y de forma consistente, sin exponer información personal.",
      role:
        "Diseño y construcción del sistema completo: backend en FastAPI, el pipeline de IA (extracción, embeddings y LLM), el modelo de puntaje híbrido y la persistencia multi-tenant.",
      solution: [
        "Extracción automática de texto de CVs en PDF o DOCX, sin importar el formato de entrada.",
        "Match semántico multilingüe (español e inglés) entre el CV y el perfil del puesto, generando un puntaje objetivo de afinidad.",
        "Decisión clave — dos motores complementarios y 100% locales: embeddings (rápidos, sin costo por consulta, garantizan que el candidato sea del rubro correcto) + un LLM local (Ministral 3 8B vía Ollama) que lee el CV completo y distingue al candidato fuerte del flojo dentro del mismo rubro.",
        "Las dos señales se combinan en un puntaje calibrado de 0 a 10, clasificado en Alto / Promedio / Bajo, más feedback en lenguaje natural en el idioma del CV con fortalezas, debilidades y recomendación de contratación.",
        "Multi-tenant: cada cliente registra sus propios puestos, habilidades y perfil esperado, de modo que el análisis se adapta a sus políticas.",
      ],
      impact: [
        "Privacidad por diseño: el procesamiento es 100% local, los CVs nunca salen de la infraestructura del cliente.",
        "Consistencia: un puntaje calibrado y reproducible reemplaza el criterio subjetivo de cada revisor.",
        "Costo cero por consulta al no depender de APIs de IA en la nube.",
        // TODO(jc): nº de CVs procesados / tiempo por CV vs. revisión manual / clientes usándolo.
      ],
    },
  },
  {
    slug: "local-llm-agent",
    title: "Agente LLM local — captación y agendamiento",
    tagline: "Capta leads y agenda citas con un LLM que corre sin nube.",
    description:
      "Agente de IA que conversa con un prospecto, entiende qué necesita, capta el lead y agenda una cita con un asesor humano. Corre sobre un LLM 100% local vía Ollama: sin nube, sin APIs externas, los datos nunca salen de la máquina.",
    tags: ["TypeScript", "Ollama", "LLM local", "Agentes IA"],
    image: "agente.png",
    github: "https://github.com/Chinaskidev/Run-an-LLM-Locally-.",
    featured: true,
    caseStudy: {
      problem:
        "Las pymes pierden leads por no responder a tiempo, y las soluciones de chatbot dependen de APIs en la nube: costo por consulta y datos del cliente expuestos. Se necesitaba un agente capaz de captar y calificar leads y agendar citas, corriendo sin nube y con modelos pequeños asequibles.",
      role:
        "Diseño de la arquitectura del agente y del loop de control que mantiene al modelo bajo control.",
      solution: [
        "Decisión arquitectónica central: «el código manda, el modelo solo extrae intención». El modelo propone qué hacer; el código valida y decide. Por eso funciona incluso con modelos pequeños (Ministral 3 8B, Qwen 2.5 7B) que alucinan más que uno frontier.",
        "Solo dos herramientas, nada más: `guardar_lead` (registra al prospecto) y `agendar_cita` (reserva con un asesor humano, sin doble-reserva).",
        "El agente nunca cierra la venta: capta y califica el lead, hace avanzar la conversación y la entrega a un humano — cerrar siempre es trabajo de una persona.",
        "Cada mensaje entra en un loop acotado: el modelo decide si hace falta una herramienta y el código garantiza que se ejecute bien o la rechaza.",
        "100% local vía Ollama: sin nube, sin APIs externas, los datos nunca salen de la máquina.",
      ],
      impact: [
        "Costo cero por consulta al no usar APIs de pago.",
        "Privacidad: los datos del prospecto nunca salen de la máquina.",
        "Robustez con modelos pequeños y baratos gracias al diseño «código al mando».",
        // TODO(jc): leads captados / tasa de agendamiento / tiempo de respuesta.
      ],
    },
  },
  {
    slug: "mati",
    title: "MATI — Agentes como Servicio (AaaS)",
    tagline: "Automatiza trámites legales y tributarios para contadores.",
    description:
      "Plataforma de Agentes como Servicio que automatiza trámites legales y tributarios para contadores en El Salvador: gestión multi-tenant, alertas de vencimientos, calendario de obligaciones fiscales, generación de documentos legales y un agente de IA conversacional.",
    tags: ["NestJS", "Next.js", "TypeScript", "Prisma", "PostgreSQL", "Anthropic SDK"],
    image: "maticartoon.png",
    imageContain: true,
    github: "https://github.com/yultic/S.I.P.A.T-",
    featured: true,
    caseStudy: {
      problem:
        "Los despachos contables en El Salvador gestionan las obligaciones legales y tributarias de muchos clientes a mano. El riesgo de multas por un vencimiento perdido es alto, y gran parte del trabajo —cálculos, documentos, recordatorios— es repetitivo y propenso a error.",
      role:
        "TODO(jc): describe tu rol exacto (arquitectura, backend, agente IA, etc.) y si fue en equipo dentro de Yultic.",
      solution: [
        "Plataforma multi-tenant donde cada despacho gestiona su propia cartera de clientes de forma aislada.",
        "Calendario de obligaciones fiscales con alertas de vencimientos para que ningún trámite se pase de fecha.",
        "Generación automática de documentos legales, eliminando trabajo manual repetitivo.",
        "Agente de IA conversacional (Anthropic SDK) que asiste sobre dudas y trámites.",
      ],
      impact: [
        // TODO(jc): despachos/contadores usándolo, vencimientos gestionados, tiempo ahorrado por trámite.
        "TODO(jc): completar con métricas reales (clientes, tiempo ahorrado, multas evitadas).",
      ],
    },
  },
  {
    slug: "petshop-forecast",
    title: "Predicción de ventas para pymes",
    tagline: "Forecast de ventas con XGBoost y alertas de stock.",
    description:
      "Sistema de predicción de ventas para pymes del sector de alimento para mascotas. El modelo principal, basado en XGBoost para series temporales, alcanza ~77 % de precisión (R²).",
    tags: ["Python", "FastAPI", "XGBoost", "MLflow", "Docker", "Next.js"],
    image: "petshop.jpg",
    github: "https://github.com/yultic/Petshop-dashboard",
    demo: "https://github.com/yultic/Petshop-dashboard",
    featured: true,
    caseStudy: {
      problem:
        "Una pyme de retail no sabe cuánto va a vender ni cuándo reponer: compra de más (capital inmovilizado y producto que caduca) o de menos (quiebres de stock y ventas perdidas). Decidir el inventario «a ojo» cuesta dinero todas las semanas.",
      role:
        "TODO(jc): describe tu rol (modelado ML, API, dashboard) y si fue individual o con Yultic.",
      solution: [
        "Modelo XGBoost para series temporales que proyecta ventas de 7 a 90 días.",
        "API en FastAPI (desplegada en Railway) que sirve las predicciones, con seguimiento de experimentos vía MLflow.",
        "Dashboard en Next.js (TanStack Query + Recharts) con KPIs, predicciones exportables a CSV, alertas de inventario y órdenes de compra sugeridas.",
        "Detalle de dominio que mejora la precisión: el modelo excluye los domingos (la tienda cierra) y maneja moneda y fechas en formato local (es-SV).",
      ],
      impact: [
        "El modelo alcanza ~77 % de precisión (R²) en la predicción de ventas.",
        // TODO(jc): reducción de quiebres de stock / capital liberado / decisiones de compra mejoradas.
      ],
    },
  },
  {
    slug: "skinner",
    title: "SKINNER — Gestión administrativa con IA",
    tagline: "Software que combina IA y gestión de talento humano.",
    description:
      "Software de gestión administrativa inteligente que combina IA avanzada con gestión de talento humano para optimizar procesos y fortalecer la infraestructura tecnológica de las organizaciones.",
    tags: ["Python", "Transformers", "FastAPI", "Docker", "Nest.js", "Next.js"],
    image: "skinner-logo.png",
    imageContain: true,
    github: "https://github.com/Skinner-SAS-de-CV/FastApi-Enpoints",
    demo: "https://www.skinnersv.net/companies",
    featured: true,
    caseStudy: {
      problem:
        "Las organizaciones gestionan su talento humano y sus procesos administrativos con herramientas dispersas y poco inteligentes. Falta una capa que optimice esos procesos y fortalezca su infraestructura tecnológica.",
      role:
        "Co-fundador. TODO(jc): precisa tu alcance técnico (qué construiste / lideraste).",
      solution: [
        "Software de gestión administrativa que combina IA avanzada con gestión de talento humano.",
        "Backend en Python/FastAPI con modelos basados en Transformers; servicios contenedorizados con Docker.",
        "Capa de aplicación en Nest.js + Next.js.",
      ],
      impact: [
        "Producto en operación, disponible públicamente en skinnersv.net.",
        // TODO(jc): organizaciones usándolo, procesos optimizados, métricas de adopción.
      ],
    },
  },

  // ── No destacados (lista compacta "Más proyectos") ─────────────────────────
  {
    slug: "doom-fuzz",
    title: "Doom-Fuzz — Pedal de guitarra (C++)",
    tagline: "Pedal de fuzz de alta ganancia como DSP en C++.",
    description:
      "Pedal de fuzz/distorsión de alta ganancia implementado como procesador de señal digital (DSP). Núcleo en C++ portable a hardware (Daisy Seed, Teensy) y plugin de audio vía JUCE.",
    tags: ["C++", "Faust", "JUCE", "DSP"],
    image: "Sunn-O))).webp",
    github: "https://github.com/Chinaskidev/Doom-Fuzz",
  },
  {
    slug: "your-mindz",
    title: "Your-Mindz",
    tagline: "Agenda y paga sesiones de bienestar mental sin intermediarios.",
    description:
      "Aplicación web que permite contratar y agendar sesiones de bienestar mental de forma autónoma: selección de sesión, pago y confirmación con enlace de cita, sin intermediarios.",
    tags: ["TypeScript", "Tailwind CSS", "shadcn/ui"],
    image: "LOGO_2.png",
    github: "https://github.com/yultic/your-mindz",
    demo: "https://your-mindz-web.vercel.app/",
  },
  {
    slug: "etl-clima",
    title: "ETL Climático Automatizado",
    tagline: "Pipeline ETL de datos meteorológicos para El Salvador.",
    description:
      "Pipeline ETL completo de datos meteorológicos que automatiza extracción, transformación y carga del clima para El Salvador con Apache Airflow, Docker y Google Cloud.",
    tags: ["Apache Airflow", "Python", "Google Cloud", "PostgreSQL"],
    image: "lluvias.jpg",
    github: "https://github.com/Chinaskidev/ETL-Clima-ElSalvador",
    demo: "https://github.com/Chinaskidev/ETL-Clima-ElSalvador",
  },
  {
    slug: "eliza-x",
    title: "Agente-en-X-ElizaOs",
    tagline: "Agente de IA en X (Twitter) especializado en Blockchain.",
    description:
      "Agente de IA basado en ElizaOS, diseñado para operar en X (Twitter) y generar conversaciones especializadas sobre Blockchain y Web3.",
    tags: ["TypeScript", "PLpgSQL", "Shell", "Docker"],
    image: "eliza_banner.jpg",
    github: "https://github.com/Chinaskidev/Agente-en-X-ElizaOs",
    demo: "https://github.com/Chinaskidev/Agente-en-X-ElizaOs",
  },
  {
    slug: "sivar-eth",
    title: "Dapp-SivarETH",
    tagline: "Contratos de Ethereum + interfaz web para gestionar NFTs.",
    description:
      "Proyecto que integra contratos inteligentes de Ethereum con una interfaz web para crear y gestionar NFTs, con conexión de wallets.",
    tags: ["Next.js", "TypeScript", "Solidity", "IPFS"],
    image: "sivar.png",
    github: "https://github.com/Chinaskidev/Sivar-ETH",
    demo: "https://github.com/Chinaskidev/Sivar-ETH",
  },
  {
    slug: "raymapu",
    title: "Raymapu Web",
    tagline: "Plataforma web para digitalizar un negocio de apicultura.",
    description:
      "Plataforma web moderna para digitalizar y posicionar un negocio de apicultura: información institucional, catálogo de productos y una arquitectura frontend limpia y escalable.",
    tags: ["TypeScript", "Tailwind CSS", "shadcn/ui"],
    image: "raymapu2.png",
    github: "https://github.com/yultic/Raymapu-web",
    demo: "https://raymapu.cl/",
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const otherProjects = projects.filter((p) => !p.featured)

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
