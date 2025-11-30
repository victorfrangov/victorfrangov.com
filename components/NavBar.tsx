"use client"

import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler"
import { ScrollProgress } from "./ui/scroll-progress"
import { TypingAnimation } from "./ui/typing-animation"

export default function NavBar() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 sm:py-8 bg-background/80 backdrop-blur border-b border-border/60">
      <ScrollProgress barClassName="bg-blue-500" />
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        <Link href={`/${locale}`} className="text-sm sm:text-base font-medium">
          <TypingAnimation
            className="text-sm sm:text-base text-muted-foreground"
            words={[t("nav.greeting"), t("nav.greeting1"), t("nav.greeting2"), t("nav.greeting3"), t("nav.greeting4")]}
            loop={false}
            cursorStyle="underscore"
          />
        </Link>
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
        <button className="sm:hidden w-8 h-8 flex flex-col justify-center gap-1.5">
          <span className="w-full h-0.5 bg-white"></span>
          <span className="w-full h-0.5 bg-white"></span>
        </button>
      </div>
    </nav>
  )
}