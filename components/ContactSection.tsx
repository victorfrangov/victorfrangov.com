import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { ArrowUpRight, ArrowDown } from "lucide-react"
import { MontrealLogo } from "./MontrealLogo"
import { SwissCross } from "./SwissCross"

export default async function ContactSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale })
  const year = new Date().getFullYear()
  const shortYear = year.toString().slice(-2)

  const cvHref =
    locale === "fr"
      ? "https://cv.victorfrangov.com/cv_fr.pdf"
      : "https://cv.victorfrangov.com/cv_en.pdf"

  const altLocale = locale === "en" ? "fr" : "en"

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full bg-background text-foreground h-[100dvh] max-h-[100dvh] overflow-hidden pt-6 sm:pt-10 md:pt-12 pb-0 px-4 sm:px-8 md:px-12 border-t border-foreground/10 flex flex-col justify-between select-none"
    >
      {/* 1. Top Section: Giant Typography Navigation & Social Links Grid */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8 flex-1 pt-2 sm:pt-4">
        
        {/* Left: 5 Main Navigation Links (Massive Editorial Scale) */}
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          <nav aria-label="Footer navigation" className="flex flex-col gap-1 sm:gap-2.5 md:gap-3 w-full">
            <Link
              href="#projects"
              className="group inline-flex items-baseline gap-2 text-3xl sm:text-5xl md:text-6xl lg:text-[4vw] font-bold tracking-tight lowercase leading-[0.88] text-foreground/90 hover:text-foreground hover:translate-x-3 transition-all duration-200 whitespace-nowrap"
            >
              <span>{t("contact.work")}</span>
            </Link>

            <Link
              href="#about-me"
              className="group inline-flex items-baseline gap-2 text-3xl sm:text-5xl md:text-6xl lg:text-[4vw] font-bold tracking-tight lowercase leading-[0.88] text-foreground/90 hover:text-foreground hover:translate-x-3 transition-all duration-200 pl-3 sm:pl-6 whitespace-nowrap"
            >
              <span>{t("contact.about")}</span>
            </Link>

            <Link
              href="#expertise"
              className="group inline-flex items-baseline gap-2 text-3xl sm:text-5xl md:text-6xl lg:text-[4vw] font-bold tracking-tight lowercase leading-[0.88] text-foreground/90 hover:text-foreground hover:translate-x-3 transition-all duration-200 pl-6 sm:pl-12 whitespace-nowrap"
            >
              <span>{t("contact.capabilities")}</span>
            </Link>

            <a
              href={cvHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-2 text-3xl sm:text-5xl md:text-6xl lg:text-[4vw] font-bold tracking-tight lowercase leading-[0.88] text-foreground/90 hover:text-foreground hover:translate-x-3 transition-all duration-200 pl-9 sm:pl-16 whitespace-nowrap"
            >
              <span>{t("contact.resume")}</span>
              <ArrowDown className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 opacity-40 group-hover:opacity-100 group-hover:translate-y-1 transition-all self-center" />
            </a>

            <Link
              href={`/${altLocale}`}
              className="group inline-flex items-baseline gap-2 text-3xl sm:text-5xl md:text-6xl lg:text-[4vw] font-bold tracking-tight lowercase leading-[0.88] text-foreground/90 hover:text-foreground hover:translate-x-3 transition-all duration-200 pl-12 sm:pl-20 whitespace-nowrap"
            >
              <span>{t("contact.altLanguageName")}</span>
              <span className="text-xs sm:text-sm font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border border-foreground/30 opacity-60 group-hover:opacity-100 group-hover:border-foreground self-center transition-all">
                {altLocale}
              </span>
            </Link>
          </nav>
        </div>

        {/* Center / Corner Accent */}
        <div className="hidden xl:flex justify-center items-start pt-2 px-2">
          <span className="text-5xl lg:text-7xl font-bold tracking-tighter text-foreground/20 hover:text-foreground/80 transition-colors cursor-default select-none">
            &apos;{shortYear}&copy;
          </span>
        </div>

        {/* Right: 4 Social Links (Staggered like reference, massive presence) */}
        <div className="w-full lg:w-1/2 flex flex-col items-start lg:items-end">
          <div className="flex flex-col gap-1 sm:gap-2.5 md:gap-3 w-full lg:items-end">
            {/* Line 1: GitHub */}
            <a
              href="https://github.com/victorfrangov"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-2 text-4xl sm:text-6xl md:text-7xl lg:text-[5vw] font-bold tracking-[-0.035em] lowercase leading-[0.85] text-foreground hover:translate-x-2 transition-transform duration-200 whitespace-nowrap"
            >
              <span>{t("contact.github")}</span>
              <ArrowUpRight className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all self-center" />
            </a>

            {/* Line 2: LinkedIn */}
            <a
              href="https://www.linkedin.com/in/victor-frangov/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-2 text-4xl sm:text-6xl md:text-7xl lg:text-[5vw] font-bold tracking-[-0.035em] lowercase leading-[0.85] text-foreground hover:translate-x-2 transition-transform duration-200 mr-2 sm:mr-8 whitespace-nowrap"
            >
              <span>{t("contact.linkedin")}</span>
              <ArrowUpRight className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all self-center" />
            </a>

            {/* Line 3: Email */}
            <a
              href="mailto:v@victorfrangov.com"
              className="group inline-flex items-baseline gap-2 text-4xl sm:text-6xl md:text-7xl lg:text-[5vw] font-bold tracking-[-0.035em] lowercase leading-[0.85] text-foreground hover:translate-x-2 transition-transform duration-200 mr-4 sm:mr-16 whitespace-nowrap"
            >
              <span>{t("contact.email")}</span>
              <ArrowUpRight className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all self-center" />
            </a>

            {/* Line 4: Situs Digital (with "made by" in same font and size, no wrapping) */}
            <a
              href="https://situsdigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-2 text-4xl sm:text-6xl md:text-7xl lg:text-[5vw] font-bold tracking-[-0.035em] lowercase leading-[0.85] text-foreground hover:translate-x-2 transition-transform duration-200 whitespace-nowrap"
            >
              <span className="text-foreground/40 whitespace-nowrap">
                {locale === "fr" ? "fait par " : "made by "}
              </span>
              <span className="whitespace-nowrap">{t("contact.situsDigital")}</span>
              <ArrowUpRight className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all self-center shrink-0" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Middle Section: Email Capsule + Lausanne / Montreal Badges */}
      <div className="w-full max-w-7xl mx-auto pt-4 pb-2 border-t border-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
        {/* Email Connected Capsule */}
        <a
          href="mailto:v@victorfrangov.com"
          className="inline-flex items-center rounded-full border border-foreground/30 overflow-hidden text-xs sm:text-sm md:text-base font-mono hover:border-foreground transition-colors"
        >
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 border-r border-foreground/30 text-foreground/60">email</span>
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 border-r border-foreground/30 font-medium">v</span>
          <span className="px-2 sm:px-3 py-1.5 sm:py-2 border-r border-foreground/30 text-foreground/60">@</span>
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 border-r border-foreground/30 font-medium">victorfrangov</span>
          <span className="px-2 sm:px-3 py-1.5 sm:py-2 border-r border-foreground/30 text-foreground/60">.</span>
          <span className="px-3 sm:px-4 py-1.5 sm:py-2">com</span>
        </a>

        {/* Locations: Lausanne & Montreal */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-base sm:text-lg md:text-xl font-light tracking-tight text-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="font-medium">{t("contact.lausanne")}</span>
            <SwissCross className="w-4 h-4 sm:w-5 sm:h-5 inline-block align-middle shrink-0" />
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="font-medium">{t("contact.montreal")}</span>
            <MontrealLogo className="w-5 h-5 sm:w-6 sm:h-6 inline-block align-middle shrink-0 hover:rotate-45 transition-transform duration-500" />
          </span>
        </div>
      </div>

      {/* 3. Big Victor Frangov Wordmark (At the absolute bottom, matching Hamburger Menu) */}
      <div
        className="w-full overflow-hidden select-none relative z-0 px-4 sm:px-8 pb-3 pt-1 flex items-end justify-center"
        aria-hidden="true"
      >
        <h2 className="text-[7.2vw] font-black tracking-[-0.04em] leading-[0.85] uppercase text-black dark:text-white text-center w-full whitespace-nowrap">
          VICTORFRANGOV©{year}
        </h2>
      </div>
    </footer>
  )
}