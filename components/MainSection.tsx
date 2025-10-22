"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

export default function MainSection() {
  const t = useTranslations()
  return (
    <section id="main" className="pt-24 sm:pt-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="mb-16 sm:mb-32 relative">
          <div className="text-sm mb-4">{t("main.hero.greeting")}</div>
          {/* Title with headshot on the right */}
          <div className="flex items-end justify-between gap-6">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold leading-none tracking-tight md:whitespace-nowrap">
        {t("main.hero.title.line1")} 
              <span className="font-serif italic font-normal">
          {t("main.hero.title.emphasis")}
              </span>
        <br /> {t("main.hero.title.line2")}
            </h1>
            <div className="shrink-0">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-border bg-muted">
                <Image
                  src="/headshot.jpg"
                  alt={t("main.hero.headshotAlt")}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 8rem, 6rem"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 flex flex-col items-center text-center gap-6">
            <p className="pt-28 sm:pt-28 max-w-7xl text-2xl sm:text-3xl md:text-4xl leading-relaxed md:leading-snug text-muted-foreground">
              {t("main.hero.subtitle.line1")}
              {" "}
              {t("main.hero.subtitle.line2")}
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 border border-border
              px-5 sm:px-6 py-3 sm:py-3.5 text-base sm:text-lg hover:bg-accent
              hover:text-accent-foreground transition-colors">
              {t("main.hero.cta")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
