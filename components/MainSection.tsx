"use client"

import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { ArrowDown, ArrowUpRight } from "lucide-react"

export default function MainSection() {
  const locale = useLocale()
  const t = useTranslations()

  const cvHref =
    locale === "fr"
      ? "https://cv.victorfrangov.com/cv_fr.pdf"
      : "https://cv.victorfrangov.com/cv_en.pdf"

  return (
    <section
      id="main"
      aria-label="Hero"
      className="relative pt-28 sm:pt-36 md:pt-44 pb-16 sm:pb-24 px-4 sm:px-8 max-w-7xl mx-auto border-b border-foreground/10"
    >
      {/* Top micro-meta badge */}
      <div className="flex items-center justify-between gap-4 mb-6 sm:mb-10 text-xs font-mono text-foreground/60 uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-foreground" />
          <span>{t("main.hero.metaRole")}</span>
        </div>
        <div className="hidden sm:block">
          <span>{t("main.hero.metaLocation")}</span>
        </div>
      </div>

      {/* Main Hero Typography - Tight, bold, pure Swiss Grotesque */}
      <div className="space-y-2 sm:space-y-4">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-[-0.045em] leading-[0.88] uppercase">
          <div>{t("main.hero.title.line1")}</div>
          <div className="flex flex-wrap items-baseline gap-x-4">
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
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-foreground/30 text-xs sm:text-sm font-mono uppercase tracking-tight hover:border-foreground transition-colors"
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
  )
}
