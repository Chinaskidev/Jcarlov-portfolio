# TODO — Mejoras futuras

Lista de mejoras pendientes para el portafolio (terminal + versión visual).
No es urgente; es un backlog para ir picando cuando haya tiempo.

---

## 🔧 Pendientes / decisiones abiertas

- [x] **Paleta de `/portfolio` (versión visual):** ~~la terminal ya usa Monokai, pero
      la vista visual sigue con el dorado original.~~ **Resuelto:** se alineó al verde
      Monokai (`#A6E22E` → `oklch(0.85 0.205 128)`). Se giraron los tokens `--gold`,
      `--gold-dim`, `--primary`, `--ring`, `--chart-1` al verde (preservando luminosidad)
      y el acento a cian Monokai; `gold-shimmer` y `gradient-mesh` ahora en verde/cian.
- [x ] **Verificar el deploy** en GitHub Pages tras el primer merge a `main`
      (revisar pestaña Actions → que el job salga verde).
- [x] **SEO / metadatos:** ~~`app/layout.tsx` aún tiene `title: "Portfolio Profesional"`.~~
      **Resuelto:** title/description actualizados + Open Graph y Twitter Card en
      `app/layout.tsx` con URLs absolutas (GitHub Pages). Imagen de preview generada:
      `public/og-image.png` (1200×630, banner terminal Monokai).
- [ ] **Fallback sin JS (`<noscript>`):** si alguien tiene JS desactivado, mostrar al
      menos un texto + link a `/portfolio` (hoy verían la pantalla en negro).

---

## 📱 Experiencia móvil

- [ ] **Comandos táctiles:** chips/botones tappables (ls, about, projects, skills,
      contact, help) para quien no quiere escribir en el teclado del celular.
- [ ] Revisar tamaños de fuente y scroll en pantallas pequeñas.
- [ ] Tecla/botón visible para **saltar el boot** la primera vez.

---

## ⌨️ Más funcionalidad de terminal

- [ ] Comando `open <proyecto>` que abra el repo/demo directamente.
- [ ] Comando `email` / `contact` como atajo al correo.
- [ ] Soporte de encadenado con `&&` (ej. `cd skills && ls`).
- [ ] Comandos extra estilo Unix: `tree`, `grep`, `whoami` ya está.
- [ ] Más easter eggs (`cowsay`, `fortune`, etc.).
- [ ] `lang en/es` — toggle de idioma del contenido (comandos quedan en inglés).

---

## 📝 Contenido

- [ ] **Blog / `posts/`:** directorio con publicaciones leíbles vía `cat` (idea original
      del diseño: visor de blog estilo CLI en `/posts`).
- [ ] Agregar screenshots/GIFs a los proyectos en la versión visual.
- [ ] Revisar/actualizar fechas y estados de proyectos cuando cambien.

---

## ♿ Accesibilidad

- [ ] `aria-live` en la salida de la terminal para lectores de pantalla.
- [ ] Asegurar contraste suficiente en todos los temas.
- [ ] Enlace "saltar a versión visual" temprano para tecnología asistiva.

---

## 🧹 Técnico / mantenimiento

- [ ] Instalar `eslint` como dependencia para que `npm run lint` funcione
      (hoy el binario no está) y opcionalmente agregar lint al workflow.
- [ ] Tests básicos del parser de comandos / resolución de rutas (`filesystem.ts`).
- [ ] Analytics: registrar qué comandos usa la gente (insights de UX).
- [ ] Si el Web3 sigue en pausa, evaluar quitar dependencias dormidas para aligerar
      el bundle (RainbowKit / Wagmi / Viem).
