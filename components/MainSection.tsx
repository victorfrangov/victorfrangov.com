"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { ArrowDown, ArrowUpRight } from "lucide-react"

export default function MainSection() {
  const locale = useLocale()
  const t = useTranslations()
  const [isFading, setIsFading] = useState(false)
  const [fadeVisible, setFadeVisible] = useState(false)
  const currentYear = new Date().getFullYear()

  const cvHref =
    locale === "fr"
      ? "https://cv.victorfrangov.com/cv_fr.pdf"
      : "https://cv.victorfrangov.com/cv_en.pdf"

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

      <section
        id="main"
        aria-label="Hero"
        className="relative pt-28 sm:pt-36 md:pt-44 pb-16 sm:pb-24 px-4 sm:px-8 max-w-7xl mx-auto border-b border-foreground/10"
      >
        {/* Top micro-meta badge */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-10 text-xs font-mono text-foreground/60 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF0000]" />
            <span>{t("main.hero.metaRole")}</span>
          </div>
          <div className="hidden sm:block">
            <span>{t("main.hero.metaLocation")}</span>
          </div>
        </div>

        {/* Main Hero Typography - Tight, bold, pure Swiss Grotesque */}
        <div className="space-y-2 sm:space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.2vw] 2xl:text-[7.4rem] font-extrabold tracking-[-0.045em] leading-[0.88] uppercase">
            <div>{t("main.hero.title.line1")}</div>
            <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-4">
              <span className="italic font-light lowercase font-serif">{t("main.hero.title.emphasis")}</span>
              <span>{t("main.hero.title.line2")}</span>
            </div>
          </h1>
        </div>

        {/* Editorial Statement Block & Linked Capsules (Locomotive Store Style) */}
        <div className="mt-12 sm:mt-20 grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-mono text-foreground/50 uppercase tracking-widest">
              {t("main.hero.profileSection")}
            </div>
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-normal max-w-sm">
              {t("main.hero.profileBio")}
            </p>
          </div>

          <div className="md:col-span-8 flex flex-col md:items-end gap-6">
            <div className="max-w-xl text-left md:text-right text-lg sm:text-2xl font-medium tracking-tight text-foreground leading-snug">
              {t("main.hero.manifesto")}{" "}
              <span className="text-foreground/50">{t("main.hero.freshness")}</span>
            </div>

            {/* Locomotive's Signature Connected Capsule Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Multi-part capsule link */}
              <div className="loco-capsule-group text-xs sm:text-sm font-mono">
                <span className="loco-capsule-segment">{t("main.hero.visit")}</span>
                <span className="loco-capsule-segment font-semibold">victorfrangov</span>
                <span className="loco-capsule-segment">.</span>
                <span className="loco-capsule-segment">com</span>
              </div>

              {/* CV Download Capsule */}
              <a
                href={cvHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-foreground text-xs sm:text-sm font-mono uppercase tracking-tight bg-foreground text-background hover:bg-transparent hover:text-foreground transition-all duration-200"
              >
                <span>{t("main.hero.cv")}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* Explore work anchor */}
              <a
                href="#projects"
                onClick={(e) => handleNavClick(e, "#projects")}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-foreground/30 text-xs sm:text-sm font-mono uppercase tracking-tight hover:border-foreground transition-colors cursor-pointer"
              >
                <span>{t("main.hero.projects")}</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* High-precision 4-Column Metadata Index Row */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-foreground/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-mono">
          <div className="space-y-1">
            <span className="text-foreground/50 block">{t("main.hero.indexLocationLabel")}</span>
            <span className="text-foreground font-medium block">{t("main.hero.indexLocationVal")}</span>
          </div>
          <div className="space-y-1">
            <span className="text-foreground/50 block">{t("main.hero.indexEducationLabel")}</span>
            <span className="text-foreground font-medium block">{t("main.hero.indexEducationVal")}</span>
          </div>
          <div className="space-y-1">
            <span className="text-foreground/50 block">{t("main.hero.indexStackLabel")}</span>
            <span className="text-foreground font-medium block">{t("main.hero.indexStackVal")}</span>
          </div>
          <div className="space-y-1">
            <span className="text-foreground/50 block">{t("main.hero.indexAvailabilityLabel")}</span>
            <span className="text-foreground font-medium block">{t("main.hero.indexAvailabilityVal")}</span>
          </div>
        </div>
      </section>
    </>
  )
}
