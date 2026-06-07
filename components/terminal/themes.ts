/* themes.ts — color themes & theme switcher */

import type { Theme } from "./types"

/* ============================================
   themes
   ============================================ */

export const THEMES: Record<string, Theme> = {
  monokai: {
    name: "Monokai",
    vars: {
      "--bg": "#272822", "--fg": "#F8F8F2", "--comment": "#75715E",
      "--red": "#F92672", "--orange": "#FD971F", "--yellow": "#E6DB74",
      "--green": "#A6E22E", "--cyan": "#66D9EF", "--purple": "#AE81FF",
      "--selection": "#49483E", "--header-bg": "#1E1F1C", "--border": "#3E3D32",
      "--glow": "none",
    },
  },
  matrix: {
    name: "Matrix",
    vars: {
      "--bg": "#0a0a0a", "--fg": "#00FF41", "--comment": "#007A1F",
      "--red": "#00FF41", "--orange": "#33FF66", "--yellow": "#66FF99",
      "--green": "#00FF41", "--cyan": "#00FF41", "--purple": "#00CC33",
      "--selection": "#002200", "--header-bg": "#050505", "--border": "#003B00",
      "--glow": "0 0 5px #00FF4180",
    },
  },
  kali: {
    name: "Kali Linux",
    vars: {
      "--bg": "#171421", "--fg": "#e0e0e0", "--comment": "#6272a4",
      "--red": "#ff5555", "--orange": "#ffb86c", "--yellow": "#f1fa8c",
      "--green": "#50fa7b", "--cyan": "#8be9fd", "--purple": "#bd93f9",
      "--selection": "#44475a", "--header-bg": "#0e0c15", "--border": "#44475a",
      "--glow": "none",
    },
  },
  amber: {
    name: "Amber CRT",
    vars: {
      "--bg": "#1a1200", "--fg": "#FFB000", "--comment": "#805800",
      "--red": "#FF6600", "--orange": "#FFB000", "--yellow": "#FFD700",
      "--green": "#FFB000", "--cyan": "#FFC040", "--purple": "#FF8C00",
      "--selection": "#332600", "--header-bg": "#0D0900", "--border": "#4D3800",
      "--glow": "0 0 5px #FFB00060",
    },
  },
  solarized: {
    name: "Solarized Dark",
    vars: {
      "--bg": "#002b36", "--fg": "#839496", "--comment": "#586e75",
      "--red": "#dc322f", "--orange": "#cb4b16", "--yellow": "#b58900",
      "--green": "#859900", "--cyan": "#2aa198", "--purple": "#6c71c4",
      "--selection": "#073642", "--header-bg": "#001E27", "--border": "#073642",
      "--glow": "none",
    },
  },
}

export let currentTheme = "monokai"

export function applyTheme(name: string): boolean {
  const t = THEMES[name]
  if (!t) return false
  const s = document.documentElement.style
  for (const [k, v] of Object.entries(t.vars)) s.setProperty(k, v)
  currentTheme = name
  try {
    localStorage.setItem("portfolio-theme", name)
  } catch {
    /* ignore */
  }
  const crt = document.getElementById("scanlines")
  if (crt) crt.style.opacity = name === "amber" || name === "matrix" ? "0.06" : "0.02"
  return true
}
