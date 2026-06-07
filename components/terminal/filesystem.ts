/* filesystem.ts — virtual filesystem tree & path helpers */

import type { DirNode, FsNode } from "./types"

/* ============================================
   virtual filesystem
   ============================================ */

export const HOME = "/home/jcvasquez"

export const FILE_SYSTEM: DirNode = {
  type: "dir",
  children: {
    home: {
      type: "dir",
      children: {
        jcvasquez: {
          type: "dir",
          children: {
            "README.md": {
              type: "file", size: "1.6K", modified: "Jun  7 2026", content:
`<span class="tc-cyan b">══════════════════════════════════════════</span>
  Bienvenido al portafolio de <span class="tc-green b">Juan Carlos Vásquez</span>
<span class="tc-cyan b">══════════════════════════════════════════</span>

  <span class="tc-comment">Software Architect / AI Product Engineer & Founder</span>
  Construyo productos en la intersección de <span class="tc-cyan">IA</span>, <span class="tc-cyan">datos</span> y <span class="tc-cyan">Web3</span>.

  <span class="tc-purple b">─── Cómo navegar ───</span>
    <span class="tc-yellow">ls</span>            ver archivos y carpetas
    <span class="tc-yellow">cat [archivo]</span> leer contenido <span class="tc-comment">(ej. cat about.txt)</span>
    <span class="tc-yellow">cd [carpeta]</span>  entrar a una carpeta <span class="tc-comment">(ej. cd projects)</span>
    <span class="tc-yellow">help</span>          ver todos los comandos
    <span class="tc-yellow">theme list</span>    cambiar el tema de colores

  <span class="tc-purple b">─── Stack principal ───</span>
    <span class="tc-yellow">Backend</span>    Python · FastAPI · Nest.js · Prisma · PostgreSQL
    <span class="tc-yellow">Frontend</span>   Next.js · React · TypeScript · Tailwind
    <span class="tc-yellow">IA / ML</span>    PyTorch · Hugging Face · scikit-learn · XGBoost
    <span class="tc-yellow">DevOps</span>     Docker · Kubernetes · AWS · GCP · CI/CD

  <span class="tc-purple b">─── Proyectos destacados ───</span>
    <span class="tc-green b">MATI</span>     Agentes IA (AaaS) para trámites legales y tributarios
             <span class="tc-comment">NestJS · Anthropic SDK · BullMQ · Turborepo</span>
    <span class="tc-green b">SKINNER</span>  Gestión de talento humano con IA (NLP de CVs)
             <span class="tc-comment">Python · FastAPI · Transformers · Next.js</span>
    <span class="tc-comment">Explóralos todos con</span> <span class="tc-yellow">cd projects</span> <span class="tc-comment">y luego</span> <span class="tc-yellow">ls</span>

  <span class="tc-purple b">─── ¿Prefieres una vista visual? ───</span>
    Escribe <span class="tc-yellow">gui</span> o haz click aquí <span class="tc-comment">→</span> <span class="tc-cyan b" data-action="gui" style="cursor:pointer;text-decoration:underline">[ Ver versión visual ]</span>`,
            },

            "about.txt": {
              type: "file", size: "2.8K", modified: "Jun  7 2026", content:
`<div style="display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap;white-space:normal;max-width:780px"><img src="yo.jpeg" alt="Juan Carlos Vásquez" style="width:150px;height:150px;object-fit:cover;border:2px solid var(--green);border-radius:8px;flex-shrink:0" /><div style="white-space:pre-wrap;flex:1;min-width:240px"><span class="tc-green b">👤 Sobre Mí</span>

Hola, soy <span class="tc-green b">Juan Carlos Vásquez</span>
<span class="tc-comment">Software Architect / AI Product Engineer & Founder</span>

Aunque solo llevo tres años inmerso de lleno en el
desarrollo full-time, mi trayectoria se ha centrado
en convertir <span class="tc-yellow">ideas ambiciosas</span> en <span class="tc-yellow">productos reales</span>.

Actualmente dedico toda mi energía a <span class="tc-purple b">Yultic</span>, la
consultora de software que fundé, enfocada en pymes
que necesitan tecnología funcional — desde
<span class="tc-cyan">automatización con IA</span> hasta <span class="tc-cyan">plataformas SaaS</span>.

Antes co-fundé <span class="tc-purple b">Skinner</span>, una startup de IA aplicada
al Talento Humano.</div></div>

<span class="tc-comment">─────────────────────────────────────────</span>

  <span class="tc-yellow b">💬 ¿Construimos algo juntos?</span>
  <span class="tc-comment">Estoy abierto a colaboraciones, proyectos y nuevos retos.</span>

  <span class="tc-yellow">Email</span>      <a href="mailto:hello@yultic.dev" style="color:var(--cyan);text-decoration:none">hello@yultic.dev</a>
  <span class="tc-yellow">GitHub</span>     <a href="https://github.com/Chinaskidev" target="_blank" rel="noopener noreferrer" style="color:var(--cyan);text-decoration:none">github.com/Chinaskidev</a>
  <span class="tc-yellow">LinkedIn</span>   <a href="https://www.linkedin.com/in/juancarlosvz/" target="_blank" rel="noopener noreferrer" style="color:var(--cyan);text-decoration:none">linkedin.com/in/juancarlosvz</a>
  <span class="tc-yellow">Instagram</span>  <a href="https://www.instagram.com/jcarlov.eth/" target="_blank" rel="noopener noreferrer" style="color:var(--cyan);text-decoration:none">instagram.com/jcarlov.eth</a>
  <span class="tc-yellow">Farcaster</span>  <a href="https://farcaster.xyz/charlesdev" target="_blank" rel="noopener noreferrer" style="color:var(--cyan);text-decoration:none">farcaster.xyz/charlesdev</a>
  <span class="tc-yellow">X</span>  <a href="https://x.com/Juandemarcocube" target="_blank" rel="noopener noreferrer" style="color:var(--cyan);text-decoration:none">x.com/Juandemarcocube</a>


  <span class="tc-comment">¿Prefieres lo visual?</span> <span class="tc-cyan b" data-action="gui" style="cursor:pointer;text-decoration:underline">[ Ver portafolio visual → ]</span>`,
            },

            "contact.txt": {
              type: "file", size: "0.8K", modified: "Jun  7 2026", content:
`<span class="tc-cyan b">┌─────────────────────────────────────────┐</span>
<span class="tc-cyan b">│</span>  <span class="tc-green b">📬 Contacto</span>                              <span class="tc-cyan b">│</span>
<span class="tc-cyan b">└─────────────────────────────────────────┘</span>

  <span class="tc-yellow">Email</span>      →  hello@yultic.dev
  <span class="tc-yellow">GitHub</span>     →  github.com/Chinaskidev
  <span class="tc-yellow">LinkedIn</span>   →  linkedin.com/in/juancarlosvz
  <span class="tc-yellow">X/Twitter</span>  →  x.com/Juandemarcocube
  <span class="tc-yellow">Farcaster</span>  →  farcaster.xyz/charlesdev
  <span class="tc-yellow">Instagram</span>  →  instagram.com/jcarlov.eth/


  <span class="tc-comment">─────────────────────────────────────────</span>
  <span class="tc-green">¡No dudes en escribirme!</span>
  <span class="tc-comment">Siempre abierto a colaboraciones y nuevos retos.</span>`,
            },

            skills: {
              type: "dir",
              children: {
                "machine-learning.txt": {
                  type: "file", size: "1.2K", modified: "Jun  7 2026", content:
`<span class="tc-cyan b">┌─────────────────────────────────────────┐</span>
<span class="tc-cyan b">│</span>  <span class="tc-green b">🤖 Machine Learning</span>                     <span class="tc-cyan b">│</span>
<span class="tc-cyan b">└─────────────────────────────────────────┘</span>

  <span class="tc-yellow">Modelos</span>
    ├── Clasificación, regresión y clustering
    ├── scikit-learn & XGBoost
    └── Fine-tuning de Transformers

  <span class="tc-yellow">NLP & Embeddings</span>
    ├── Hugging Face & PyTorch
    ├── Búsqueda semántica
    └── Optimización de embeddings`,
                },

                "data-analysis.txt": {
                  type: "file", size: "0.9K", modified: "Jun  7 2026", content:
`<span class="tc-cyan b">┌─────────────────────────────────────────┐</span>
<span class="tc-cyan b">│</span>  <span class="tc-green b">📊 Análisis de Datos</span>                    <span class="tc-cyan b">│</span>
<span class="tc-cyan b">└─────────────────────────────────────────┘</span>

  <span class="tc-yellow">Herramientas</span>
    ├── Pandas & NumPy
    ├── Matplotlib & Seaborn
    └── EDA avanzado

  <span class="tc-yellow">Procesos</span>
    ├── Limpieza y transformación
    └── Visualización de datos`,
                },

                "fullstack.txt": {
                  type: "file", size: "1.1K", modified: "Jun  7 2026", content:
`<span class="tc-cyan b">┌─────────────────────────────────────────┐</span>
<span class="tc-cyan b">│</span>  <span class="tc-green b">💻 Desarrollo Full-Stack</span>                 <span class="tc-cyan b">│</span>
<span class="tc-cyan b">└─────────────────────────────────────────┘</span>

  <span class="tc-yellow">Frontend</span>
    ├── React / Next.js
    ├── Tailwind CSS / shadcn/ui
    └── TypeScript

  <span class="tc-yellow">Backend</span>
    ├── Nest.js / FastAPI
    ├── Python & TypeScript
    └── Prisma ORM

  <span class="tc-yellow">Extras</span>
    ├── BullMQ, Turborepo
    ├── Anthropic SDK
    └── ESLint`,
                },

                "databases.txt": {
                  type: "file", size: "0.6K", modified: "Jun  7 2026", content:
`<span class="tc-cyan b">┌─────────────────────────────────────────┐</span>
<span class="tc-cyan b">│</span>  <span class="tc-green b">🗄️  Bases de Datos</span>                       <span class="tc-cyan b">│</span>
<span class="tc-cyan b">└─────────────────────────────────────────┘</span>

  <span class="tc-yellow">SQL</span>
    ├── PostgreSQL
    ├── Diseño de esquemas
    └── Optimización de queries`,
                },

                "mlops.txt": {
                  type: "file", size: "1.0K", modified: "Jun  7 2026", content:
`<span class="tc-cyan b">┌─────────────────────────────────────────┐</span>
<span class="tc-cyan b">│</span>  <span class="tc-green b">⚙️  MLOps & Cloud</span>                        <span class="tc-cyan b">│</span>
<span class="tc-cyan b">└─────────────────────────────────────────┘</span>

  <span class="tc-yellow">Contenedores & Orquestación</span>
    ├── Docker
    └── Kubernetes

  <span class="tc-yellow">Cloud</span>
    ├── AWS & GCP
    ├── CI/CD Pipelines
    └── Despliegue de modelos

  <span class="tc-yellow">Herramientas</span>
    ├── MLflow
    ├── Apache Airflow
    └── Google Cloud Storage`,
                },

                "web3.txt": {
                  type: "file", size: "0.5K", modified: "Jun  7 2026", content:
`<span class="tc-cyan b">┌─────────────────────────────────────────┐</span>
<span class="tc-cyan b">│</span>  <span class="tc-green b">⛓️  Web3 & Blockchain</span>                    <span class="tc-cyan b">│</span>
<span class="tc-cyan b">└─────────────────────────────────────────┘</span>

  <span class="tc-yellow">Tecnologías</span>
    ├── Solidity
    ├── IPFS
    └── Wagmi`,
                },
              },
            },

            projects: {
              type: "dir",
              children: {
                "llm-local.txt": {
                  type: "file", size: "2.0K", modified: "Jun  7 2026", content:
`<span class="tc-cyan b">┌─────────────────────────────────────────┐</span>
<span class="tc-cyan b">│</span>  <span class="tc-purple b">Agente LLM 100% Local</span>                  <span class="tc-cyan b">│</span>
<span class="tc-cyan b">│</span>  <span class="tc-comment">Captura de leads + agenda · Ollama</span>     <span class="tc-cyan b">│</span>
<span class="tc-cyan b">└─────────────────────────────────────────┘</span>

  Agente de IA que conversa con un prospecto,
  entiende qué necesita, <span class="tc-cyan">captura el lead</span> y
  <span class="tc-cyan">agenda una cita</span> con un asesor humano.

  Corre con un <span class="tc-green b">LLM 100% local vía Ollama</span>:
  sin nube, sin APIs externas — los datos nunca
  salen de la máquina.

  <span class="tc-comment">// El código manda; el modelo solo extrae</span>
  <span class="tc-comment">// intención. Por eso funciona con modelos pequeños.</span>

  <span class="tc-yellow">Skills aplicadas</span>
    ├── <span class="tc-green">TypeScript</span> · <span class="tc-green">Node.js</span>
    ├── <span class="tc-green">Ollama</span> (LLM local) · diseño de agentes
    ├── <span class="tc-green">Zod</span> (validación de tool-calls)
    └── <span class="tc-green">PostgreSQL</span> (persistencia)

  <span class="tc-orange">★ favorito</span> <span class="tc-comment">— quiero llevarlo a producción</span>
  <a href="https://github.com/Chinaskidev/Run-an-LLM-Locally-." target="_blank" rel="noopener noreferrer" class="tc-cyan">Chinaskidev/Run-an-LLM-Locally ↗</a>`,
                },

                "skinner.txt": {
                  type: "file", size: "1.8K", modified: "Jun  7 2026", content:
`<span class="tc-cyan b">┌─────────────────────────────────────────┐</span>
<span class="tc-cyan b">│</span>  <span class="tc-purple b">SKINNER</span>                                <span class="tc-cyan b">│</span>
<span class="tc-cyan b">│</span>  <span class="tc-comment">Software de Gestión Inteligente</span>        <span class="tc-cyan b">│</span>
<span class="tc-cyan b">└─────────────────────────────────────────┘</span>

  Software de gestión administrativa inteligente
  que combina <span class="tc-cyan">IA avanzada</span> con gestión de talento
  humano. Optimiza procesos administrativos y
  fortalece la infraestructura tecnológica de
  las organizaciones.

  <span class="tc-yellow">Skills aplicadas</span>
    ├── <span class="tc-green">Python</span> & <span class="tc-green">Transformer</span>
    ├── <span class="tc-green">FastAPI</span> & <span class="tc-green">Docker</span>
    ├── <span class="tc-green">Nest.js</span> & <span class="tc-green">Next.js</span>
    ├── <span class="tc-green">Prisma</span> ORM
    └── <span class="tc-green">Tailwind CSS</span>

  <span class="tc-comment">// Co-founder — gestión de RR.HH. con IA</span>
  <a href="https://github.com/Skinner-SAS-de-CV" target="_blank" rel="noopener noreferrer" class="tc-cyan">Skinner-SAS-de-CV ↗</a>
  <a href="https://www.skinnersv.net/companies" target="_blank" rel="noopener noreferrer" class="tc-cyan">skinnersv.net ↗</a>`,
                },

                "mati.txt": {
                  type: "file", size: "2.0K", modified: "Jun  7 2026", content:
`<span class="tc-cyan b">┌─────────────────────────────────────────┐</span>
<span class="tc-cyan b">│</span>  <span class="tc-purple b">MATI — Agentes como Servicio (AaaS)</span>    <span class="tc-cyan b">│</span>
<span class="tc-cyan b">│</span>  <span class="tc-comment">Automatización Legal & Tributaria</span>      <span class="tc-cyan b">│</span>
<span class="tc-cyan b">└─────────────────────────────────────────┘</span>

  Plataforma de <span class="tc-cyan">Agentes como Servicio (AaaS)</span>
  que automatiza trámites legales y tributarios
  para contadores en El Salvador.

  <span class="tc-yellow">Funcionalidades</span>
    ├── Gestión multi-tenant de clientes
    ├── Alertas automáticas de vencimientos
    │   <span class="tc-comment">(ISSS, AFP, IVA, renta, contratos)</span>
    ├── Calendario de obligaciones fiscales
    ├── Generación de documentos legales
    └── Agente de IA conversacional

  <span class="tc-yellow">Skills aplicadas</span>
    ├── <span class="tc-green">NestJS</span> & <span class="tc-green">Next.js</span>
    ├── <span class="tc-green">TypeScript</span> & <span class="tc-green">Prisma</span>
    ├── <span class="tc-green">PostgreSQL</span> & <span class="tc-green">BullMQ</span>
    ├── <span class="tc-green">Anthropic SDK</span>
    └── <span class="tc-green">Turborepo</span>

  <span class="tc-orange">Estado:</span> <span class="tc-yellow">En desarrollo activo</span>
  <a href="https://github.com/yultic/S.I.P.A.T-/tree/main/sipatagent" target="_blank" rel="noopener noreferrer" class="tc-cyan">yultic/S.I.P.A.T ↗</a>`,
                },

                "doom-fuzz.txt": {
                  type: "file", size: "1.8K", modified: "Jun  7 2026", content:
`<span class="tc-cyan b">┌─────────────────────────────────────────┐</span>
<span class="tc-cyan b">│</span>  <span class="tc-purple b">DOOM-FUZZ — Pedal DSP en C++</span>           <span class="tc-cyan b">│</span>
<span class="tc-cyan b">│</span>  <span class="tc-comment">Distorsión/Fuzz de alta ganancia</span>       <span class="tc-cyan b">│</span>
<span class="tc-cyan b">└─────────────────────────────────────────┘</span>

  Pedal de distorsión/fuzz de alta ganancia
  (PATADOOM) implementado como <span class="tc-cyan">DSP en C++ puro</span>,
  con wrapper <span class="tc-cyan">JUCE</span> y build con <span class="tc-cyan">CMake</span>.

  El core de DSP no depende de JUCE, así que es
  <span class="tc-green b">portable a hardware embebido</span> (Daisy, Teensy).

  <span class="tc-yellow">Módulos DSP</span>
    ├── NoiseGate · GainStage · VoltageSag
    ├── OctaveDown (sub-bajo) · ToneStack
    └── CabinetSim · StereoWidth (efecto Haas)

  <span class="tc-yellow">Skills aplicadas</span>
    ├── <span class="tc-green">C++</span> · procesamiento de señales (DSP)
    ├── <span class="tc-green">JUCE</span> (plugin de audio)
    └── <span class="tc-green">CMake</span> · arquitectura por capas

  <a href="https://github.com/Chinaskidev/Doom-Fuzz" target="_blank" rel="noopener noreferrer" class="tc-cyan">Chinaskidev/Doom-Fuzz ↗</a>`,
                },

                "your-mindz.txt": {
                  type: "file", size: "1.4K", modified: "Jun  7 2026", content:
`<span class="tc-cyan b">┌─────────────────────────────────────────┐</span>
<span class="tc-cyan b">│</span>  <span class="tc-purple b">Your Mindz</span>                             <span class="tc-cyan b">│</span>
<span class="tc-cyan b">│</span>  <span class="tc-comment">Bienestar mental autogestionado</span>        <span class="tc-cyan b">│</span>
<span class="tc-cyan b">└─────────────────────────────────────────┘</span>

  Aplicación web para contratar y <span class="tc-cyan">agendar
  sesiones de bienestar mental</span> de forma autónoma:
  el cliente elige la sesión, paga y recibe un
  enlace de confirmación con su cita, sin
  intermediarios.

  <span class="tc-yellow">Skills aplicadas</span>
    ├── <span class="tc-green">TypeScript</span> · <span class="tc-green">Next.js</span>
    ├── <span class="tc-green">Tailwind CSS</span> · <span class="tc-green">shadcn/ui</span>
    └── <span class="tc-green">ESLint</span>

  <a href="https://github.com/yultic/your-mindz" target="_blank" rel="noopener noreferrer" class="tc-cyan">yultic/your-mindz ↗</a>
  <a href="https://your-mindz-web.vercel.app/" target="_blank" rel="noopener noreferrer" class="tc-cyan">your-mindz-web.vercel.app ↗</a>`,
                },

                "raymapu.txt": {
                  type: "file", size: "1.4K", modified: "Jun  7 2026", content:
`<span class="tc-cyan b">┌─────────────────────────────────────────┐</span>
<span class="tc-cyan b">│</span>  <span class="tc-purple b">Raymapu Web</span>                            <span class="tc-cyan b">│</span>
<span class="tc-cyan b">│</span>  <span class="tc-comment">Apicultura digitalizada</span>                <span class="tc-cyan b">│</span>
<span class="tc-cyan b">└─────────────────────────────────────────┘</span>

  Plataforma web moderna para <span class="tc-cyan">digitalizar y
  posicionar un negocio de apicultura</span>: información
  institucional, catálogo de productos y servicios,
  con una arquitectura frontend limpia y escalable.

  <span class="tc-yellow">Skills aplicadas</span>
    ├── <span class="tc-green">TypeScript</span> · <span class="tc-green">Tailwind CSS</span>
    ├── <span class="tc-green">shadcn/ui</span>
    └── <span class="tc-green">ESLint</span>

  <a href="https://github.com/yultic/Raymapu-web" target="_blank" rel="noopener noreferrer" class="tc-cyan">yultic/Raymapu-web ↗</a>
  <a href="https://raymapu.cl/" target="_blank" rel="noopener noreferrer" class="tc-cyan">raymapu.cl ↗</a>`,
                },
              },
            },

            experience: {
              type: "dir",
              children: {
                "yultic.txt": {
                  type: "file", size: "2.2K", modified: "Jun  7 2026", content:
`<span class="tc-cyan b">┌─────────────────────────────────────────┐</span>
<span class="tc-cyan b">│</span>  <span class="tc-purple b">Yultic.dev</span>                               <span class="tc-cyan b">│</span>
<span class="tc-cyan b">│</span>  <span class="tc-green">Founder & Software Architect</span>             <span class="tc-cyan b">│</span>
<span class="tc-cyan b">│</span>  <span class="tc-comment">2026 — Presente</span>                          <span class="tc-cyan b">│</span>
<span class="tc-cyan b">└─────────────────────────────────────────┘</span>

  <span class="tc-comment">Fundé Yultic: una firma de IA que implementa</span>
  <span class="tc-comment">soluciones reales en la operación de negocios.</span>

  Como <span class="tc-green b">fundador y arquitecto</span>, llevo cada producto
  de la idea a producción: defino la arquitectura,
  construyo el full-stack y despliego la IA.

  <span class="tc-yellow">Qué hacemos</span>
    ├── <span class="tc-cyan">Automatización</span> — agentes que reemplazan
    │   tareas repetitivas y flujos de documentos
    ├── <span class="tc-cyan">Inteligencia de datos</span> — de información
    │   dispersa a decisiones accionables
    └── <span class="tc-cyan">Atención 24/7</span> — asistentes que responden
        y escalan a un humano cuando hace falta

  <span class="tc-yellow">Mi rol</span>
    ├── Diseño de arquitecturas escalables
    ├── Desarrollo full-stack de extremo a extremo
    ├── Implementación de IA aplicada en producción
    └── Productos: MATI · Skinner · Your Mindz

  <span class="tc-comment">"La IA cambia la escala de lo posible."</span>
  <a href="https://yultic.dev/es" target="_blank" rel="noopener noreferrer" class="tc-cyan">yultic.dev ↗</a>`,
                },

                "skinner-exp.txt": {
                  type: "file", size: "1.6K", modified: "Jun  7 2026", content:
`<span class="tc-cyan b">┌─────────────────────────────────────────┐</span>
<span class="tc-cyan b">│</span>  <span class="tc-purple b">Skinner</span>                                  <span class="tc-cyan b">│</span>
<span class="tc-cyan b">│</span>  <span class="tc-green">Co-Founder & AI Product Engineer</span>         <span class="tc-cyan b">│</span>
<span class="tc-cyan b">│</span>  <span class="tc-comment">2026 — Presente</span>                          <span class="tc-cyan b">│</span>
<span class="tc-cyan b">└─────────────────────────────────────────┘</span>

  <span class="tc-comment">Co-fundé Skinner y construí la plataforma</span>
  <span class="tc-comment">desde cero.</span>

  Plataforma de <span class="tc-cyan">análisis inteligente de CVs</span> que
  optimiza el reclutamiento: parsea, entiende y
  rankea currículums con NLP.

  <span class="tc-yellow">Lo que hice</span>
    ├── Diseñé la arquitectura full-stack completa
    ├── Construí el backend en <span class="tc-green">Python (FastAPI)</span>
    ├── Integré modelos de <span class="tc-green">NLP / Transformers</span>
    ├── Desarrollé el frontend en <span class="tc-green">TypeScript</span>
    └── Llevé el producto a producción

  <span class="tc-comment">// De co-fundador a ingeniero de producto de IA</span>`,
                },
              },
            },

            education: {
              type: "dir",
              children: {
                "especializacion.txt": {
                  type: "file", size: "1.0K", modified: "Jun  7 2026", content:
`<span class="tc-cyan b">┌─────────────────────────────────────────┐</span>
<span class="tc-cyan b">│</span>  <span class="tc-green b">🎓 Educación</span>                             <span class="tc-cyan b">│</span>
<span class="tc-cyan b">└─────────────────────────────────────────┘</span>

  <span class="tc-purple b">Especialización Independiente</span>
  <span class="tc-comment">Ingeniería de Software & IA</span>

  Aprendizaje continuo y especialización práctica
  en <span class="tc-cyan">Python</span>, <span class="tc-cyan">TypeScript</span>, <span class="tc-cyan">Blockchain</span>, <span class="tc-cyan">NLP</span> y
  arquitecturas modernas mediante construcción de
  productos reales y despliegue en producción.

  <span class="tc-comment">─────────────────────────────────────────</span>

  <span class="tc-purple b">Ingeniería en Agroecología</span>
  <span class="tc-comment">Universidad Luterana Salvadoreña</span>

  Formación universitaria con enfoque en pensamiento
  sistémico, análisis técnico y resolución
  estructurada de problemas.`,
                },
              },
            },

            ".hidden": {
              type: "dir",
              children: {
                "secret.txt": {
                  type: "file", size: "0.3K", modified: "Jun  7 2026", content:
`<span class="tc-green b">
  ██████╗ ██╗   ██╗███████╗███╗   ██╗
  ██╔══██╗██║   ██║██╔════╝████╗  ██║
  ██████╔╝██║   ██║█████╗  ██╔██╗ ██║
  ██╔══██╗██║   ██║██╔══╝  ██║╚██╗██║
  ██████╔╝╚██████╔╝███████╗██║ ╚████║
  ╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═══╝
</span>
  <span class="tc-yellow">¡Encontraste el archivo secreto!</span>

  <span class="tc-comment">// Si llegaste hasta aquí, probablemente eres</span>
  <span class="tc-comment">// el tipo de persona con la que me gustaría</span>
  <span class="tc-comment">// trabajar. Escríbeme → hello@yultic.dev</span>

  <span class="tc-purple">FLAG{curiosity_is_the_key_to_innovation}</span>`,
                },

                ".easter_egg": {
                  type: "file", size: "0.1K", modified: "Jun  7 2026", content:
`<span class="tc-comment">// Hay más secretos escondidos...</span>
<span class="tc-comment">// Intenta: sudo, run matrix, run neofetch</span>`,
                },
              },
            },
          },
        },
      },
    },
  },
}

