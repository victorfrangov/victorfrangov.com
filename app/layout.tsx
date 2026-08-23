export const dynamic = "force-static";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({ children }: { children: ReactNode }) {
  const locale = "en"; // root uses default; actual pages will be generated per-locale by Next with i18n

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground selection:bg-foreground selection:text-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          storageKey="theme"
          disableTransitionOnChange
        >
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}