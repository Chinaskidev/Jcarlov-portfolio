/* commands.ts — CLI command implementations */

import type { Terminal } from "./terminal"
import { THEMES, currentTheme, applyTheme } from "./themes"
import { HOME, FILE_SYSTEM, resolvePath, getNode, collectAllPaths } from "./filesystem"

type CommandFn = (args: string[], term: Terminal) => void

/* ============================================
   commands
   ============================================ */

export const COMMANDS: Record<string, CommandFn> = {}

COMMANDS.help = function (_args, term) {
  term.print(`
<span class="tc-cyan b">╔═══════════════════════════════════════════╗</span>
<span class="tc-cyan b">║</span>  <span class="tc-green b">Comandos Disponibles</span>                     <span class="tc-cyan b">║</span>
<span class="tc-cyan b">╚═══════════════════════════════════════════╝</span>

  <span class="tc-yellow">ls</span> <span class="tc-comment">[-a] [-l] [dir]</span>    Lista archivos y carpetas
  <span class="tc-yellow">cd</span> <span class="tc-comment">[dir]</span>             Cambia de directorio
  <span class="tc-yellow">cat</span> <span class="tc-comment">[archivo]</span>        Muestra contenido de un archivo
  <span class="tc-yellow">pwd</span>                  Muestra el directorio actual
  <span class="tc-yellow">whoami</span>               Información del usuario
  <span class="tc-yellow">find</span> <span class="tc-comment">[patrón]</span>        Busca archivos por nombre
  <span class="tc-yellow">history</span>              Historial de comandos
  <span class="tc-yellow">theme</span> <span class="tc-comment">[nombre|list]</span>  Cambia el tema de colores
  <span class="tc-yellow">run</span> <span class="tc-comment">[programa]</span>       Ejecuta un programa
  <span class="tc-yellow">gui</span>                  Abre la versión visual del portafolio
  <span class="tc-yellow">echo</span> <span class="tc-comment">[texto]</span>         Imprime texto
  <span class="tc-yellow">date</span>                 Muestra fecha y hora
  <span class="tc-yellow">uname</span> <span class="tc-comment">[-a]</span>           Info del sistema
  <span class="tc-yellow">clear</span>                Limpia la pantalla
  <span class="tc-yellow">exit</span>                 Cierra la sesión

  <span class="tc-comment">Tip: usa Tab para autocompletar, ↑↓ para historial</span>`)
}

COMMANDS.ls = function (args, term) {
  let showHidden = false
  let longFormat = false
  let targetPath: string | null = null
  for (const a of args) {
    if (a === "-a" || a === "-la" || a === "-al") showHidden = true
    if (a === "-l" || a === "-la" || a === "-al") longFormat = true
    if (!a.startsWith("-")) targetPath = a
  }
  const path = targetPath ? resolvePath(targetPath, term.cwd) : term.cwd
  const node = getNode(path)
  if (!node) return term.printErr(`ls: no se puede acceder a '${targetPath}': No existe`)
  if (node.type === "file") return term.printErr(`ls: '${targetPath}' no es un directorio`)
  const entries = Object.entries(node.children)
  if (!entries.length) return term.print('<span class="tc-comment">  (directorio vacío)</span>')

  const filtered = entries.filter(([name]) => showHidden || !name.startsWith("."))
  if (!filtered.length)
    return term.print('<span class="tc-comment">  (directorio vacío — usa ls -a para archivos ocultos)</span>')

  if (longFormat) {
    let out = `<span class="tc-comment">total ${filtered.length}</span>\n`
    for (const [name, child] of filtered) {
      const isDir = child.type === "dir"
      const perm = isDir ? "drwxr-xr-x" : "-rw-r--r--"
      const size = child.size || (isDir ? "  96B" : " 0.1K")
      const mod = child.modified || "Jun  7 2026"
      const display = isDir
        ? `<span class="tc-cyan b">${name}/</span>`
        : name.startsWith(".")
          ? `<span class="tc-comment">${name}</span>`
          : name
      out += `<span class="tc-comment">${perm}</span>  jcvasquez  <span class="tc-comment">${String(size).padStart(5)}</span>  <span class="tc-comment">${mod}</span>  ${display}\n`
    }
    term.print(out.trimEnd())
  } else {
    let out = "  "
    for (const [name, child] of filtered) {
      if (child.type === "dir") out += `<span class="tc-cyan b">${name}/</span>  `
      else if (name.startsWith(".")) out += `<span class="tc-comment">${name}</span>  `
      else out += `${name}  `
    }
    term.print(out)
  }
}

