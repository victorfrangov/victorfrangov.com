"use client"

import { useEffect, useRef, ReactNode } from "react"
import Lenis from "lenis"

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    // Handle all internal in-page hash links smoothly
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const anchor = target?.closest("a")
      if (!anchor) return
      
      const href = anchor.getAttribute("href")
      if (!href) return

      if (href.startsWith("#") || (href.includes("#") && !href.startsWith("http"))) {
        const hash = href.slice(href.indexOf("#"))
        if (hash.length > 1) {
          const elem = document.querySelector(hash)
          if (elem) {
            e.preventDefault()
            lenis.scrollTo(elem as HTMLElement, { offset: -60, duration: 1.4 })
          }
        }
      }
    }

    const handleStop = () => lenis.stop()
    const handleStart = () => lenis.start()

    window.addEventListener("lenis:stop", handleStop)
    window.addEventListener("lenis:start", handleStart)
    document.addEventListener("click", handleAnchorClick, { capture: true })

    if (typeof window !== "undefined") {
      ;(window as any).__lenis = lenis
    }

    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true })
      window.removeEventListener("lenis:stop", handleStop)
      window.removeEventListener("lenis:start", handleStart)
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
