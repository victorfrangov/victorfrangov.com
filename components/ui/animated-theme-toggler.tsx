"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = resolvedTheme || theme || "light"
  const isDark = currentTheme === "dark"

  const toggleTheme = useCallback(async () => {
    const nextTheme = isDark ? "light" : "dark"

    if (
      typeof document === "undefined" ||
      !("startViewTransition" in document) ||
      typeof (document as any).startViewTransition !== "function"
    ) {
      setTheme(nextTheme)
      return
    }

    try {
      const transition = (document as any).startViewTransition(() => {
        flushSync(() => {
          setTheme(nextTheme)
        })
      })

      await transition.ready

      if (!buttonRef.current) return

      const { top, left, width, height } =
        buttonRef.current.getBoundingClientRect()
      const x = left + width / 2
      const y = top + height / 2
      const maxRadius = Math.hypot(
        Math.max(left, window.innerWidth - left),
        Math.max(top, window.innerHeight - top)
      )

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    } catch {
      setTheme(nextTheme)
    }
  }, [isDark, setTheme, duration])

  if (!mounted) {
    return (
      <button
        type="button"
        className={cn(className)}
        aria-label="Toggle theme"
        {...props}
      >
        <Moon className="w-5 h-5" />
        <span className="sr-only">Toggle theme</span>
      </button>
    )
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      className={cn(className)}
      aria-label="Toggle theme"
      {...props}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