COMMANDS.cd = function (args, term) {
  const target = args[0] || "~"
  const path = resolvePath(target, term.cwd)
  const node = getNode(path)
  if (!node) return term.printErr(`cd: '${target}': No existe`)
  if (node.type !== "dir") {
    return term.printErr(
      `cd: '${target}' es un archivo, no una carpeta. ` +
        `<span class="tc-comment">Para leerlo usa:</span> <span class="tc-yellow">cat ${target}</span>`,
    )
  }
  term.cwd = path
  term.updateHeaderTitle()
}

COMMANDS.cat = function (args, term) {
  if (!args.length) return term.printErr("cat: falta operando de archivo")
  for (const arg of args) {
    const path = resolvePath(arg, term.cwd)
    const node = getNode(path)
    if (!node) {
      term.printErr(`cat: '${arg}': No existe`)
      continue
    }
    if (node.type === "dir") {
      term.printErr(
        `cat: '${arg}' es una carpeta. ` +
          `<span class="tc-comment">Para ver qué hay dentro usa:</span> <span class="tc-yellow">ls ${arg}</span> ` +
          `<span class="tc-comment">o entra con</span> <span class="tc-yellow">cd ${arg}</span>`,
      )
      continue
    }
    term.print(node.content)
  }
}

COMMANDS.pwd = function (_args, term) {
  term.print(`  <span class="tc-green">${term.cwd}</span>`)
}

COMMANDS.whoami = function (_args, term) {
  term.print(`
<span class="tc-cyan b">╔═══════════════════════════════════════════╗</span>
<span class="tc-cyan b">║</span>  <span class="tc-green b">Juan Carlos Vásquez</span>                     <span class="tc-cyan b">║</span>
<span class="tc-cyan b">║</span>  <span class="tc-comment">Software Architect / AI Product Engineer</span> <span class="tc-cyan b">║</span>
<span class="tc-cyan b">║</span>  <span class="tc-comment">Founder @ Yultic.dev</span>                     <span class="tc-cyan b">║</span>
<span class="tc-cyan b">╚═══════════════════════════════════════════╝</span>

  <span class="tc-yellow">Shell</span>    →  jcv-sh v1.0
  <span class="tc-yellow">Home</span>     →  ${HOME}
  <span class="tc-yellow">Theme</span>    →  ${THEMES[currentTheme].name}
  <span class="tc-yellow">Uptime</span>   →  Desde 2023`)
}

COMMANDS.clear = function (_args, term) {
  term.clear()
}

COMMANDS.history = function (_args, term) {
  if (!term.history.length) return term.print('<span class="tc-comment">  (historial vacío)</span>')
  let out = ""
  term.history.forEach((cmd, i) => {
    out += `  <span class="tc-comment">${String(i + 1).padStart(4)}</span>  ${cmd}\n`
  })
  term.print(out.trimEnd())
}

COMMANDS.find = function (args, term) {
  const pattern = args[0]
  if (!pattern) return term.printErr("find: uso: find [patrón]")
  const allPaths = collectAllPaths(FILE_SYSTEM, "/")
  const matches = allPaths.filter((p) => p.name.toLowerCase().includes(pattern.toLowerCase()))
  if (!matches.length)
    return term.print(`<span class="tc-comment">  No se encontraron archivos que coincidan con '${pattern}'</span>`)
  let out = ""
  for (const m of matches) {
    const icon = m.type === "dir" ? '<span class="tc-cyan b">' : '<span class="tc-fg">'
    out += `  ${icon}${m.path}${m.type === "dir" ? "/" : ""}</span>\n`
  }
  term.print(out.trimEnd())
}

COMMANDS.echo = function (args, term) {
  term.print("  " + args.join(" "))
}

