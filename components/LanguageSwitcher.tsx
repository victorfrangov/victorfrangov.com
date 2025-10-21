"use client"

import { Globe } from "lucide-react"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next-intl/navigation"

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const next = locale === "en" ? "fr" : "en"

  return (
    <button
      onClick={() => router.replace(pathname, { locale: next })}
      className="flex items-center gap-2 px-3 py-1.5 border border-white/20 hover:border-white/40 transition-colors rounded"
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">{locale.toUpperCase()}</span>
    </button>
  )
}
