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
      className="w-full bg-background text-foreground h-[100dvh] max-h-[100dvh] overflow-hidden pt-8 sm:pt-12 md:pt-14 pb-0 px-4 sm:px-8 md:px-12 border-t border-foreground/10 flex flex-col justify-between select-none"
    >
      {/* 1. Top Section: Symmetrically Balanced Typography Links Grid */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-12 gap-x-4 sm:gap-x-8 items-start flex-1 pt-2 sm:pt-4">
        
        {/* Left: 5 Main Navigation Links */}
        <div className="col-span-5 flex flex-col items-start">
          <nav aria-label="Footer navigation" className="flex flex-col gap-1.5 sm:gap-2.5 md:gap-3 w-full">
            <Link
              href="#projects"
              className="group inline-flex items-baseline gap-2 text-2xl sm:text-4xl md:text-5xl lg:text-[3.4vw] font-bold tracking-tight lowercase leading-[0.92] text-foreground/90 hover:text-foreground hover:translate-x-2 transition-all duration-200 whitespace-nowrap"
            >
              <span>{t("contact.work")}</span>
            </Link>

            <Link
              href="#about-me"
              className="group inline-flex items-baseline gap-2 text-2xl sm:text-4xl md:text-5xl lg:text-[3.4vw] font-bold tracking-tight lowercase leading-[0.92] text-foreground/90 hover:text-foreground hover:translate-x-2 transition-all duration-200 pl-2 sm:pl-5 whitespace-nowrap"
            >
              <span>{t("contact.about")}</span>
            </Link>

            <Link
              href="#expertise"
              className="group inline-flex items-baseline gap-2 text-2xl sm:text-4xl md:text-5xl lg:text-[3.4vw] font-bold tracking-tight lowercase leading-[0.92] text-foreground/90 hover:text-foreground hover:translate-x-2 transition-all duration-200 pl-4 sm:pl-10 whitespace-nowrap"
            >
              <span>{t("contact.capabilities")}</span>
            </Link>

            <a
              href={cvHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-2 text-2xl sm:text-4xl md:text-5xl lg:text-[3.4vw] font-bold tracking-tight lowercase leading-[0.92] text-foreground/90 hover:text-foreground hover:translate-x-2 transition-all duration-200 pl-6 sm:pl-14 whitespace-nowrap"
            >
              <span>{t("contact.resume")}</span>
              <ArrowDown className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 opacity-40 group-hover:opacity-100 group-hover:translate-y-1 transition-all self-center" />
            </a>

            <Link
              href={`/${altLocale}`}
              className="group inline-flex items-baseline gap-2 text-2xl sm:text-4xl md:text-5xl lg:text-[3.4vw] font-bold tracking-tight lowercase leading-[0.92] text-foreground/90 hover:text-foreground hover:translate-x-2 transition-all duration-200 pl-8 sm:pl-18 whitespace-nowrap"
            >
              <span>{t("contact.altLanguageName")}</span>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest px-1.5 py-0.5 rounded-full border border-foreground/30 opacity-60 group-hover:opacity-100 group-hover:border-foreground self-center transition-all">
                {altLocale}
              </span>
            </Link>
          </nav>
        </div>

        {/* Center: Accent Year */}
        <div className="hidden lg:flex col-span-2 justify-center items-start pt-3">
          <span className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-foreground/15 hover:text-foreground/70 transition-colors cursor-default select-none">
            &apos;{shortYear}&copy;
          </span>
        </div>

        {/* Right: 4 Social Links (Staggered like reference, perfectly spaced) */}
        <div className="col-span-7 lg:col-span-5 flex flex-col items-end">
          <div className="flex flex-col gap-1.5 sm:gap-2.5 md:gap-3 w-full items-end">
            {/* Line 1: GitHub */}
            <a
              href="https://github.com/victorfrangov"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-2 text-2xl sm:text-4xl md:text-5xl lg:text-[3.4vw] font-bold tracking-tight lowercase leading-[0.92] text-foreground hover:translate-x-1.5 transition-transform duration-200 whitespace-nowrap"
            >
              <span>{t("contact.github")}</span>
              <ArrowUpRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all self-center" />
            </a>

            {/* Line 2: LinkedIn */}
            <a
              href="https://www.linkedin.com/in/victor-frangov/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-2 text-2xl sm:text-4xl md:text-5xl lg:text-[3.4vw] font-bold tracking-tight lowercase leading-[0.92] text-foreground hover:translate-x-1.5 transition-transform duration-200 mr-2 sm:mr-5 whitespace-nowrap"
            >
              <span>{t("contact.linkedin")}</span>
              <ArrowUpRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all self-center" />
            </a>

            {/* Line 3: Email */}
            <a
              href="mailto:v@victorfrangov.com"
              className="group inline-flex items-baseline gap-2 text-2xl sm:text-4xl md:text-5xl lg:text-[3.4vw] font-bold tracking-tight lowercase leading-[0.92] text-foreground hover:translate-x-1.5 transition-transform duration-200 whitespace-nowrap"
            >
              <span>v@victorfrangov.com</span>
              <ArrowUpRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all self-center" />
            </a>

            {/* Line 4: Situs Digital (with "made by" in same font and size, no wrapping) */}
            <a
              href="https://situsdigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-2 text-2xl sm:text-4xl md:text-5xl lg:text-[3.4vw] font-bold tracking-tight lowercase leading-[0.92] text-foreground hover:translate-x-1.5 transition-transform duration-200 whitespace-nowrap"
            >
              <span className="text-foreground/40 whitespace-nowrap">
                {locale === "fr" ? "fait par " : "made by "}
              </span>
              <span className="whitespace-nowrap">{t("contact.situsDigital")}</span>
              <ArrowUpRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all self-center shrink-0" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Middle Section: Lausanne & Montreal Location Badges */}
      <div className="w-full max-w-7xl mx-auto pt-3 pb-1 border-t border-foreground/10 flex items-center justify-between">
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