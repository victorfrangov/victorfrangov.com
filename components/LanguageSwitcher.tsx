"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { Globe } from "lucide-react"

type Language = "en" | "fr"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en")
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 border border-white/20 hover:border-white/40 transition-colors rounded"
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">{language.toUpperCase()}</span>
    </button>
  )
}
