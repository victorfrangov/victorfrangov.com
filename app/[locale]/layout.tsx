export const dynamic = "force-static"

import "../globals.css"
import React from "react"
import type { Metadata } from "next"
import {notFound} from "next/navigation"
import {NextIntlClientProvider} from "next-intl"
import {setRequestLocale} from "next-intl/server"
import { ThemeProvider } from "next-themes"
import { Analytics } from "@vercel/analytics/next"
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google"
import NavBar from "@/components/NavBar"
import SmoothScroll from "@/components/SmoothScroll"
import JsonLd from "./json-ld"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans-fallback",
  display: "swap",
  preload: true,
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-mono-fallback",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL("https://victorfrangov.com"),
}

export function generateStaticParams() {
  return [{locale: "en"}, {locale: "fr"}]
}

// This is the root layout: it owns <html> so each locale gets the right lang attribute
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  setRequestLocale(locale)

  let messages
  try {
    messages = (await import(`@/messages/${locale}.json`)).default
  } catch {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning className={`${plusJakartaSans.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased bg-background text-foreground selection:bg-foreground selection:text-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme"
          disableTransitionOnChange
        >
          <SmoothScroll>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <JsonLd locale={locale} />
              <NavBar />
              {children}
            </NextIntlClientProvider>
          </SmoothScroll>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
