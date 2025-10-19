import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/LanguageSwitcher"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Victor Frangov - Full Stack Developer",
  description: "Portfolio of Victor Frangov, Computer Science student specializing in full-stack web development"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
