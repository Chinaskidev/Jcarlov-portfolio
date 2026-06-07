"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { startTerminal } from "./boot"
import "./terminal.css"

export function TerminalPortfolio() {
  const router = useRouter()
  const startedRef = useRef(false)

  useEffect(() => {
    // Guard against React StrictMode double-invoke in dev.
    if (startedRef.current) return
    startedRef.current = true

    // Lock page scroll while the terminal owns the viewport.
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const cleanup = startTerminal({
      onGui: () => router.push("/portfolio"),
    })

    return () => {
      cleanup()
      document.body.style.overflow = prevOverflow
      startedRef.current = false
    }
  }, [router])

  return (
    <div className="term-root">
      {/* Boot screen */}
      <div id="boot-screen">
        <div id="boot-output" />
      </div>

      {/* Visual-mode bridge */}
      <button
        id="gui-link"
        type="button"
        onClick={() => router.push("/portfolio")}
        aria-label="Ver versión visual del portafolio"
      >
        [ modo visual ]
      </button>

      {/* Terminal */}
      <div id="terminal">
        <div id="terminal-header">
          <div className="dots">
            <span className="dot r" />
            <span className="dot y" />
            <span className="dot g" />
          </div>
          <span id="header-title">jcvasquez@portfolio: ~</span>
        </div>
        <div id="terminal-body">
          <div id="output" />
          <div id="input-line">
            <span id="prompt" />
            <div id="input-wrapper">
              <input
                id="cmd-input"
                type="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                disabled
              />
              <span id="autocomplete-hint" />
            </div>
          </div>
        </div>
      </div>

      {/* Scanline overlay */}
      <div id="scanlines" />

      {/* Exit overlay */}
      <div id="exit-overlay">
        <div>Conexión cerrada.</div>
        <div style={{ marginTop: 8, fontSize: 13, color: "var(--comment)" }}>
          La sesión ha terminado.
        </div>
        <button type="button" onClick={() => window.location.reload()}>
          Reconectar
        </button>
      </div>
    </div>
  )
}
