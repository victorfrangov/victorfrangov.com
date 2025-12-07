"use client"

import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler"
import { ScrollProgress } from "./ui/scroll-progress"
import { TypingAnimation } from "./ui/typing-animation"
import { useEffect, useRef, useState } from "react"

export default function NavBar() {
  const t = useTranslations()
  const locale = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLElement | null>(null)
  const [navHeight, setNavHeight] = useState(0)

  // Force a single re-mount after hydration to start the animation once
  const [animationKey, setAnimationKey] = useState(0)
  useEffect(() => {
    setAnimationKey(k => k + 1)
  }, [])

  useEffect(() => {
    const measure = () => setNavHeight(navRef.current?.offsetHeight ?? 0)
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onScroll = () => setIsOpen(false)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [isOpen])

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 sm:py-8 bg-background/80 backdrop-blur border-b border-border/60">
      {!isOpen && <ScrollProgress barClassName="bg-blue-500" />}

      {/* Top bar content stays visible on mobile when menu is open */}
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        <Link href={`/${locale}`} className="text-sm sm:text-base font-medium max-w-[280px] sm:max-w-[360px] truncate">
          <TypingAnimation
            key={animationKey} // re-mount once on initial client render
            className="text-sm sm:text-base text-muted-foreground"
            words={[t("nav.greeting"), t("nav.greeting1"), t("nav.greeting2"), t("nav.greeting3"), t("nav.greeting4")]}
            loop={false}
            cursorStyle="underscore"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-4 sm:gap-8">
          <Link href="#expertise" className="hover:text-gray-300">
            {t("nav.expertise")}
          </Link>
          <Link href="#projects" className="hover:text-gray-300">
            {t("nav.projects")}
          </Link>
          <Link href="#contact" className="hover:text-gray-300">
            {t("nav.contact")}
          </Link>
          <LanguageSwitcher />
          <AnimatedThemeToggler />
        </div>

        {/* Mobile toggle */}
        <button
          className="sm:hidden w-9 h-9 inline-flex flex-col justify-center items-center gap-1.5 rounded-md border border-border/60"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen(v => !v)}
        >
          <span className="w-4 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-4 h-0.5 bg-white"></span>
        </button>
      </div>

      {/* Mobile menu overlay (full-screen with greeting header) */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="sm:hidden fixed inset-x-0 bottom-0 z-[70] bg-background"
          style={{ top: navHeight }}         // starts below navbar so the same TypingAnimation stays visible
          role="dialog"
          aria-modal="true"
          onWheel={() => setIsOpen(false)}
          onTouchMove={() => setIsOpen(false)}
        >
          {/* Menu content */}
          <div className="px-4 py-4 space-y-3 bg-background">
             <Link href="#expertise" className="block py-2" onClick={() => setIsOpen(false)}>
               {t("nav.expertise")}
             </Link>
             <Link href="#projects" className="block py-2" onClick={() => setIsOpen(false)}>
               {t("nav.projects")}
             </Link>
             <Link href="#contact" className="block py-2" onClick={() => setIsOpen(false)}>
               {t("nav.contact")}
             </Link>
             <div className="mt-2 flex items-center gap-3">
               <LanguageSwitcher />
               <AnimatedThemeToggler />
             </div>
           </div>
         </div>
       )}
    </nav>
  )
}