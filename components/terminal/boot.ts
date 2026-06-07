/* boot.ts — Linux-style boot sequence & terminal bootstrap */

import type { TerminalOptions } from "./types"
import { THEMES, currentTheme, applyTheme } from "./themes"
import { showWelcome } from "./commands"
import { Terminal } from "./terminal"

/* ============================================
   Boot sequence & initialization
   ============================================ */

export function startTerminal(options: TerminalOptions = {}): () => void {
  const bootEl = document.getElementById("boot-output")
  const termEl = document.getElementById("terminal")
  const bootScreen = document.getElementById("boot-screen")
  if (!bootEl || !termEl || !bootScreen) return () => {}

  // Restore saved theme then apply.
  let saved: string | null = null
  try {
    saved = localStorage.getItem("portfolio-theme")
  } catch {
    /* ignore */
  }
  applyTheme(saved && THEMES[saved] ? saved : currentTheme)

  const timeouts: number[] = []
  let term: Terminal | null = null
  let destroyed = false

  const bootLines = [
    { t: "BIOS POST... OK", c: "", d: 60 },
    { t: "Detecting hardware...", c: "", d: 40 },
    { t: "", c: "", d: 30 },
    { t: "[    0.000000] Linux version 6.1.0-portfolio (jcvasquez@yultic.dev) (gcc 12.2.0)", c: "boot-highlight", d: 25 },
    { t: "[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0 root=/dev/sda1 quiet", c: "", d: 20 },
    { t: "[    0.003241] BIOS-provided physical RAM map:", c: "", d: 18 },
    { t: "[    0.003241]  BIOS-e820: [mem 0x0000000000000000-0x000000000009fbff] usable", c: "", d: 15 },
    { t: "[    0.006340] NX (Execute Disable) protection: active", c: "", d: 15 },
    { t: "[    0.009817] DMI: Yultic Portfolio Machine/Virtual, BIOS 2.0", c: "", d: 15 },
    { t: "[    0.012003] tsc: Detected 3200.000 MHz processor", c: "", d: 12 },
    { t: "[    0.045200] Calibrating delay loop (skipped), value calculated... 6400.00 BogoMIPS", c: "", d: 12 },
    { t: "[    0.089102] Memory: 16384MB available", c: "", d: 12 },
    { t: "[    0.120445] CPU: Intel(R) Xeon(R) Virtual CPU @ 3.20GHz", c: "", d: 12 },
    { t: "[    0.234001] NET: Registered protocol family 2", c: "", d: 10 },
    { t: "[    0.345123] TCP established hash table entries: 65536", c: "", d: 10 },
    { t: "[    0.456789] EXT4-fs (sda1): mounted filesystem with ordered data mode", c: "", d: 10 },
    { t: "[    0.567890] systemd[1]: Detected architecture x86-64", c: "", d: 10 },
    { t: "[    0.678901] systemd[1]: Set hostname to <portfolio>", c: "", d: 10 },
    { t: "", c: "", d: 40 },
    { t: "[  OK  ] Started Portfolio OS Services", c: "boot-ok", d: 120 },
    { t: "[  OK  ] Loading user profile: jcvasquez", c: "boot-ok", d: 150 },
    { t: "[  OK  ] Mounting virtual filesystem /dev/portfolio0", c: "boot-ok", d: 150 },
    { t: "[  OK  ] Starting terminal service...", c: "boot-ok", d: 200 },
    { t: "", c: "", d: 100 },
    { t: "ASCII_LOGO", c: "boot-highlight", d: 0, isLogo: true },
    { t: "", c: "", d: 400 },
    { t: "portfolio-os login: jcvasquez", c: "", d: 300 },
    { t: "Password: ••••••••", c: "", d: 500 },
    { t: "", c: "", d: 200 },
    {
      t:
        "Last login: " +
        new Date().toLocaleString("en-US", {
          weekday: "short", month: "short", day: "numeric",
          hour: "2-digit", minute: "2-digit", second: "2-digit", year: "numeric",
        }) +
        " from 127.0.0.1",
      c: "",
      d: 200,
    },
  ]

  const asciiLogo = `
<span class="boot-highlight" style="color:#A6E22E">     ██╗ ██████╗██╗   ██╗
     ██║██╔════╝██║   ██║
     ██║██║     ██║   ██║
██   ██║██║     ╚██╗ ██╔╝
╚█████╔╝╚██████╗ ╚████╔╝
 ╚════╝  ╚═════╝  ╚═══╝</span>

 <span style="color:#F8F8F2">Juan Carlos Vásquez</span>
 <span style="color:#75715E">Software Architect / AI Product Engineer</span>
 <span style="color:#75715E">Portfolio OS v2.0</span>`

  function initTerminal() {
    if (destroyed) return
    term = new Terminal(options)
    showWelcome(term)
    term.print("")
    term.enable()
  }

  let skipBoot = false
  try {
    skipBoot = Boolean(sessionStorage.getItem("boot-done"))
  } catch {
    /* ignore */
  }

  if (skipBoot) {
    bootScreen.classList.add("hidden")
    termEl.classList.add("visible")
    initTerminal()
    return () => {
      destroyed = true
      timeouts.forEach((id) => window.clearTimeout(id))
      term?.destroy()
    }
  }

  let lineIdx = 0

  function addBootLine() {
    if (destroyed) return
    if (lineIdx >= bootLines.length) {
      finishBoot()
      return
    }
    const line = bootLines[lineIdx++]
    const div = document.createElement("div")
    if (line.isLogo) {
      div.innerHTML = asciiLogo
    } else {
      div.textContent = line.t
      if (line.c) div.className = line.c
    }
    bootEl!.appendChild(div)
    bootScreen!.scrollTop = bootScreen!.scrollHeight
    timeouts.push(window.setTimeout(addBootLine, line.d))
  }

  function finishBoot() {
    try {
      sessionStorage.setItem("boot-done", "1")
    } catch {
      /* ignore */
    }
    timeouts.push(
      window.setTimeout(() => {
        if (destroyed) return
        bootScreen!.classList.add("fade-out")
        termEl!.classList.add("visible")
        timeouts.push(
          window.setTimeout(() => {
            if (destroyed) return
            bootScreen!.classList.add("hidden")
            initTerminal()
          }, 600),
        )
      }, 400),
    )
  }

  timeouts.push(window.setTimeout(addBootLine, 300))

  return () => {
    destroyed = true
    timeouts.forEach((id) => window.clearTimeout(id))
    term?.destroy()
  }
}
