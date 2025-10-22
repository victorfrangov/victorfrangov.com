"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const toggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark")

  return (
    <button
      onClick={toggle}
      className="w-9 h-9 flex items-center justify-center border border-border hover:border-foreground/40 transition-colors rounded"
      aria-label="Toggle theme"
    >
      {!mounted ? <Sun className="w-4 h-4" /> : resolvedTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  )
}
