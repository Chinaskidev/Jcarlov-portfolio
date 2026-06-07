/* terminal.ts — terminal engine: input, history, autocomplete, rendering */

import type { TerminalOptions } from "./types"
import { HOME, resolvePath, getNode } from "./filesystem"
import { COMMANDS } from "./commands"

/* ============================================
   Terminal engine
   ============================================ */

export class Terminal {
  outputEl: HTMLElement
  inputEl: HTMLInputElement
  promptEl: HTMLElement
  hintEl: HTMLElement
  headerTitle: HTMLElement
  cwd: string
  history: string[]
  historyIdx: number
  tempInput: string
  enabled: boolean
  onGui?: () => void
  private listeners: Array<() => void> = []

  constructor(options: TerminalOptions = {}) {
    this.outputEl = document.getElementById("output") as HTMLElement
    this.inputEl = document.getElementById("cmd-input") as HTMLInputElement
    this.promptEl = document.getElementById("prompt") as HTMLElement
    this.hintEl = document.getElementById("autocomplete-hint") as HTMLElement
    this.headerTitle = document.getElementById("header-title") as HTMLElement
    this.cwd = HOME
    this.history = []
    this.historyIdx = -1
    this.tempInput = ""
    this.enabled = false
    this.onGui = options.onGui
    this.setupInput()
  }

  private addListener(el: EventTarget, type: string, fn: EventListenerOrEventListenerObject) {
    el.addEventListener(type, fn)
    this.listeners.push(() => el.removeEventListener(type, fn))
  }

  destroy() {
    this.listeners.forEach((off) => off())
    this.listeners = []
    document.getElementById("matrix-canvas")?.remove()
  }

  setupInput() {
    this.addListener(this.inputEl, "keydown", (e) => this.onKeyDown(e as KeyboardEvent))
    this.addListener(this.inputEl, "input", () => this.onInput())
    const body = document.getElementById("terminal-body")
    if (body) {
      this.addListener(body, "click", (e) => {
        const target = e.target as HTMLElement
        const action = target.closest("[data-action]") as HTMLElement | null
        if (action?.dataset.action === "gui") {
          e.preventDefault()
          this.onGui?.()
          return
        }
        // Let real links navigate without stealing focus.
        if (target.closest("a")) return
        if (window.getSelection()?.toString()) return
        this.inputEl.focus()
      })
    }
  }

  enable() {
    this.enabled = true
    this.inputEl.disabled = false
    this.inputEl.focus()
    this.updatePrompt()
  }

  disable() {
    this.enabled = false
    this.inputEl.disabled = true
  }

  private shortPath(): string {
    return this.cwd === HOME
      ? "~"
      : this.cwd.startsWith(HOME)
        ? "~" + this.cwd.slice(HOME.length)
        : this.cwd
  }

  private promptHtml(): string {
    return (
      `<span class="prompt-user">jcvasquez</span>` +
      `<span class="prompt-at">@</span>` +
      `<span class="prompt-host">portfolio</span>` +
      `<span class="prompt-colon">:</span>` +
      `<span class="prompt-path">${this.shortPath()}</span>` +
      `<span class="prompt-dollar">$</span>`
    )
  }

  updatePrompt() {
    this.promptEl.innerHTML = this.promptHtml()
  }

  updateHeaderTitle() {
    this.headerTitle.textContent = `jcvasquez@portfolio: ${this.shortPath()}`
  }

  print(html: string) {
    const div = document.createElement("div")
    div.className = "output-block"
    div.innerHTML = html
    this.outputEl.appendChild(div)
    this.scrollToBottom()
  }

  printErr(text: string) {
    this.print(`<span class="tc-red">  ${text}</span>`)
  }

  printPromptLine(input: string) {
    const div = document.createElement("div")
    div.className = "history-line"
    div.innerHTML = this.promptHtml() + ` <span class="tc-fg">${this.escapeHtml(input)}</span>`
    this.outputEl.appendChild(div)
  }

  clear() {
    this.outputEl.innerHTML = ""
  }

  scrollToBottom() {
    const body = document.getElementById("terminal-body")
    if (!body) return
    requestAnimationFrame(() => {
      body.scrollTop = body.scrollHeight
    })
  }

  escapeHtml(text: string): string {
    const d = document.createElement("div")
    d.textContent = text
    return d.innerHTML
  }

  onKeyDown(e: KeyboardEvent) {
    if (!this.enabled) return

    if (e.key === "Enter") {
      e.preventDefault()
      this.processInput()
      return
    }

    if (e.key === "Tab") {
      e.preventDefault()
      this.autocomplete()
      return
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (!this.history.length) return
      if (this.historyIdx === -1) {
        this.tempInput = this.inputEl.value
        this.historyIdx = this.history.length - 1
      } else if (this.historyIdx > 0) {
        this.historyIdx--
      }
      this.inputEl.value = this.history[this.historyIdx]
      this.clearHint()
      window.setTimeout(() => this.inputEl.setSelectionRange(9999, 9999), 0)
      return
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()
      if (this.historyIdx === -1) return
      if (this.historyIdx < this.history.length - 1) {
        this.historyIdx++
        this.inputEl.value = this.history[this.historyIdx]
      } else {
        this.historyIdx = -1
        this.inputEl.value = this.tempInput
      }
      this.clearHint()
      return
    }

    if (e.key === "c" && e.ctrlKey) {
      e.preventDefault()
      this.printPromptLine(this.inputEl.value + "^C")
      this.inputEl.value = ""
      this.historyIdx = -1
      this.clearHint()
      this.scrollToBottom()
      return
    }

    if (e.key === "l" && e.ctrlKey) {
      e.preventDefault()
      this.clear()
      return
    }
  }