/* ── Path resolution helpers ── */

export function resolvePath(path: string, cwd: string): string {
  if (!path || path === "~") return HOME
  if (path.startsWith("~/")) path = HOME + path.slice(1)
  if (!path.startsWith("/")) path = cwd + "/" + path
  const parts = path.split("/").filter(Boolean)
  const resolved: string[] = []
  for (const p of parts) {
    if (p === ".") continue
    if (p === "..") {
      resolved.pop()
      continue
    }
    resolved.push(p)
  }
  return "/" + resolved.join("/")
}

export function getNode(path: string): FsNode | null {
  if (path === "/") return FILE_SYSTEM
  const parts = path.split("/").filter(Boolean)
  let node: FsNode = FILE_SYSTEM
  for (const p of parts) {
    if (node.type !== "dir" || !node.children[p]) return null
    node = node.children[p]
  }
  return node
}

export interface PathEntry {
  path: string
  name: string
  type: FsNode["type"]
}

export function collectAllPaths(node: FsNode, prefix: string): PathEntry[] {
  const results: PathEntry[] = []
  if (node.type !== "dir") return results
  for (const [name, child] of Object.entries(node.children)) {
    const fullPath = prefix === "/" ? "/" + name : prefix + "/" + name
    results.push({ path: fullPath, name, type: child.type })
    if (child.type === "dir") {
      results.push(...collectAllPaths(child, fullPath))
    }
  }
  return results
}
