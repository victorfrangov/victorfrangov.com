export const dynamic = "force-static";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

export default function RootLayout({ children }: { children: ReactNode }) {
  const locale = "en"; // root uses default; actual pages will be generated per-locale by Next with i18n

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
        {/* 1. Initialize the analytics queue */}
        <Script id="vercel-analytics-init" strategy="afterInteractive">
          {`window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };`}
        </Script>

        {/* 2. Load the masked script and point it to your custom endpoint */}
        <Script 
          async 
          src="/api/stats/va.js" 
          data-endpoint="/api/stats" 
        />
      </body>
    </html>
  );
}