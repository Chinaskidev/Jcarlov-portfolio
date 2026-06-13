"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Github, Menu, X, SquareTerminal } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navItems = [
    { label: "Proyectos", href: "#projects" },
    { label: "Experiencia", href: "#experience" },
    { label: "Contacto", href: "#contact" },
  ]

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50" : ""
      }`}
    >
      <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-sm font-medium tracking-tight hover:text-muted-foreground transition-colors">
          Juan Carlos Vásquez
        </Link>

        <div className="hidden sm:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://github.com/Chinaskidev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
          </a>
          <Link
            href="/terminal"
            aria-label="Ver versión terminal"
            title="Modo terminal"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <SquareTerminal className="h-4 w-4" />
          </Link>
        </div>

        <button
          className="sm:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menú"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="sm:hidden border-b border-border/50 bg-background/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4 text-sm">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/terminal"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <SquareTerminal className="h-4 w-4" />
            Modo terminal
          </Link>
        </div>
      )}
    </nav>
  )
}
