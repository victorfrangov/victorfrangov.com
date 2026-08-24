"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler"
import { useEffect, useState } from "react"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { MontrealLogo } from "./MontrealLogo"
import { SwissCross } from "./SwissCross"

export default function NavBar() {
  const t = useTranslations()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isFading, setIsFading] = useState(false)
  const [fadeVisible, setFadeVisible] = useState(false)
  const [mtlTime, setMtlTime] = useState("")
  const [lsnTime, setLsnTime] = useState("")
  const currentYear = new Date().getFullYear()

  // Pre-warm client mounting for instant zero-lag menu opening
  useEffect(() => {
    setMounted(true)
  }, [])

  // Track live city clocks
  useEffect(() => {
    const updateClocks = () => {
      const now = new Date()
      setMtlTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "America/Montreal",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(now)
      )
      setLsnTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Europe/Zurich",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(now)
      )
    }

    updateClocks()
    const interval = setInterval(updateClocks, 1000)
    return () => clearInterval(interval)
  }, [])

  // When menu is open, lock page scroll and intercept any scroll (UP or DOWN) to only close menu without scrolling the page
  useEffect(() => {
    if (isOpen) {
      window.dispatchEvent(new CustomEvent("lenis:stop"))
      document.documentElement.style.overflow = "hidden"
      document.body.style.overflow = "hidden"

      let isClosing = false

      const handleWheel = (e: WheelEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (!isClosing && Math.abs(e.deltaY) > 6) {
          isClosing = true
          setIsOpen(false)
        }
      }

      let touchStartY = 0
      const handleTouchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY
      }

      const handleTouchMove = (e: TouchEvent) => {
        const touchDelta = touchStartY - e.touches[0].clientY
        if (!isClosing && Math.abs(touchDelta) > 30) {
          isClosing = true
          setIsOpen(false)
        }
      }

      window.addEventListener("wheel", handleWheel, { passive: false })
      window.addEventListener("touchstart", handleTouchStart, { passive: true })
      window.addEventListener("touchmove", handleTouchMove, { passive: true })

      return () => {
        window.removeEventListener("wheel", handleWheel)
        window.removeEventListener("touchstart", handleTouchStart)
        window.removeEventListener("touchmove", handleTouchMove)
      }
    } else {
      window.dispatchEvent(new CustomEvent("lenis:start"))
      document.documentElement.style.overflow = ""
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Close menu on Escape key
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen])

  // Navigation transition: Smooth Fade In -> Exact Section Jump (offset 0) -> Smooth Fade Out
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()

      // 1. Mount overlay at opacity-0
      setIsFading(true)
      setFadeVisible(false)

      // 2. Trigger smooth fade-in to opacity-1
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFadeVisible(true)
        })
      })

      // 3. Once fully covered (350ms), jump directly to the EXACT section boundary (offset 0)
      setTimeout(() => {
        // Close menu & unlock scroll
        setIsOpen(false)
        document.documentElement.style.overflow = ""
        document.body.style.overflow = ""
        window.dispatchEvent(new CustomEvent("lenis:start"))

        const target = document.querySelector(href) as HTMLElement | null
        if (target) {
          if (typeof window !== "undefined" && (window as any).__lenis) {
            ; (window as any).__lenis.scrollTo(target, { immediate: true, offset: 0 })
          } else {
            const y = target.getBoundingClientRect().top + window.scrollY
            window.scrollTo({ top: y, behavior: "instant" as any })
          }
        }

        // 4. Smoothly fade out to reveal the section
        setTimeout(() => {
          setFadeVisible(false)
          setTimeout(() => {
            setIsFading(false)
          }, 450)
        }, 80)
      }, 350)
    }
  }

  // Hamburger menu panel click: Instantly jumps to the section in the background and scrolls the menu rectangles back up
  const handlePanelClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()

      // 1. Immediately unlock overflow and resume Lenis so the browser permits instant section positioning
      document.documentElement.style.overflow = ""
      document.body.style.overflow = ""
      window.dispatchEvent(new CustomEvent("lenis:start"))
      if (typeof window !== "undefined" && (window as any).__lenis) {
        ; (window as any).__lenis.start()
      }

      // 2. Jump to the target section
      const target = document.querySelector(href) as HTMLElement | null
      if (target) {
        if (typeof window !== "undefined" && (window as any).__lenis) {
          ; (window as any).__lenis.scrollTo(target, { immediate: true, offset: 0, force: true })
        } else {
          const y = target.getBoundingClientRect().top + window.scrollY
          window.scrollTo({ top: y, behavior: "instant" as any })
        }
      }

      // 3. Trigger the hamburger menu to close
      setIsOpen(false)
    }
  }

  // 5 Brutalist Navigation Panels (Cascading heights on desktop, horizontal bars on mobile)
  const navPanels = [
    { href: "#main", num: 1, label: t("nav.overview"), heightClass: "md:h-[54vh] lg:h-[60vh]" },
    { href: "#about-me", num: 2, label: t("nav.aboutMe"), heightClass: "md:h-[48vh] lg:h-[54vh]" },
    { href: "#expertise", num: 3, label: t("nav.expertise"), heightClass: "md:h-[42vh] lg:h-[48vh]" },
    { href: "#projects", num: 4, label: t("nav.projects"), heightClass: "md:h-[36vh] lg:h-[42vh]" },
    { href: "#contact", num: 5, label: t("nav.contact"), heightClass: "md:h-[30vh] lg:h-[36vh]" },
  ]

  return (
    <>
      {/* Full Page Transition Overlay with Victor Frangov Wordmark at bottom */}
      {isFading && (
        <div
          className={`fixed inset-0 z-[100] bg-background flex flex-col justify-end pointer-events-auto transition-opacity duration-350 ease-in-out ${fadeVisible ? "opacity-100" : "opacity-0"
            }`}
          aria-hidden="true"
        >
          <div className="w-full overflow-hidden select-none px-4 sm:px-8 pb-3 pt-1 flex items-end justify-center">
            <h2 className="text-[7.2vw] font-black tracking-[-0.04em] leading-[0.85] uppercase text-black dark:text-white text-center w-full whitespace-nowrap">
              VICTORFRANGOV©{currentYear}
            </h2>
          </div>
        </div>
      )}

      {/* 1. Plain Text MENU / CLOSE Button in Total Top-Right Corner */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 sm:top-6 sm:right-8 z-[60] text-xs sm:text-sm font-mono uppercase tracking-widest font-bold mix-blend-difference text-white hover:opacity-70 transition-all duration-500 select-none cursor-pointer bg-transparent border-0 p-0 shadow-none opacity-100 pointer-events-auto translate-y-0"
        aria-label={isOpen ? t("nav.close") : t("nav.menu")}
      >
        {isOpen ? t("nav.close") : t("nav.menu")}
      </button>

      {/* 3. Full-Screen Brutalist Slide-Down Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-background/98 backdrop-blur-md flex flex-col justify-between p-0 transition-all ${isOpen
          ? "opacity-100 pointer-events-auto duration-500 delay-0"
          : "opacity-0 pointer-events-none duration-700 delay-700"
          }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Top Wrapper: Compact top safe area for FERMER + 5 Panels grouped together with zero black gap */}
        <div className="w-full flex flex-col relative z-10">
          {/* Mobile Top Row: Gives FERMER its own dedicated row, no left logo */}
          <div className="w-full flex md:hidden items-center justify-end px-4 pt-3.5 pb-2">
            <div className="w-16 h-5" />
          </div>

          {/* 5 Brutalist Panels (Horizontal stacked on mobile, Vertical cascading on desktop) */}
          <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-0 items-stretch md:items-start border-b border-foreground/20">
            {navPanels.map((panel, idx) => (
              <Link
                key={panel.num}
                href={panel.href}
                onClick={(e) => handlePanelClick(e, panel.href)}
                style={{
                  transitionDelay: isOpen ? `${idx * 80}ms` : `${(4 - idx) * 50}ms`,
                }}
                className={`group relative overflow-hidden flex flex-row md:flex-col items-center md:items-stretch justify-between px-5 py-3.5 sm:px-6 sm:py-4 md:p-6 lg:p-8 h-[9vh] sm:h-[10.5vh] ${panel.heightClass} bg-neutral-300 dark:bg-neutral-800 text-foreground border-b md:border-b-0 md:border-r border-foreground/20 rounded-none shadow-none will-change-transform transform-gpu transition-all duration-[800ms] md:duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-neutral-400/90 dark:hover:bg-neutral-700/90 select-none cursor-pointer transform ${isOpen
                  ? "translate-x-0 opacity-100 md:translate-y-0"
                  : "-translate-x-full opacity-0 md:opacity-100 md:translate-x-0 md:-translate-y-[120%]"
                  }`}
              >
                {mounted && panel.href === "#main" && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <video
                      src="/rum.webm"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover object-[56%_center] scale-[1.02] group-hover:opacity-95 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
                  </div>
                )}
                {mounted && panel.href === "#about-me" && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <video
                      src="/hello.webm"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover scale-[1.02] group-hover:opacity-95 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
                  </div>
                )}
                {mounted && panel.href === "#expertise" && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <video
                      src="/interstellar.webm"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover scale-[1.02] group-hover:opacity-95 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
                  </div>
                )}
                {mounted && panel.href === "#projects" && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <video
                      src="/tonystark.webm"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover object-[70%_center] scale-[1.02] group-hover:opacity-95 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
                  </div>
                )}
                {mounted && panel.href === "#contact" && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <video
                      src="/jamesbond.webm"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover scale-[1.02] group-hover:opacity-95 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
                  </div>
                )}

                {/* Number index badge on left/top */}
                <div className="relative z-10 flex items-center md:items-start">
                  <span className="text-xs font-mono opacity-60 text-white md:block">
                    0{panel.num}
                  </span>
                </div>

                {/* Section Title & Arrow Indicator */}
                <div className="space-y-0.5 md:space-y-1 relative z-10 flex items-center md:block gap-3">
                  <span className="block text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white group-hover:translate-x-1 transition-transform duration-200">
                    {panel.label}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-white/70 flex items-center gap-1 opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="hidden md:inline">Jump</span>
                    <ArrowDown className="w-3 h-3 hidden md:inline" />
                    <ArrowUpRight className="w-3.5 h-3.5 md:hidden text-white/80" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Middle: Interactive Utility Bar (Bigger typography, clocks & toggles) */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-4 sm:py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 text-sm sm:text-base font-mono relative z-20 border-t border-foreground/15">
          {/* Status & Clocks */}
          <div className="flex flex-wrap items-center justify-between md:justify-start gap-4 sm:gap-6 text-foreground/80">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-foreground font-semibold text-sm sm:text-base">
                {t("nav.availableForProjects")}
              </span>
            </div>
            <span className="opacity-30 hidden sm:inline text-base">/</span>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-2">
                <MontrealLogo className="w-5 h-5 inline-block shrink-0" />
                <span className="font-bold text-foreground text-sm sm:text-base">{mtlTime || "--:--"}</span>
              </span>
              <span className="opacity-40">·</span>
              <span className="inline-flex items-center gap-2">
                <SwissCross className="w-5 h-5 inline-block shrink-0" />
                <span className="font-bold text-foreground text-sm sm:text-base">{lsnTime || "--:--"}</span>
              </span>
            </div>
          </div>

          {/* Language Switcher, Theme Toggler & Let's Talk */}
          <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-5 pt-2 md:pt-0 border-t border-foreground/10 md:border-t-0">
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              <LanguageSwitcher className="text-sm sm:text-base" buttonClassName="px-3.5 py-1" />
              <AnimatedThemeToggler className="p-2 sm:p-2.5 rounded-full border border-foreground/30 hover:bg-foreground/10 transition-colors flex items-center justify-center [&_svg]:w-5 [&_svg]:h-5" />
            </div>

            <Link
              href="#contact"
              onClick={(e) => handlePanelClick(e, "#contact")}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full border border-foreground/40 bg-background hover:bg-foreground hover:text-background text-sm sm:text-base font-mono uppercase font-bold tracking-tight transition-all duration-200 shadow-sm"
            >
              <span>{t("nav.letsTalk")}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Bottom: Victor Frangov Wordmark (Sized to fit 100% width with zero cutoff) */}
        <div
          className="w-full overflow-hidden select-none relative z-0 px-4 sm:px-8 pb-3 pt-1 flex items-end justify-center"
          aria-hidden="true"
        >
          <h2 className="text-[7.2vw] font-black tracking-[-0.04em] leading-[0.85] uppercase text-black dark:text-white text-center w-full whitespace-nowrap">
            VICTORFRANGOV©{currentYear}
          </h2>
        </div>
      </div>
    </>
  )
}