COMMANDS.date = function (_args, term) {
  const now = new Date()
  const opts: Intl.DateTimeFormatOptions = {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  }
  term.print(`  <span class="tc-green">${now.toLocaleDateString("es-ES", opts)}</span>`)
}

COMMANDS.uname = function (args, term) {
  if (args.includes("-a")) {
    term.print("  Portfolio-OS 2.0 jcv-sh 1.0 x86_64 GNU/Linux")
  } else {
    term.print("  Portfolio-OS")
  }
}

COMMANDS.theme = function (args, term) {
  if (!args.length || args[0] === "list") {
    let out = '\n  <span class="tc-yellow b">Temas disponibles:</span>\n\n'
    for (const [key, t] of Object.entries(THEMES)) {
      const marker = key === currentTheme ? ' <span class="tc-green">◉ activo</span>' : ""
      out += `    <span class="tc-cyan">${key.padEnd(12)}</span> ${t.name}${marker}\n`
    }
    out += '\n  <span class="tc-comment">Uso: theme [nombre]</span>'
    return term.print(out)
  }
  const name = args[0].toLowerCase()
  if (!THEMES[name]) return term.printErr(`theme: '${name}' no existe. Usa 'theme list'`)
  applyTheme(name)
  term.print(`  <span class="tc-green">✓</span> Tema cambiado a <span class="tc-cyan b">${THEMES[name].name}</span>`)
}

COMMANDS.exit = function (_args, term) {
  term.disable()
  term.print(`\n<span class="tc-comment">  Cerrando sesión...</span>`)
  window.setTimeout(() => {
    const overlay = document.getElementById("exit-overlay")
    if (overlay) overlay.classList.add("visible")
  }, 600)
}

COMMANDS.gui = function (_args, term) {
  if (!term.onGui) {
    return term.printErr("gui: versión visual no disponible.")
  }
  term.print('  <span class="tc-green">Abriendo versión visual del portafolio...</span>')
  window.setTimeout(() => term.onGui?.(), 500)
}
COMMANDS.portfolio = COMMANDS.gui

COMMANDS.run = function (args, term) {
  const prog = (args[0] || "").toLowerCase()
  if (!prog) {
    return term.print(`
  <span class="tc-yellow">Programas disponibles:</span>
    <span class="tc-cyan">matrix</span>      Lluvia digital Matrix
    <span class="tc-cyan">neofetch</span>    Info del sistema
    <span class="tc-cyan">welcome</span>     Mostrar bienvenida

  <span class="tc-comment">Uso: run [programa]</span>`)
  }

  if (prog === "matrix") return runMatrix(term)
  if (prog === "neofetch") return runNeofetch(term)
  if (prog === "welcome") return showWelcome(term)

  term.printErr(`run: '${prog}' no encontrado. Usa 'run' para ver programas.`)
}

COMMANDS.sudo = function (_args, term) {
  const responses = [
    `<span class="tc-red b">  [sudo] password for jcvasquez: ********</span>\n  <span class="tc-red">jcvasquez no está en el archivo sudoers. Este incidente será reportado.</span>`,
    `<span class="tc-red b">  ¿Root? Buen intento. Aquí solo mando yo.</span>`,
    `<span class="tc-orange">  sudo: comando denegado — pero me caes bien por intentarlo.</span>`,
  ]
  term.print(responses[Math.floor(Math.random() * responses.length)])
}

COMMANDS.man = function (args, term) {
  if (!args[0]) return term.printErr("man: ¿qué página de manual quieres?")
  const cmd = args[0]
  if (COMMANDS[cmd]) {
    term.print(`  <span class="tc-yellow b">${cmd.toUpperCase()}(1)</span> — usa <span class="tc-cyan">help</span> para ver descripción de comandos`)
  } else {
    term.printErr(`man: no hay entrada de manual para '${cmd}'`)
  }
}

