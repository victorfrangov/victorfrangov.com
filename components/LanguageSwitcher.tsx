"use client"

import { Globe } from "lucide-react"
import { useLocale } from "next-intl"
import { createNavigation } from "next-intl/navigation"

const { useRouter, usePathname } = createNavigation()

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const next = locale === "en" ? "fr" : "en"

  return (
    <button
      onClick={() => router.replace(pathname, { locale: next })}
      className="
        flex items-center gap-2 px-3 py-1.5 rounded transition-colors
        border border-black/20 dark:border-white/20
        hover:border-black/40 dark:hover:border-white/40
        bg-transparent
      "
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">{locale.toUpperCase()}</span>
    </button>
  )
}
