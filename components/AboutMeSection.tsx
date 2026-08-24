"use client"

import { useTranslations } from "next-intl"
import { EpflLogo } from "@/components/EpflLogo"

export default function AboutMeSection() {
  const t = useTranslations("about")

  return (
    <section
      id="about-me"
      aria-labelledby="about-heading"
      className="relative px-4 sm:px-8 py-20 sm:py-32 max-w-7xl mx-auto border-b border-foreground/10"
    >
      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Left index label */}
        <div className="md:col-span-3 space-y-2">
          <span className="text-xs font-mono text-foreground/50 tracking-widest uppercase block">
            ( 02 / {t("sectionLabel")} )
          </span>
          <div className="text-sm font-mono text-foreground/70">
            {t("subLabel")}
          </div>
        </div>

        {/* Right giant statement & metrics */}
        <div className="md:col-span-9 space-y-12">
          <h2
            id="about-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-foreground"
          >
            {t("title.line1")} {t("title.line2")}.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 pt-12 sm:pt-8 pb-4 sm:pb-0 border-t border-foreground/10 text-center sm:text-left">
            <div className="space-y-2 sm:space-y-1 flex flex-col items-center sm:items-start">
              <div className="text-5xl sm:text-6xl font-extrabold font-mono tracking-tighter text-foreground">
                {t("metrics.yearsValue")}
              </div>
              <div className="text-xs font-mono text-foreground/60 uppercase tracking-wider">
                {t("metrics.years")}
              </div>
            </div>

            <div className="space-y-2 sm:space-y-1 flex flex-col items-center sm:items-start">
              <div className="text-5xl sm:text-6xl font-extrabold font-mono tracking-tighter text-foreground">
                {t("metrics.projectsValue")}
              </div>
              <div className="text-xs font-mono text-foreground/60 uppercase tracking-wider">
                {t("metrics.projects")}
              </div>
            </div>

            <div className="space-y-2 sm:space-y-1 flex flex-col items-center sm:items-start">
              <div className="h-[50px] sm:h-[60px] flex items-center justify-center sm:justify-start">
                <EpflLogo className="h-10 sm:h-12 w-auto" />
              </div>
              <div className="text-xs font-mono text-foreground/60 uppercase tracking-wider">
                {t("metrics.role")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}