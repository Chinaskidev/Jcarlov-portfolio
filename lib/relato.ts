
export type RelatoBlock = {  
  heading?: string
  paragraphs: string[]
}

export type Relato = {
  /** Título de la obra. */
  title: string
  /** Subtítulo / línea de gancho corta. */
  tagline: string
  autor: string
  /** Portada opcional: nombre del archivo en `public/portfolio/` (ruta relativa, sin "/"). */
  cover?: string
  /** Una o dos frases que sitúan al lector antes de empezar (se renderiza en cursiva). */
  lead: string
  /** El fragmento gratis: lo que el lector lee sin pagar. */
  preview: RelatoBlock[]

  /** Configuración del llamado a la acción (la venta). */
  cta: {
    /**
     * URL del producto en Gumroad / Lemon Squeezy.
     * Dejala en "" mientras no tengas la cuenta: el CTA mostrará "Disponible próximamente".
     */
    url: string
    /** Texto del botón cuando ya hay `url`. */
    label: string
    /** Precio mostrado (p. ej. "$5 USD"). Opcional. */
    price?: string
    /** Formatos de entrega (p. ej. ["PDF", "EPUB"]). */
    formats: string[]
    /** Nº aproximado de páginas de la obra completa, para dar idea de tamaño. */
    pages?: string
    /** Email para "avisame cuando salga" mientras no hay `url`. */
    notifyEmail?: string
  }
}

export const relato: Relato = {
  title: "La Epopeya de Pepón",
  tagline: "No elegí esta aventura. Me ocurrió.",
  autor: "JCarloV",
  cover: "relato-portada.jpg",

  // Fragmento gratis. Es solo la apertura del Capítulo 1 — corta a propósito en un
  // momento de gancho. NO pegues el capítulo entero: mostrar de más mata la venta.
  lead: "",

  preview: [
    {
      heading: "Descripción",
      paragraphs: [
        "Dicen que los grandes viajes te cambian; a mí, la selva amazónica me desmanteló. Pasé más de siete años pedaleando el mundo, pero mi verdadero bautismo de fuego llegó cuando apenas llevaba un año y meses lejos de casa.",
        "Todo se torció en una carretera sin nombre en Ecuador.Un accidente me separó de mis compañeros de ruta y me vi arrastrado por la inmensidad del río Napo. Terminé abandonado en una orilla, perdido en un laberinto verde sin caminos, arrastrando una bicicleta inútil y con la certeza absoluta de que iba a morir ahí, solo y en el fango.",
        "Pero la selva tiene un sentido del humor retorcido. Me rescataron los Kichwas, una comunidad milenaria que me desnudó de mi arrogancia de viajero. Me sentaron a su mesa y me enseñaron que a veces, para dejar de estar perdido, primero tienes que perderlo absolutamente todo."
      ],
    },
  ],

  cta: {
    url: "https://jcarlov.gumroad.com/l/jhcxcc",
    label: "Seguir leyendo / descargar",
    price: "$10 USD",
    formats: ["PDF"],
    pages: "40+ páginas",
    notifyEmail: "juangreen17@gmail.com",
  },
}
