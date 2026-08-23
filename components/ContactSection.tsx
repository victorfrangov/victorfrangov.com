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
      className="w-full bg-background text-foreground pt-20 sm:pt-32 pb-6 sm:pb-8 px-4 sm:px-8 md:px-12 border-t border-foreground/10 flex flex-col justify-between min-h-[90vh]"
    >
      {/* Top: Two Staggered Giant Typographic Columns */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-8 items-start mb-16 sm:mb-24">
        
        {/* Left Column: 5 Main Navigation Links */}
        <div className="lg:col-span-6 flex flex-col items-start">
          <span className="text-xs font-mono text-foreground/40 uppercase tracking-widest block mb-6 sm:mb-8">
            ( 01 / {t("contact.work")} )
          </span>
          <nav aria-label="Footer navigation" className="flex flex-col gap-2 sm:gap-3 w-full">
            {/* Work */}
            <Link
              href="#projects"
              className="group inline-flex items-baseline gap-2 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight lowercase leading-[0.9] text-foreground/90 hover:text-foreground hover:translate-x-3 transition-all duration-300"
            >
              <span>{t("contact.work")}</span>
              <span className="text-sm sm:text-lg font-mono font-normal opacity-0 group-hover:opacity-60 transition-opacity">
                (01)
              </span>
            </Link>

            {/* About */}
            <Link
              href="#about-me"
              className="group inline-flex items-baseline gap-2 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight lowercase leading-[0.9] text-foreground/90 hover:text-foreground hover:translate-x-3 transition-all duration-300 sm:pl-4 md:pl-6"
            >
              <span>{t("contact.about")}</span>
              <span className="text-sm sm:text-lg font-mono font-normal opacity-0 group-hover:opacity-60 transition-opacity">
                (02)
              </span>
            </Link>

            {/* Capabilities */}
            <Link
              href="#expertise"
              className="group inline-flex items-baseline gap-2 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight lowercase leading-[0.9] text-foreground/90 hover:text-foreground hover:translate-x-3 transition-all duration-300 sm:pl-8 md:pl-12"
            >
              <span>{t("contact.capabilities")}</span>
              <span className="text-sm sm:text-lg font-mono font-normal opacity-0 group-hover:opacity-60 transition-opacity">
                (03)
              </span>
            </Link>

            {/* Resume / CV */}
            <a
              href={cvHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-2 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight lowercase leading-[0.9] text-foreground/90 hover:text-foreground hover:translate-x-3 transition-all duration-300 sm:pl-12 md:pl-16"
            >
              <span>{t("contact.resume")}</span>
              <ArrowDown className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 opacity-40 group-hover:opacity-100 group-hover:translate-y-1 transition-all self-center" />
            </a>

            {/* Language Switch */}
            <Link
              href={`/${altLocale}`}
              className="group inline-flex items-baseline gap-2 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight lowercase leading-[0.9] text-foreground/90 hover:text-foreground hover:translate-x-3 transition-all duration-300 sm:pl-16 md:pl-20"
            >
              <span>{t("contact.altLanguageName")}</span>
              <span className="text-xs sm:text-sm font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border border-foreground/30 opacity-60 group-hover:opacity-100 group-hover:border-foreground self-center transition-all">
                {altLocale}
              </span>
            </Link>
          </nav>
        </div>

        {/* Right Column: 4 Social / External Links (Staggered like "nothing more than a sentence.") */}
        <div className="lg:col-span-6 flex flex-col items-start lg:items-end">
          <span className="text-xs font-mono text-foreground/40 uppercase tracking-widest block mb-6 sm:mb-8 self-start lg:self-end">
            ( 02 / {t("contact.social")} )
          </span>
          <div className="flex flex-col gap-2 sm:gap-3 w-full lg:items-end">
            {/* Line 1: GitHub */}
            <a
              href="https://github.com/victorfrangov"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-2 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[-0.04em] lowercase leading-[0.88] text-foreground hover:translate-x-2 transition-transform duration-300"
            >
              <span>{t("contact.github")}</span>
              <ArrowUpRight className="w-6 h-6 sm:w-9 sm:h-9 md:w-11 md:h-11 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all self-center" />
            </a>

            {/* Line 2: LinkedIn (Staggered) */}
            <a
              href="https://www.linkedin.com/in/victor-frangov/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-2 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[-0.04em] lowercase leading-[0.88] text-foreground hover:translate-x-2 transition-transform duration-300 sm:pl-8 md:pl-14 lg:pl-0 lg:mr-10"
            >
              <span>{t("contact.linkedin")}</span>
              <ArrowUpRight className="w-6 h-6 sm:w-9 sm:h-9 md:w-11 md:h-11 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all self-center" />
            </a>

            {/* Line 3: Email (Staggered further) */}
            <a
              href="mailto:v@victorfrangov.com"
              className="group inline-flex items-baseline gap-2 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[-0.04em] lowercase leading-[0.88] text-foreground hover:translate-x-2 transition-transform duration-300 sm:pl-16 md:pl-28 lg:pl-0 lg:mr-4"
            >
              <span>{t("contact.email")}</span>
              <ArrowUpRight className="w-6 h-6 sm:w-9 sm:h-9 md:w-11 md:h-11 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all self-center" />
            </a>

            {/* Line 4: Situs Digital */}
            <a
              href="https://situsdigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-2 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[-0.04em] lowercase leading-[0.88] text-foreground hover:translate-x-2 transition-transform duration-300 sm:pl-8 md:pl-16 lg:pl-0"
            >
              <span>{t("contact.situsDigital")}</span>
              <ArrowUpRight className="w-6 h-6 sm:w-9 sm:h-9 md:w-11 md:h-11 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all self-center" />
            </a>
          </div>
        </div>
      </div>

      {/* Middle / Giant Display Section: Copyright, Email, Lausanne, Montreal taking up entire space */}
      <div className="w-full max-w-7xl mx-auto my-12 sm:my-16 pt-12 border-t border-foreground/10 flex flex-col gap-8 sm:gap-12">
        {/* Info Row: Email Connected Capsule + Lausanne/Montreal Badges */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Email Capsule */}
          <a
            href="mailto:v@victorfrangov.com"
            className="inline-flex items-center rounded-full border border-foreground/30 overflow-hidden text-xs sm:text-sm md:text-base font-mono hover:border-foreground transition-colors"
          >
            <span className="px-3 sm:px-4 py-2 border-r border-foreground/30 text-foreground/60">email</span>
            <span className="px-3 sm:px-4 py-2 border-r border-foreground/30 font-medium">v</span>
            <span className="px-2 sm:px-3 py-2 border-r border-foreground/30 text-foreground/60">@</span>
            <span className="px-3 sm:px-4 py-2 border-r border-foreground/30 font-medium">victorfrangov</span>
            <span className="px-2 sm:px-3 py-2 border-r border-foreground/30 text-foreground/60">.</span>
            <span className="px-3 sm:px-4 py-2">com</span>
          </a>

          {/* Locations: Lausanne & Montreal */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-lg sm:text-xl md:text-2xl font-light tracking-tight text-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="font-medium">{t("contact.lausanne")}</span>
              <SwissCross className="w-5 h-5 sm:w-6 sm:h-6 inline-block align-middle shrink-0" />
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="font-medium">{t("contact.montreal")}</span>
              <MontrealLogo className="w-6 h-6 sm:w-7 sm:h-7 inline-block align-middle shrink-0 hover:rotate-45 transition-transform duration-500" />
            </span>
          </div>
        </div>

        {/* Giant Full-Width Typography Wordmark (like bleibtgleich in reference) */}
        <div className="w-full overflow-hidden select-none py-2">
          <h2 className="text-[12.5vw] font-extrabold tracking-[-0.05em] leading-[0.82] uppercase text-foreground text-center w-full whitespace-nowrap">
            VICTORFRANGOV©{year}
          </h2>
        </div>
      </div>

      {/* Bottom Bar: Teeny tiny corners */}
      <div className="w-full max-w-7xl mx-auto pt-6 border-t border-foreground/10 flex items-center justify-between text-[11px] sm:text-xs font-mono text-foreground/60">
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