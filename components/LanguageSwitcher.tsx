"use client"

import { useLocale } from "next-intl"
import { createNavigation } from "next-intl/navigation"

const { useRouter, usePathname } = createNavigation()

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const switchLocale = (newLocale: "en" | "fr") => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale })
    }
  }

  return (
    <div className="inline-flex items-center rounded-full border border-foreground/30 p-0.5 text-xs font-mono tracking-tight">
      <button
        onClick={() => switchLocale("en")}
        className={`px-2.5 py-0.5 rounded-full transition-all duration-200 ${
          locale === "en"
            ? "bg-foreground text-background font-semibold"
            : "text-foreground/60 hover:text-foreground"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => switchLocale("fr")}
        className={`px-2.5 py-0.5 rounded-full transition-all duration-200 ${
          locale === "fr"
            ? "bg-foreground text-background font-semibold"
            : "text-foreground/60 hover:text-foreground"
        }`}
        aria-label="Passer au Français"
      >
        FR
      </button>
    </div>
  )
}
