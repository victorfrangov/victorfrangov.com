export const dynamic = "force-static";

import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import sprite from "./generated/sprite";

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
          {sprite ? (
            <div
              dangerouslySetInnerHTML={{
                __html: sprite.replace(
                  /<svg([^>]*)>/,
                  '<svg$1 aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden"'
                ),
              }}
            />
          ) : null}

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}