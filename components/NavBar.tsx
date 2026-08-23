"use client"

import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler"
import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"

export default function NavBar() {
  const t = useTranslations()
  const locale = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const [mtlTime, setMtlTime] = useState("")
  const [lsnTime, setLsnTime] = useState("")
  const currentYear = new Date().getFullYear()

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

  useEffect(() => {
    if (!isOpen) return
    const onScroll = () => setIsOpen(false)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [isOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-foreground/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between text-sm">
          {/* Left: Brand Identity & Fixed-Width Menu Trigger (Zero Layout Shift) */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-foreground/80 hover:text-foreground transition-colors w-[80px] text-left shrink-0 select-none cursor-pointer"
              aria-label={isOpen ? t("nav.close") : t("nav.menu")}
              aria-expanded={isOpen}
            >
              <span className="w-2 h-2 rounded-full border border-foreground group-hover:bg-foreground transition-colors shrink-0" />
              <span className="w-[54px] inline-block shrink-0">{isOpen ? t("nav.close") : t("nav.menu")}</span>
            </button>

            <Link
              href={`/${locale}`}
              className="font-medium tracking-tight hover:opacity-70 transition-opacity flex items-center gap-1.5 shrink-0"
            >
              <span className="font-bold uppercase tracking-wider text-xs sm:text-sm">Victor Frangov</span>
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
              <span>MTL {mtlTime || "--:--"}</span>
              <span className="opacity-40">·</span>
              <span>LSN {lsnTime || "--:--"}</span>
            </div>
          </div>

          {/* Right: Quick actions & switches */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <nav className="hidden md:flex items-center gap-6 mr-2 font-mono text-xs uppercase tracking-wider text-foreground/70">
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
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-foreground/30 text-xs font-mono uppercase tracking-tight hover:bg-foreground hover:text-background transition-all duration-200"
            >
              <span>{t("nav.letsTalk")}</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </header>

      {/* Full-screen / Drawer Locomotive-style Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 sm:px-12 flex flex-col justify-between pb-12 animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-8 pt-8 relative z-10">
            <div className="md:col-span-8 space-y-4">
              <span className="text-xs font-mono text-foreground/50 tracking-widest uppercase">
                ( {t("nav.mainNav")} )
              </span>
              <ul className="space-y-3 pt-4 list-none m-0 p-0">
                {[
                  { href: "#main", num: "01", label: t("nav.overview") },
                  { href: "#about-me", num: "02", label: t("nav.aboutMe") },
                  { href: "#expertise", num: "03", label: t("nav.expertise") },
                  { href: "#projects", num: "04", label: t("nav.projects") },
                  { href: "#contact", num: "05", label: t("nav.contact") },
                ].map((item) => (
                  <li key={item.num}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-baseline gap-4 text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter hover:translate-x-3 transition-transform duration-300"
                    >
                      <span className="text-xs sm:text-sm font-mono text-foreground/40 group-hover:text-foreground">
                        ({item.num})
                      </span>
                      <span className="underline-offset-8 group-hover:underline">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4 flex flex-col justify-between space-y-8 border-t md:border-t-0 md:border-l border-foreground/10 pt-8 md:pt-0 md:pl-8">
              <div className="space-y-6">
                <span className="text-xs font-mono text-foreground/50 tracking-widest uppercase">
                  ( {t("nav.locations")} )
                </span>
                <div className="space-y-3 font-mono text-sm">
                  <div>
                    <div className="font-semibold">{t("nav.locationLsn")}</div>
                    <div className="text-xs text-foreground/60">{t("nav.locationLsnSub")}</div>
                  </div>
                  <div>
                    <div className="font-semibold">{t("nav.locationMtl")}</div>
                    <div className="text-xs text-foreground/60">{t("nav.locationMtlSub")}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <span className="text-xs font-mono text-foreground/50 tracking-widest uppercase">
                  ( {t("nav.connect")} )
                </span>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://github.com/victorfrangov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="loco-pill text-xs font-mono"
                  >
                    GitHub ↗
                  </a>
                  <a
                    href="https://www.linkedin.com/in/victor-frangov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="loco-pill text-xs font-mono"
                  >
                    LinkedIn ↗
                  </a>
                  <a
                    href="mailto:v@victorfrangov.com"
                    className="loco-pill text-xs font-mono"
                  >
                    Email ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Giant Background Watermark Name */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden z-0 px-4 sm:px-8 pb-2 flex items-end justify-center"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 1700 150"
              className="w-full h-auto max-h-[25vh] text-black dark:text-white"
            >
              <text
                x="50%"
                y="80%"
                textAnchor="middle"
                fill="currentColor"
                className="font-black uppercase select-none"
                style={{
                  fontSize: "135px",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  fontFamily: "var(--font-sans, inherit)",
                }}
              >
                VICTORFRANGOV©{currentYear}
              </text>
            </svg>
          </div>
        </div>
      )}
    </>
  )
}