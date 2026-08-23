"use client"

import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler"
import { useEffect, useState } from "react"
import { ArrowDown, ArrowUpRight } from "lucide-react"

export default function NavBar() {
  const t = useTranslations()
  const locale = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mtlTime, setMtlTime] = useState("")
  const [lsnTime, setLsnTime] = useState("")
  const currentYear = new Date().getFullYear()

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

  // Track scroll position to transition navbar into hamburger mode
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu on Escape key
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen])

  const navItems = [
    { href: "#main", num: 1, label: t("nav.overview") },
    { href: "#about-me", num: 2, label: t("nav.aboutMe") },
    { href: "#expertise", num: 3, label: t("nav.expertise") },
    { href: "#projects", num: 4, label: t("nav.projects") },
    { href: "#contact", num: 5, label: t("nav.contact") },
  ]

  return (
    <>
      {/* Fixed Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-foreground/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between text-sm">
          
          {/* Left: Brand Identity & Menu Trigger on Scrolled */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            {/* Hamburger Trigger (Always visible or visible when scrolled / clicked) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`group flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 select-none cursor-pointer ${
                isScrolled || isOpen
                  ? "px-3.5 py-1.5 rounded-full border border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground"
                  : "text-foreground/80 hover:text-foreground"
              }`}
              aria-label={isOpen ? t("nav.close") : t("nav.menu")}
              aria-expanded={isOpen}
            >
              <span className={`w-2 h-2 rounded-full border border-current transition-all shrink-0 ${isOpen ? "bg-current" : "group-hover:bg-current"}`} />
              <span>{isOpen ? t("nav.close") : t("nav.menu")}</span>
            </button>

            <Link
              href={`/${locale}`}
              onClick={() => setIsOpen(false)}
              className="font-medium tracking-tight hover:opacity-70 transition-opacity flex items-center gap-1.5 shrink-0 select-none"
            >
              <span className="font-extrabold uppercase tracking-wider text-xs sm:text-sm">Victor Frangov</span>
              <span className="text-[10px] font-mono opacity-60">®</span>
            </Link>
          </div>

          {/* Center: Live dual-city timezones & status indicator (Visible at top) */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-mono text-foreground/70 transition-opacity duration-300">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-foreground/90 font-medium">
                {t("nav.availableForProjects")}
              </span>
            </div>
            <span className="opacity-30">/</span>
            <div className="flex items-center gap-3">
              <span>MTL {mtlTime || "--:--"}</span>
              <span className="opacity-40">·</span>
              <span>LSN {lsnTime || "--:--"}</span>
            </div>
          </div>

          {/* Right: Inline nav links when at top, switches and action button */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Inline Navigation Links (Visible when at top, collapses into hamburger when scrolled) */}
            <nav
              className={`hidden md:flex items-center gap-5 mr-2 font-mono text-xs uppercase tracking-wider text-foreground/70 transition-all duration-300 ${
                isScrolled ? "opacity-0 pointer-events-none -translate-x-2 hidden" : "opacity-100 translate-x-0"
              }`}
            >
              <Link href="#expertise" className="hover:text-foreground transition-colors">
                {t("nav.expertise")}
              </Link>
              <Link href="#projects" className="hover:text-foreground transition-colors">
                {t("nav.projects")}
              </Link>
              <Link href="#contact" className="hover:text-foreground transition-colors">
                {t("nav.contact")}
              </Link>
            </nav>

            <LanguageSwitcher />
            <AnimatedThemeToggler />

            <Link
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-foreground/30 text-xs font-mono uppercase tracking-tight hover:bg-foreground hover:text-background transition-all duration-200"
            >
              <span>{t("nav.letsTalk")}</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </header>

      {/* Slide-Down Column Panels Menu Overlay (Only 5 Sections + Victor Frangov at Bottom) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/90 backdrop-blur-2xl flex flex-col justify-between pt-20 sm:pt-24 pb-4 sm:pb-8 px-4 sm:px-8 animate-in fade-in duration-300 overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          {/* Top: 5 Vertical Slide-Down Panel Cards */}
          <div className="max-w-7xl mx-auto w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 pt-4 sm:pt-6 relative z-10">
            {navItems.map((item, idx) => (
              <Link
                key={item.num}
                href={item.href}
                onClick={() => setIsOpen(false)}
                style={{
                  animationDelay: `${idx * 60}ms`,
                  animationFillMode: "backwards",
                }}
                className="group flex flex-col justify-between p-4 sm:p-6 lg:p-7 min-h-[42vh] sm:min-h-[50vh] md:min-h-[56vh] bg-neutral-200/90 dark:bg-neutral-800/90 hover:bg-neutral-300/95 dark:hover:bg-neutral-700/95 border border-foreground/10 rounded-b-2xl sm:rounded-b-3xl shadow-xl transition-all duration-300 hover:-translate-y-1.5 animate-in slide-in-from-top-12 duration-500 select-none cursor-pointer"
              >
                {/* Number Badge at Top */}
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-foreground text-background font-mono text-xs font-bold flex items-center justify-center shadow-sm">
                    {item.num}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-foreground/40 group-hover:text-foreground transition-colors">
                    ( 0{item.num} )
                  </span>
                </div>

                {/* Section Title at Bottom */}
                <div className="space-y-1">
                  <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground group-hover:translate-x-1 transition-transform duration-200">
                    {item.label}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-foreground/50 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Jump to section</span>
                    <ArrowDown className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom: Victor Frangov with Copyright Watermark taking up the bottom space */}
          <div
            className="w-full max-w-7xl mx-auto overflow-hidden select-none relative z-0 pt-4 flex items-end justify-center"
            aria-hidden="true"
          >
            <h2 className="text-[12vw] sm:text-[13vw] font-extrabold tracking-[-0.055em] leading-[0.82] uppercase text-black dark:text-white text-center w-full whitespace-nowrap">
              VICTORFRANGOV©{currentYear}
            </h2>
          </div>
        </div>
      )}
    </>
  )
}