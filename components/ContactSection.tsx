"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { ArrowUpRight, ArrowDown } from "lucide-react"
import { MontrealLogo } from "./MontrealLogo"
import { SwissCross } from "./SwissCross"

export default function ContactSection({ locale }: { locale: string }) {
  const t = useTranslations()
  const [isFading, setIsFading] = useState(false)
  const [fadeVisible, setFadeVisible] = useState(false)

  const year = new Date().getFullYear()
  const shortYear = year.toString().slice(-2)

  const cvHref =
    locale === "fr"
      ? "https://cv.victorfrangov.com/cv_fr.pdf"
      : "https://cv.victorfrangov.com/cv_en.pdf"

  const altLocale = locale === "en" ? "fr" : "en"

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
              VICTORFRANGOV©{year}
            </h2>
          </div>
        </div>
      )}

      <footer
        id="contact"
        aria-labelledby="contact-heading"
        className="w-full bg-background text-foreground min-h-[100dvh] lg:h-[100dvh] lg:max-h-[100dvh] overflow-x-hidden pt-6 sm:pt-10 pb-0 px-5 sm:px-8 md:px-12 border-t border-foreground/10 flex flex-col justify-between select-none"
      >
        {/* MOBILE LAYOUT: Alternating Zigzag Left-Right Flow */}
        <div className="flex lg:hidden flex-col justify-between flex-1 py-6 sm:py-8 w-full space-y-5 sm:space-y-7">
          {/* 1. Left: Projects */}
          <div className="flex justify-start">
            <Link
              href="#projects"
              onClick={(e) => handleNavClick(e, "#projects")}
              className="group inline-flex items-baseline gap-3 text-5xl sm:text-7xl font-extrabold tracking-tight lowercase leading-none text-foreground/90 hover:text-foreground hover:translate-x-2 transition-all duration-200"
            >
              <span>{t("contact.work")}</span>
            </Link>
          </div>

          {/* 2. Right: GitHub */}
          <div className="flex justify-end text-right">
            <a
              href="https://github.com/victorfrangov"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-2 text-5xl sm:text-7xl font-extrabold tracking-tight lowercase leading-none text-foreground hover:translate-x-1.5 transition-transform duration-200"
            >
              <span>{t("contact.github")}</span>
              <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all self-center" />
            </a>
          </div>

          {/* 3. Left: About */}
          <div className="flex justify-start">
            <Link
              href="#about-me"
              onClick={(e) => handleNavClick(e, "#about-me")}
              className="group inline-flex items-baseline gap-3 text-5xl sm:text-7xl font-extrabold tracking-tight lowercase leading-none text-foreground/90 hover:text-foreground hover:translate-x-2 transition-all duration-200"
            >
              <span>{t("contact.about")}</span>
            </Link>
          </div>

          {/* 4. Right: LinkedIn */}
          <div className="flex justify-end text-right">
            <a
              href="https://www.linkedin.com/in/victor-frangov/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-2 text-5xl sm:text-7xl font-extrabold tracking-tight lowercase leading-none text-foreground hover:translate-x-1.5 transition-transform duration-200"
            >
              <span>{t("contact.linkedin")}</span>
              <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all self-center" />
            </a>
          </div>

          {/* 5. Left: Expertise / Capabilities */}
          <div className="flex justify-start">
            <Link
              href="#expertise"
              onClick={(e) => handleNavClick(e, "#expertise")}
              className="group inline-flex items-baseline gap-3 text-5xl sm:text-7xl font-extrabold tracking-tight lowercase leading-none text-foreground/90 hover:text-foreground hover:translate-x-2 transition-all duration-200"
            >
              <span>{t("contact.capabilities")}</span>
            </Link>
          </div>

          {/* 6. Right: Email (One clean single line) */}
          <div className="flex justify-end text-right">
            <a
              href="mailto:v@victorfrangov.com"
              className="group inline-flex items-baseline gap-2 text-3xl sm:text-5xl font-extrabold tracking-tight lowercase leading-none text-foreground hover:translate-x-1.5 transition-transform duration-200 whitespace-nowrap"
            >
              <span>v@victorfrangov.com</span>
              <ArrowUpRight className="w-5 h-5 sm:w-7 sm:h-7 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all self-center shrink-0" />
            </a>
          </div>

          {/* 7. Left: CV / Resume */}
          <div className="flex justify-start">
            <a
              href={cvHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-3 text-5xl sm:text-7xl font-extrabold tracking-tight lowercase leading-none text-foreground/90 hover:text-foreground hover:translate-x-2 transition-all duration-200"
            >
              <span>{t("contact.resume")}</span>
              <ArrowDown className="w-6 h-6 sm:w-8 sm:h-8 opacity-40 group-hover:opacity-100 group-hover:translate-y-1 transition-all self-center" />
            </a>
          </div>

          {/* 8. Right: Situs Digital */}
          <div className="flex justify-end text-right">
            <a
              href="https://situsdigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-2 text-3xl sm:text-5xl font-extrabold tracking-tight lowercase leading-none text-foreground hover:translate-x-1.5 transition-transform duration-200 whitespace-nowrap"
            >
              <span className="text-foreground/40 text-lg sm:text-2xl font-normal">
                {locale === "fr" ? "fait par " : "made by "}
              </span>
              <span>{t("contact.situsDigital")}</span>
              <ArrowUpRight className="w-5 h-5 sm:w-7 sm:h-7 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all self-center shrink-0" />
            </a>
          </div>

          {/* 9. Left: Language Switcher */}
          <div className="flex justify-start">
            <Link
              href={`/${altLocale}`}
              className="group inline-flex items-baseline gap-3 text-5xl sm:text-7xl font-extrabold tracking-tight lowercase leading-none text-foreground/90 hover:text-foreground hover:translate-x-2 transition-all duration-200"
            >
              <span>{t("contact.altLanguageName")}</span>
            </Link>
          </div>
        </div>

        {/* DESKTOP LAYOUT: Untouched 3-Column Layout */}
        <div className="hidden lg:grid w-full max-w-7xl mx-auto grid-cols-12 gap-x-8 items-stretch flex-1 py-8">

          {/* Left: 5 Main Navigation Links */}
          <div className="col-span-5 flex flex-col h-full">
            <nav aria-label="Footer navigation" className="flex flex-col justify-between h-full w-full">
              <Link
                href="#projects"
                onClick={(e) => handleNavClick(e, "#projects")}
                className="group inline-flex items-baseline gap-2 text-[4.2vw] font-bold tracking-tight lowercase leading-none text-foreground/90 hover:text-foreground hover:translate-x-2 transition-all duration-200 whitespace-nowrap"
              >
                <span>{t("contact.work")}</span>
              </Link>

              <Link
                href="#about-me"
                onClick={(e) => handleNavClick(e, "#about-me")}
                className="group inline-flex items-baseline gap-2 text-[4.2vw] font-bold tracking-tight lowercase leading-none text-foreground/90 hover:text-foreground hover:translate-x-2 transition-all duration-200 pl-5 whitespace-nowrap"
              >
                <span>{t("contact.about")}</span>
              </Link>

              <Link
                href="#expertise"
                onClick={(e) => handleNavClick(e, "#expertise")}
                className="group inline-flex items-baseline gap-2 text-[4.2vw] font-bold tracking-tight lowercase leading-none text-foreground/90 hover:text-foreground hover:translate-x-2 transition-all duration-200 pl-10 whitespace-nowrap"
              >
                <span>{t("contact.capabilities")}</span>
              </Link>

              <a
                href={cvHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-baseline gap-2 text-[4.2vw] font-bold tracking-tight lowercase leading-none text-foreground/90 hover:text-foreground hover:translate-x-2 transition-all duration-200 pl-14 whitespace-nowrap"
              >
                <span>{t("contact.resume")}</span>
                <ArrowDown className="w-8 h-8 opacity-40 group-hover:opacity-100 group-hover:translate-y-1 transition-all self-center" />
              </a>

              <Link
                href={`/${altLocale}`}
                className="group inline-flex items-baseline gap-2 text-[4.2vw] font-bold tracking-tight lowercase leading-none text-foreground/90 hover:text-foreground hover:translate-x-2 transition-all duration-200 pl-18 whitespace-nowrap"
              >
                <span>{t("contact.altLanguageName")}</span>
              </Link>
            </nav>
          </div>

          {/* Center: Accent Year + Stacked Lausanne & Montreal */}
          <div className="col-span-2 flex flex-col items-center justify-start pt-2 gap-4">
            <span className="text-6xl font-bold tracking-tighter text-foreground/15 hover:text-foreground/70 transition-colors cursor-default select-none">
              &apos;{shortYear}&copy;
            </span>

            <div className="flex flex-col items-center gap-2.5 text-lg font-light tracking-tight text-foreground/80">
              <span className="inline-flex items-center gap-1.5">
                <span className="font-medium">{t("contact.lausanne")}</span>
                <SwissCross className="w-5 h-5 inline-block align-middle shrink-0" />
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="font-medium">{t("contact.montreal")}</span>
                <MontrealLogo className="w-5 h-5 inline-block align-middle shrink-0 hover:rotate-45 transition-transform duration-500" />
              </span>
            </div>
          </div>

          {/* Right: 4 Social Links */}
          <div className="col-span-5 flex flex-col h-full items-end">
            <div className="flex flex-col justify-between h-full w-full items-end">
              {/* Line 1: GitHub */}
              <a
                href="https://github.com/victorfrangov"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-baseline gap-2 text-[4.2vw] font-bold tracking-tight lowercase leading-none text-foreground hover:translate-x-1.5 transition-transform duration-200 whitespace-nowrap"
              >
                <span>{t("contact.github")}</span>
                <ArrowUpRight className="w-9 h-9 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all self-center" />
              </a>

              {/* Line 2: LinkedIn */}
              <a
                href="https://www.linkedin.com/in/victor-frangov/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-baseline gap-2 text-[4.2vw] font-bold tracking-tight lowercase leading-none text-foreground hover:translate-x-1.5 transition-transform duration-200 mr-6 whitespace-nowrap"
              >
                <span>{t("contact.linkedin")}</span>
                <ArrowUpRight className="w-9 h-9 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all self-center" />
              </a>

              {/* Line 3: Email */}
              <a
                href="mailto:v@victorfrangov.com"
                className="group inline-flex items-baseline gap-2 text-[4.2vw] font-bold tracking-tight lowercase leading-none text-foreground hover:translate-x-1.5 transition-transform duration-200 whitespace-nowrap"
              >
                <span>v@victorfrangov.com</span>
                <ArrowUpRight className="w-9 h-9 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all self-center shrink-0" />
              </a>

              {/* Line 4: Situs Digital */}
              <a
                href="https://situsdigital.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-baseline gap-2 text-[4.2vw] font-bold tracking-tight lowercase leading-none text-foreground hover:translate-x-1.5 transition-transform duration-200 whitespace-nowrap"
              >
                <span className="text-foreground/40 whitespace-nowrap">
                  {locale === "fr" ? "fait par " : "made by "}
                </span>
                <span className="whitespace-nowrap">{t("contact.situsDigital")}</span>
                <ArrowUpRight className="w-9 h-9 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all self-center shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* 2. Big Victor Frangov Wordmark */}
        <div
          className="w-full overflow-hidden select-none relative z-0 px-4 sm:px-8 pb-3 pt-4 lg:pt-1 flex items-end justify-center"
          aria-hidden="true"
        >
          <h2 className="text-[7.2vw] font-black tracking-[-0.04em] leading-[0.85] uppercase text-black dark:text-white text-center w-full whitespace-nowrap">
            VICTORFRANGOV©{year}
          </h2>
        </div>
      </footer>
    </>
  )
}