  onInput() {
    this.updateAutocompleteHint()
  }

  processInput() {
    const raw = this.inputEl.value
    const input = raw.trim()
    this.inputEl.value = ""
    this.clearHint()
    this.historyIdx = -1
    this.tempInput = ""

    this.printPromptLine(raw)

    if (!input) {
      this.scrollToBottom()
      return
    }

    this.history.push(input)

    const parts = this.parseInput(input)
    const cmd = parts[0].toLowerCase()
    const args = parts.slice(1)

    if (COMMANDS[cmd]) {
      COMMANDS[cmd](args, this)
    } else {
      const guess = getNode(resolvePath(cmd, this.cwd))
      const safe = this.escapeHtml(cmd)
      if (guess?.type === "file") {
        this.printErr(
          `${safe}: comando no encontrado. <span class="tc-comment">¿Querías leer el archivo? Prueba:</span> <span class="tc-yellow">cat ${safe}</span>`,
        )
      } else if (guess?.type === "dir") {
        this.printErr(
          `${safe}: comando no encontrado. <span class="tc-comment">¿Querías entrar a la carpeta? Prueba:</span> <span class="tc-yellow">cd ${safe}</span>`,
        )
      } else {
        this.printErr(`${safe}: comando no encontrado. Escribe 'help' para ayuda.`)
      }
    }

    this.updatePrompt()
    this.scrollToBottom()
  }

  parseInput(input: string): string[] {
    const parts: string[] = []
    let current = ""
    let inQuote = false
    let quoteChar = ""
    for (let i = 0; i < input.length; i++) {
      const ch = input[i]
      if (inQuote) {
        if (ch === quoteChar) {
          inQuote = false
          continue
        }
        current += ch
      } else if (ch === '"' || ch === "'") {
        inQuote = true
        quoteChar = ch
      } else if (ch === " ") {
        if (current) {
          parts.push(current)
          current = ""
        }
      } else {
        current += ch
      }
    }
    if (current) parts.push(current)
    return parts
  }

  autocomplete() {
    const input = this.inputEl.value
    const parts = input.split(/\s+/)
    const isFirstToken = parts.length <= 1
    const partial = parts[parts.length - 1] || ""

    let candidates: string[]
    if (isFirstToken) {
      candidates = Object.keys(COMMANDS).filter((c) => c.startsWith(partial.toLowerCase()))
    } else {
      candidates = this.getPathCompletions(partial)
    }

    if (candidates.length === 0) return

    if (candidates.length === 1) {
      parts[parts.length - 1] = candidates[0]
      this.inputEl.value = parts.join(" ")
      this.clearHint()
    } else {
      const common = this.commonPrefix(candidates)
      if (common.length > partial.length) {
        parts[parts.length - 1] = common
        this.inputEl.value = parts.join(" ")
      }
      let out = "  "
      for (const c of candidates) {
        if (c.endsWith("/")) out += `<span class="tc-cyan b">${c}</span>  `
        else out += `${c}  `
      }
      this.print(out)
    }
  }

  getPathCompletions(partial: string): string[] {
    let dirPath = this.cwd
    let matchPrefix = partial

    if (partial.includes("/")) {
      const lastSlash = partial.lastIndexOf("/")
      const dirPart = partial.slice(0, lastSlash) || "/"
      matchPrefix = partial.slice(lastSlash + 1)
      dirPath = resolvePath(dirPart, this.cwd)
    }

    const node = getNode(dirPath)
    if (!node || node.type !== "dir") return []

    return Object.entries(node.children)
      .filter(([name]) => name.startsWith(matchPrefix))
      .map(([name, child]) => {
        const suffix = child.type === "dir" ? "/" : ""
        if (partial.includes("/")) {
          const lastSlash = partial.lastIndexOf("/")
          return partial.slice(0, lastSlash + 1) + name + suffix
        }
        return name + suffix
      })
  }

  commonPrefix(arr: string[]): string {
    if (!arr.length) return ""
    let prefix = arr[0]
    for (let i = 1; i < arr.length; i++) {
      while (!arr[i].startsWith(prefix)) {
        prefix = prefix.slice(0, -1)
      }
    }
    return prefix
  }

  updateAutocompleteHint() {
    if (!this.hintEl) return
    const input = this.inputEl.value
    if (!input) {
      this.clearHint()
      return
    }

    const parts = input.split(/\s+/)
    const partial = parts[parts.length - 1]
    const isFirst = parts.length <= 1

    let candidates: string[]
    if (isFirst) {
      candidates = Object.keys(COMMANDS).filter((c) => c.startsWith(partial.toLowerCase()))
    } else {
      candidates = this.getPathCompletions(partial)
    }

    if (candidates.length === 1 && candidates[0] !== partial) {
      this.hintEl.textContent = candidates[0].slice(partial.length)
      this.hintEl.style.left = this.getInputTextWidth() + "px"
    } else {
      this.clearHint()
    }
  }

  clearHint() {
    if (this.hintEl) this.hintEl.textContent = ""
  }

  getInputTextWidth(): number {
    const span = document.createElement("span")
    span.style.cssText = "font:inherit;visibility:hidden;position:absolute;white-space:pre"
    span.textContent = this.inputEl.value
    this.inputEl.parentElement?.appendChild(span)
    const w = span.offsetWidth
    span.remove()
    return w
  }
}
