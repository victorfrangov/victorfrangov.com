"use client"

import { useTranslations } from "next-intl"
import { TextGenerateEffect } from "./ui/shadcn-io/text-generate-effect"

export default function AboutMeSection() {
  const t = useTranslations("about")
  return (
    <section id="about-me" className="relative px-4 sm:px-6 pt-24 pb-24 sm:pt-32 sm:pb-32 overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        <span className="uppercase tracking-widest text-xs sm:text-sm text-muted-foreground mb-8 inline-block">
          {t("sectionLabel")}
        </span>
        <h2 className="font-bold leading-tight text-4xl sm:text-6xl md:text-7xl">
          <TextGenerateEffect
            words={`${t("title.line1")} ${t("title.line2")}`}
            duration={0.6}
            staggerDelay={0.15}
          />
        </h2>
        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-8 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-semibold text-blue-500">{t("metrics.yearsValue")}</p>
            <p className="mt-2 text-xs sm:text-sm tracking-wide">{t("metrics.years")}</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-semibold text-blue-500">{t("metrics.projectsValue")}</p>
            <p className="mt-2 text-xs sm:text-sm tracking-wide">{t("metrics.projects")}</p>
          </div>
        </div>
      </div>
    </section>
  )
}