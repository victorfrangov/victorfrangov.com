import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { ArrowUpRight, ArrowDown } from "lucide-react"
import { MontrealLogo } from "./MontrealLogo"
import { SwissCross } from "./SwissCross"

export default async function ContactSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale })
  const year = new Date().getFullYear()

  const cvHref =
    locale === "fr"
      ? "https://cv.victorfrangov.com/cv_fr.pdf"
      : "https://cv.victorfrangov.com/cv_en.pdf"

  const altLocale = locale === "en" ? "fr" : "en"

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full bg-background text-foreground px-6 sm:px-10 md:px-16 py-16 sm:py-24"
    >
      {/* Top: Massive Links Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-2 md:grid-cols-12 gap-x-8 md:gap-x-12 gap-y-12 items-start text-foreground/70">
        {/* Social */}
        <div className="md:col-span-4">
          <ul className="space-y-1 sm:space-y-2 list-none m-0 p-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.15]">
            <li>
              <a href="https://github.com/victorfrangov" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors inline-flex items-baseline gap-1">
                GitHub <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 opacity-40 self-center" />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/victor-frangov/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors inline-flex items-baseline gap-1">
                LinkedIn <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 opacity-40 self-center" />
              </a>
            </li>
            <li>
              <a href="mailto:v@victorfrangov.com" className="hover:text-foreground transition-colors inline-flex items-baseline gap-1">
                Email <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 opacity-40 self-center" />
              </a>
            </li>
            <li>
              <a href="https://situsdigital.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors inline-flex items-baseline gap-1">
                Situs Digital <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 opacity-40 self-center" />
              </a>
            </li>
          </ul>
        </div>

        {/* Menu */}
        <div className="md:col-span-4">
          <ul className="space-y-1 sm:space-y-2 list-none m-0 p-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.15]">
            <li>
              <Link href="#projects" className="hover:text-foreground transition-colors">
                {t("contact.work")}
              </Link>
            </li>
            <li>
              <Link href="#about-me" className="hover:text-foreground transition-colors">
                {t("contact.about")}
              </Link>
            </li>
            <li>
              <Link href="#expertise" className="hover:text-foreground transition-colors">
                {t("contact.capabilities")}
              </Link>
            </li>
            <li>
              <a href={cvHref} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors inline-flex items-baseline gap-1">
                {t("contact.resume")} <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 opacity-40 self-center" />
              </a>
            </li>
            <li>
              <Link href={`/${altLocale}`} className="hover:text-foreground transition-colors">
                {t("contact.altLanguageName")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Copyright + Email + Location */}
        <div className="col-span-2 md:col-span-4 flex flex-col items-end justify-between mt-6 md:mt-0 space-y-8">
          <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tighter">
            {year}©
          </span>

          <div className="flex flex-col items-end gap-4">
            <a
              href="mailto:v@victorfrangov.com"
              className="inline-flex items-center rounded-full border border-foreground/40 overflow-hidden text-sm sm:text-lg md:text-xl font-normal hover:border-foreground transition-colors"
            >
              <span className="px-4 sm:px-5 py-2 sm:py-3 border-r border-foreground/40">email</span>
              <span className="px-4 sm:px-5 py-2 sm:py-3 border-r border-foreground/40 font-medium">v</span>
              <span className="px-3 sm:px-4 py-2 sm:py-3 border-r border-foreground/40">@</span>
              <span className="px-4 sm:px-5 py-2 sm:py-3 border-r border-foreground/40 font-medium">victorfrangov</span>
              <span className="px-3 sm:px-4 py-2 sm:py-3 border-r border-foreground/40">.</span>
              <span className="px-4 sm:px-5 py-2 sm:py-3">com</span>
            </a>

            <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span>{t("contact.lausanne")}</span>
                <SwissCross className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 inline-block align-middle shrink-0" />
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span>{t("contact.montreal")}</span>
                <MontrealLogo className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 inline-block align-middle shrink-0 hover:rotate-45 transition-transform duration-500" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}