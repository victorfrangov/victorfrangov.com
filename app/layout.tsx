export const dynamic = "force-static";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export default function RootLayout({ children }: { children: ReactNode }) {
  const locale = "en"; // root uses default; actual pages will be generated per-locale by Next with i18n

  return (
    <html lang={locale} suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}