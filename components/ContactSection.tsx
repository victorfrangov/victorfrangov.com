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
      className="w-full bg-background text-foreground h-[100dvh] max-h-[100dvh] overflow-hidden pt-6 sm:pt-8 md:pt-10 pb-3 sm:pb-4 px-4 sm:px-8 md:px-12 border-t border-foreground/10 flex flex-col justify-between select-none"
    >
      {/* 1. Top Section: Staggered Links Grid + Big Corner Copyright */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-x-4 sm:gap-x-8 gap-y-4 items-start">
        
        {/* Left: 5 Navigation Links */}
        <div className="col-span-6 md:col-span-5 flex flex-col items-start">
          <span className="text-[10px] sm:text-xs font-mono text-foreground/40 uppercase tracking-widest block mb-2 sm:mb-3">
            ( 01 / {t("contact.work")} )
          </span>
          <nav aria-label="Footer navigation" className="flex flex-col gap-0.5 sm:gap-1.5 w-full">
            <Link
              href="#projects"
              className="group inline-flex items-baseline gap-1.5 text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight lowercase leading-[0.95] text-foreground/90 hover:text-foreground hover:translate-x-2 transition-all duration-200"
            >
              <span>{t("contact.work")}</span>
            </Link>

            <Link
              href="#about-me"
              className="group inline-flex items-baseline gap-1.5 text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight lowercase leading-[0.95] text-foreground/90 hover:text-foreground hover:translate-x-2 transition-all duration-200 pl-2 sm:pl-4"
            >
              <span>{t("contact.about")}</span>
            </Link>

            <Link
              href="#expertise"
              className="group inline-flex items-baseline gap-1.5 text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight lowercase leading-[0.95] text-foreground/90 hover:text-foreground hover:translate-x-2 transition-all duration-200 pl-4 sm:pl-8"
            >
              <span>{t("contact.capabilities")}</span>
            </Link>

            <a
              href={cvHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-1.5 text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight lowercase leading-[0.95] text-foreground/90 hover:text-foreground hover:translate-x-2 transition-all duration-200 pl-6 sm:pl-12"
            >
              <span>{t("contact.resume")}</span>
              <ArrowDown className="w-3.5 h-3.5 sm:w-5 sm:h-5 opacity-40 group-hover:opacity-100 group-hover:translate-y-0.5 transition-all self-center" />
            </a>

            <Link
              href={`/${altLocale}`}
              className="group inline-flex items-baseline gap-1.5 text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight lowercase leading-[0.95] text-foreground/90 hover:text-foreground hover:translate-x-2 transition-all duration-200 pl-8 sm:pl-16"
            >
              <span>{t("contact.altLanguageName")}</span>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest px-1.5 py-0.5 rounded-full border border-foreground/30 opacity-60 group-hover:opacity-100 group-hover:border-foreground self-center transition-all">
                {altLocale}
              </span>
            </Link>
          </nav>
        </div>

        {/* Center / Big Corner Copyright Accent */}
        <div className="hidden md:flex md:col-span-2 justify-center items-start pt-2">
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground/20 hover:text-foreground/80 transition-colors cursor-default">
            &apos;{shortYear}&copy;
          </span>
        </div>

        {/* Right: 4 Social Links (Staggered like reference) */}
        <div className="col-span-6 md:col-span-5 flex flex-col items-end">
          <span className="text-[10px] sm:text-xs font-mono text-foreground/40 uppercase tracking-widest block mb-2 sm:mb-3 self-end">
            ( 02 / {t("contact.social")} )
          </span>
          <div className="flex flex-col gap-0.5 sm:gap-1.5 w-full items-end">
            {/* Line 1: GitHub */}
            <a
              href="https://github.com/victorfrangov"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-1.5 text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight lowercase leading-[0.92] text-foreground hover:translate-x-1.5 transition-transform duration-200"
            >
              <span>{t("contact.github")}</span>
              <ArrowUpRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all self-center" />
            </a>

            {/* Line 2: LinkedIn */}
            <a
              href="https://www.linkedin.com/in/victor-frangov/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-1.5 text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight lowercase leading-[0.92] text-foreground hover:translate-x-1.5 transition-transform duration-200 mr-2 sm:mr-6"
            >
              <span>{t("contact.linkedin")}</span>
              <ArrowUpRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all self-center" />
            </a>

            {/* Line 3: Email */}
            <a
              href="mailto:v@victorfrangov.com"
              className="group inline-flex items-baseline gap-1.5 text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight lowercase leading-[0.92] text-foreground hover:translate-x-1.5 transition-transform duration-200 mr-4 sm:mr-12"
            >
              <span>{t("contact.email")}</span>
              <ArrowUpRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all self-center" />
            </a>

            {/* Line 4: Situs Digital */}
            <a
              href="https://situsdigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-1.5 text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight lowercase leading-[0.92] text-foreground hover:translate-x-1.5 transition-transform duration-200"
            >
              <span>{t("contact.situsDigital")}</span>
              <ArrowUpRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all self-center" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Middle Section: Email Capsule + Lausanne / Montreal Badges */}
      <div className="w-full max-w-7xl mx-auto pt-4 sm:pt-6 border-t border-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
        {/* Email Connected Capsule */}
        <a
          href="mailto:v@victorfrangov.com"
          className="inline-flex items-center rounded-full border border-foreground/30 overflow-hidden text-[11px] sm:text-xs md:text-sm font-mono hover:border-foreground transition-colors"
        >
          <span className="px-2.5 sm:px-3.5 py-1.5 border-r border-foreground/30 text-foreground/60">email</span>
          <span className="px-2.5 sm:px-3.5 py-1.5 border-r border-foreground/30 font-medium">v</span>
          <span className="px-1.5 sm:px-2.5 py-1.5 border-r border-foreground/30 text-foreground/60">@</span>
          <span className="px-2.5 sm:px-3.5 py-1.5 border-r border-foreground/30 font-medium">victorfrangov</span>
          <span className="px-1.5 sm:px-2.5 py-1.5 border-r border-foreground/30 text-foreground/60">.</span>
          <span className="px-2.5 sm:px-3.5 py-1.5">com</span>
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

      {/* 3. Big Victor Frangov Wordmark (Matching Hamburger Menu layout & typography) */}
      <div
        className="w-full overflow-hidden select-none relative z-0 px-4 sm:px-8 pb-3 pt-1 flex items-end justify-center"
        aria-hidden="true"
      >
        <h2 className="text-[7.2vw] font-black tracking-[-0.04em] leading-[0.85] uppercase text-black dark:text-white text-center w-full whitespace-nowrap">
          VICTORFRANGOV©{year}
        </h2>
      </div>

      {/* 4. Bottom Tiny Corners */}
      <div className="w-full max-w-7xl mx-auto pt-2 border-t border-foreground/10 flex items-center justify-between text-[10px] sm:text-xs font-mono text-foreground/60">
        <div>
          &apos;{shortYear} &copy; {t("contact.rightsReserved")}
        </div>
        <div>
          <a
            href="https://situsdigital.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
          >
            {t("contact.madeWithSitus")}
          </a>
        </div>
      </div>
    </footer>
  )
}