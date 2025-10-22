"use client"

import Link from "next/link"
import {useTranslations, useLocale} from "next-intl"
import {LanguageSwitcher} from "@/components/LanguageSwitcher"
import {ThemeSwitcher} from "@/components/ThemeSwitcher"

export default function NavBar() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href={`/${locale}`} className="text-xl sm:text-2xl font-medium">
          {t("brand.name")}
        </Link>
        <div className="hidden sm:flex items-center gap-4 sm:gap-8">
          <Link href="#work" className="hover:text-gray-300">
            {t("nav.work")}
          </Link>
          <Link href="#about" className="hover:text-gray-300">
            {t("nav.about")}
          </Link>
          <Link href="#contact" className="hover:text-gray-300">
            {t("nav.contact")}
          </Link>
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
        <button className="sm:hidden w-8 h-8 flex flex-col justify-center gap-1.5">
          <span className="w-full h-0.5 bg-white"></span>
          <span className="w-full h-0.5 bg-white"></span>
        </button>
      </div>
    </nav>
  )
}