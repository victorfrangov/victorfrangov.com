"use client"

import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler"
import { useEffect, useState, useRef } from "react"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { MontrealLogo } from "./MontrealLogo"
import { SwissCross } from "./SwissCross"

export default function NavBar() {
  const t = useTranslations()
  const locale = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const [renderVideos, setRenderVideos] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isFading, setIsFading] = useState(false)
  const [fadeVisible, setFadeVisible] = useState(false)
  const [mtlTime, setMtlTime] = useState("")
  const [lsnTime, setLsnTime] = useState("")
  const currentYear = new Date().getFullYear()
  const lastScrollY = useRef(0)

  // Keep videos active while menu is open and during the full slide-up closing transition
  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isOpen) {
      setRenderVideos(true)
    } else {
      timeout = setTimeout(() => {
        setRenderVideos(false)
      }, 1500)
    }
    return () => clearTimeout(timeout)
  }, [isOpen])

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

  // Track scroll position to reveal the MENU button when scrolled past top
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      if (currentScroll > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
      lastScrollY.current = currentScroll
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
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
        if (!isClosing && Math.abs(e.deltaY) > 3) {
          isClosing = true
          setIsOpen(false)
        }
      }

      let touchStartY = 0
      const handleTouchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY
      }

      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const touchDelta = touchStartY - e.touches[0].clientY
        if (!isClosing && Math.abs(touchDelta) > 5) {
          isClosing = true
          setIsOpen(false)
        }
      }

      window.addEventListener("wheel", handleWheel, { passive: false })
      window.addEventListener("touchstart", handleTouchStart, { passive: true })
      window.addEventListener("touchmove", handleTouchMove, { passive: false })

      return () => {
        window.removeEventListener("wheel", handleWheel)
        window.removeEventListener("touchstart", handleTouchStart)
        window.removeEventListener("touchmove", handleTouchMove)
      }
    } else {
      // Menu just closed: keep scroll locked until the 1300ms + stagger slide-up animation completes
      const unlockTimer = setTimeout(() => {
        window.dispatchEvent(new CustomEvent("lenis:start"))
        document.documentElement.style.overflow = ""
        document.body.style.overflow = ""
      }, 1600)

      return () => clearTimeout(unlockTimer)
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
            ;(window as any).__lenis.scrollTo(target, { immediate: true, offset: 0 })
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
        ;(window as any).__lenis.start()
      }

      // 2. Jump instantly to the section in the background underneath the open menu
      const target = document.querySelector(href) as HTMLElement | null
      if (target) {
        target.scrollIntoView({ behavior: "instant" as any, block: "start" })
        if (typeof window !== "undefined" && (window as any).__lenis) {
          ;(window as any).__lenis.scrollTo(target, { immediate: true, offset: 0, force: true })
        }
      }

      // 3. Trigger the hamburger menu rectangles to scroll back up
      setIsOpen(false)
    }
  }

  // 5 Brutalist Navigation Panels (Cascading heights, flush zero-gap grid)
  const navPanels = [
    { href: "#main", num: 1, label: t("nav.overview"), heightClass: "h-[54vh] sm:h-[60vh]" },
    { href: "#about-me", num: 2, label: t("nav.aboutMe"), heightClass: "h-[48vh] sm:h-[54vh]" },
    { href: "#expertise", num: 3, label: t("nav.expertise"), heightClass: "h-[42vh] sm:h-[48vh]" },
    { href: "#projects", num: 4, label: t("nav.projects"), heightClass: "h-[36vh] sm:h-[42vh]" },
    { href: "#contact", num: 5, label: t("nav.contact"), heightClass: "h-[30vh] sm:h-[36vh]" },
  ]

  return (
    <>
      {/* Full Page Transition Overlay with Victor Frangov Wordmark at bottom */}
      {isFading && (
        <div
          className={`fixed inset-0 z-[100] bg-background flex flex-col justify-end pointer-events-auto transition-opacity duration-350 ease-in-out ${
            fadeVisible ? "opacity-100" : "opacity-0"
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

      {/* 1. Plain Text MENU / CLOSE Button in Total Top-Right Corner (mix-blend-difference ensures white on black, black on white) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-4 right-4 sm:top-6 sm:right-8 z-[60] text-xs sm:text-sm font-mono uppercase tracking-widest font-bold mix-blend-difference text-white hover:opacity-70 transition-all duration-500 select-none cursor-pointer bg-transparent border-0 p-0 shadow-none ${
          isOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : isScrolled
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-2"
        }`}
        aria-label={isOpen ? t("nav.close") : t("nav.menu")}
      >
        {isOpen ? t("nav.close") : t("nav.menu")}
      </button>

      {/* 2. Top Header Bar (Sitting at top, NO menu button, disappears completely on scroll or when menu open) */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 bg-background/85 backdrop-blur-md border-b border-foreground/10 transition-all duration-500 ${
          isScrolled || isOpen
            ? "-translate-y-full opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between text-sm">
          {/* Left: Brand Identity (No menu button) */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            <Link
              href="#main"
              onClick={(e) => handleNavClick(e, "#main")}
              className="font-medium tracking-tight hover:opacity-70 transition-opacity flex items-center gap-1.5 shrink-0 select-none"
            >
              <span className="font-extrabold uppercase tracking-wider text-xs sm:text-sm">Victor Frangov</span>
              <span className="text-[10px] font-mono opacity-60">®</span>
            </Link>
          </div>

          {/* Center: Live dual-city timezones & status indicator */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-mono text-foreground/70">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-foreground/90 font-medium">
                {t("nav.availableForProjects")}
              </span>
            </div>
            <span className="opacity-30">/</span>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5">
                <MontrealLogo className="w-3.5 h-3.5 inline-block shrink-0" />
                <span className="font-bold text-foreground">{mtlTime || "--:--"}</span>
              </span>
              <span className="opacity-40">·</span>
              <span className="inline-flex items-center gap-1.5">
                <SwissCross className="w-3.5 h-3.5 inline-block shrink-0" />
                <span className="font-bold text-foreground">{lsnTime || "--:--"}</span>
              </span>
            </div>
          </div>

          {/* Right: Inline nav links, switches, and Let's talk */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <nav className="hidden md:flex items-center gap-5 mr-2 font-mono text-xs uppercase tracking-wider text-foreground/70">
              <Link
                href="#expertise"
                onClick={(e) => handleNavClick(e, "#expertise")}
                className="hover:text-foreground transition-colors"
              >
                {t("nav.expertise")}
              </Link>
              <Link
                href="#projects"
                onClick={(e) => handleNavClick(e, "#projects")}
                className="hover:text-foreground transition-colors"
              >
                {t("nav.projects")}
              </Link>
              <Link
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="hover:text-foreground transition-colors"
              >
                {t("nav.contact")}
              </Link>
            </nav>

            <LanguageSwitcher />
            <AnimatedThemeToggler />

            <Link
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-foreground/30 text-xs font-mono uppercase tracking-tight hover:bg-foreground hover:text-background transition-all duration-200"
            >
              <span>{t("nav.letsTalk")}</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </header>

      {/* 3. Full-Screen Brutalist Slide-Down Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl flex flex-col justify-between p-0 transition-all ${
          isOpen
            ? "opacity-100 pointer-events-auto duration-500 delay-0"
            : "opacity-0 pointer-events-none duration-700 delay-700"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Top: 5 Brutalist Contiguous Rectangles with smooth physical Slide-Down & Swipe-Up animation */}
        <div className="w-full grid grid-cols-5 gap-0 items-start border-b border-foreground/20 relative z-10">
          {navPanels.map((panel, idx) => (
            <Link
              key={panel.num}
              href={panel.href}
              onClick={(e) => handlePanelClick(e, panel.href)}
              style={{
                transitionDelay: isOpen ? `${idx * 110}ms` : `${(4 - idx) * 75}ms`,
              }}
              className={`group relative overflow-hidden flex flex-col justify-between p-4 sm:p-6 lg:p-8 ${panel.heightClass} bg-neutral-300 dark:bg-neutral-800 text-foreground border-r border-b border-foreground/20 rounded-none shadow-none transition-all duration-[1300ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-neutral-400/90 dark:hover:bg-neutral-700/90 select-none cursor-pointer transform ${
                isOpen ? "translate-y-0" : "-translate-y-[120%]"
              }`}
            >
              {renderVideos && panel.href === "#main" && (
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
                  <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
                </div>
              )}
              {renderVideos && panel.href === "#about-me" && (
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
                  <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
                </div>
              )}
              {renderVideos && panel.href === "#expertise" && (
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
                  <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
                </div>
              )}
              {renderVideos && panel.href === "#projects" && (
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
                  <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
                </div>
              )}
              {renderVideos && panel.href === "#contact" && (
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
                  <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
                </div>
              )}

              <div className="relative z-10" />

              {/* Bottom: Big Section Title */}
              <div className="space-y-1 relative z-10">
                <span className="block text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white group-hover:translate-x-1 transition-transform duration-200">
                  {panel.label}
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-white/70 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Jump</span>
                  <ArrowDown className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Middle: Interactive Utility Bar (Placed cleanly right above the bottom name for 100% clickability) */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4 text-xs font-mono relative z-20 border-t border-foreground/10">
          {/* Status & Clocks */}
          <div className="flex items-center gap-4 text-foreground/70">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-foreground/90 font-medium">
                {t("nav.availableForProjects")}
              </span>
            </div>
            <span className="opacity-30">/</span>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5">
                <MontrealLogo className="w-3.5 h-3.5 inline-block shrink-0" />
                <span className="font-bold text-foreground">{mtlTime || "--:--"}</span>
              </span>
              <span className="opacity-40">·</span>
              <span className="inline-flex items-center gap-1.5">
                <SwissCross className="w-3.5 h-3.5 inline-block shrink-0" />
                <span className="font-bold text-foreground">{lsnTime || "--:--"}</span>
              </span>
            </div>
          </div>

          {/* Language Switcher, Theme Toggler & Let's Talk */}
          <div className="flex items-center gap-3 sm:gap-4">
            <LanguageSwitcher />
            <AnimatedThemeToggler />

            <Link
              href="#contact"
              onClick={(e) => handlePanelClick(e, "#contact")}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-foreground/40 bg-background hover:bg-foreground hover:text-background text-xs font-mono uppercase tracking-tight transition-all duration-200 shadow-sm"
            >
              <span>{t("nav.letsTalk")}</span>
              <ArrowUpRight className="w-3 h-3" />
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