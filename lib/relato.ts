
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
  autor: "Juan Carlos Vásquez",
  // cover: "relato-portada.jpg", // ← descomentá cuando subas la portada a public/portfolio/

  // Fragmento gratis. Es solo la apertura del Capítulo 1 — corta a propósito en un
  // momento de gancho. NO pegues el capítulo entero: mostrar de más mata la venta.
  lead: "",

  preview: [
    {
      heading: "Capítulo 1",
      paragraphs: [
        "Todo viaje tiene un punto de quiebre: el momento exacto en que la aventura deja de ser una elección y empieza a ocurrirte. El mío fue una carretera sin nombre en Ecuador, a las tres de la tarde. Lo sé porque en el camino uno desaprende el reloj y aprende el sol: dónde está, cómo cae sobre el asfalto, qué hora marca sin marcarla. Eran las tres cuando vi a Salvador volar por encima del manillar.",
        "Éramos tres salvadoreños pedaleando por Latinoamérica: José «Chepe», Salvador y yo. Ellos eran hermanos —los hermanos Benítez—; yo era el agregado, el que conocieron en Ibarra, al norte de Ecuador, de la manera en que se encuentran los ciclistas de ruta: en una estación de bomberos. En medio continente, los cuarteles son el refugio no escrito del viajero —un patio, un grifo, un techo—, y a esa hospitalidad le debo más de una noche. Yo armaba la carpa en el patio cuando los vi: dos tipos ya instalados, con las piernas tostadas y todos flacos. Eran salvadoreños.",
        "—Ey, ¿qué onda? —les dije.",
        "Se quedaron viéndome, sorprendidos y contentos a la vez.",
        "—¿Qué onda? ¿De dónde sos?",
        "—De El Salvador.",
        "Salieron de la carpa de un salto.",
        "—¡Ma, no jodás! ¿En serio? ¡Nosotros también!",
        "Yo también me quedé pasmado.",
        "—¡Puya, qué vergón, maje!",
        "Nos abrazamos. No me topaba con un salvadoreño desde hacía meses, quizás un año. Fue increíble. Hasta esa noche creí ser el único salvadoreño pedaleando Latinoamérica.",
        "Llevábamos tres meses juntos. Tres meses de carreteras andinas, de subidas que te arrancaban los pulmones, de noches armando carpas bajo la lluvia y el frío, de compartir lo poco que teníamos sin pensarlo dos veces. Cuando viajas así, la confianza no se construye con palabras. Se construye con kilómetros.",
      ],
    },
  ],

  cta: {
    url: "", // ← pegá acá la URL de Gumroad cuando la tengas; hasta entonces sale "próximamente"
    label: "Seguir leyendo / descargar",
    price: "TODO(jc): $ USD",
    formats: ["PDF", "EPUB"],
    pages: "50+ páginas",
    notifyEmail: "juangreen17@gmail.com",
  },
}