/* ── Matrix rain effect ── */
function runMatrix(term: Terminal) {
  term.print('<span class="tc-green">  Iniciando Matrix rain... (click para detener)</span>')
  const canvas = document.createElement("canvas")
  canvas.id = "matrix-canvas"
  Object.assign(canvas.style, {
    position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh", zIndex: "9999", cursor: "pointer",
  })
  document.body.appendChild(canvas)
  const ctx = canvas.getContext("2d")
  if (!ctx) {
    canvas.remove()
    return
  }
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const cols = Math.floor(canvas.width / 16)
  const drops = Array(cols).fill(1)
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
  let frame = 0
  function draw() {
    ctx!.fillStyle = "rgba(0, 0, 0, 0.05)"
    ctx!.fillRect(0, 0, canvas.width, canvas.height)
    ctx!.font = "15px monospace"
    for (let i = 0; i < drops.length; i++) {
      const ch = chars[Math.floor(Math.random() * chars.length)]
      ctx!.fillStyle = Math.random() > 0.95 ? "#FFFFFF" : "#00FF41"
      ctx!.fillText(ch, i * 16, drops[i] * 16)
      if (drops[i] * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0
      drops[i]++
    }
    frame = requestAnimationFrame(draw)
  }
  draw()
  const stop = () => {
    cancelAnimationFrame(frame)
    canvas.remove()
    term.print('<span class="tc-green">  Matrix rain detenido.</span>')
  }
  canvas.addEventListener("click", stop)
  window.setTimeout(stop, 15000)
}

/* ── Neofetch display ── */
function runNeofetch(term: Terminal) {
  const art = [
    '       <span class="tc-cyan">.o.</span>       ',
    '      <span class="tc-cyan">.888.</span>      ',
    '     <span class="tc-cyan">.8\'888.</span>     ',
    '    <span class="tc-cyan">.8\' `888.</span>    ',
    '   <span class="tc-cyan">.8\'   `888.</span>   ',
    '  <span class="tc-cyan">.8\' .o. `888.</span>  ',
    ' <span class="tc-cyan">.8\' .888. `888.</span> ',
    '<span class="tc-cyan">.8\' .8\'`8. `888.</span>',
  ]
  const info = [
    `<span class="tc-green b">jcvasquez</span><span class="tc-comment">@</span><span class="tc-cyan b">portfolio</span>`,
    '<span class="tc-comment">─────────────────────────</span>',
    `<span class="tc-yellow">OS</span>        Portfolio-OS 2.0`,
    `<span class="tc-yellow">Host</span>      Yultic.dev`,
    `<span class="tc-yellow">Kernel</span>    jcv-sh 1.0`,
    `<span class="tc-yellow">Theme</span>     ${THEMES[currentTheme].name}`,
    `<span class="tc-yellow">Shell</span>     Vanilla JS`,
    `<span class="tc-yellow">Terminal</span>   web-terminal`,
    `<span class="tc-yellow">Lang</span>      Python, TypeScript`,
    `<span class="tc-yellow">Role</span>      Software Architect`,
  ]
  let out = "\n"
  const maxLines = Math.max(art.length, info.length)
  for (let i = 0; i < maxLines; i++) {
    const left = art[i] || "                       "
    const right = info[i] || ""
    out += `  ${left}   ${right}\n`
  }
  out += "\n  "
  ;["red", "orange", "yellow", "green", "cyan", "purple", "comment", "fg"].forEach((c) => {
    out += `<span class="tc-bg-${c}">   </span>`
  })
  term.print(out)
}

/* ── Welcome message ── */
export function showWelcome(term: Terminal) {
  term.print(`
<span class="tc-green b">     ██╗ ██████╗██╗   ██╗</span>
<span class="tc-green b">     ██║██╔════╝██║   ██║</span>
<span class="tc-green b">     ██║██║     ██║   ██║</span>
<span class="tc-green b">██   ██║██║     ╚██╗ ██╔╝</span>
<span class="tc-green b">╚█████╔╝╚██████╗ ╚████╔╝</span>
<span class="tc-green b"> ╚════╝  ╚═════╝  ╚═══╝</span>

  <span class="tc-cyan b">Juan Carlos Vásquez</span>
  <span class="tc-comment">Software Architect / AI Product Engineer & Founder</span>

  Escribe <span class="tc-yellow">help</span> para ver los comandos disponibles.
  Escribe <span class="tc-yellow">cat README.md</span> para empezar.
  Escribe <span class="tc-yellow">ls</span> para explorar el portafolio.

  <span class="tc-comment">// Pista: hay archivos ocultos... intenta ls -a</span>`)
}
