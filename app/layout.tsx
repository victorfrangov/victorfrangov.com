import "./globals.css"
import {ThemeProvider} from "next-themes"
import {ReactNode} from "react"
import {getLocale} from "next-intl/server"

export default async function RootLayout({children}: {children: ReactNode}) {
  const locale = await getLocale()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}