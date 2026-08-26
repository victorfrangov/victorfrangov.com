import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export function generateStaticParams(): { locale: string }[] {
  return [{ locale: "en" }, { locale: "fr" }]
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Victor Frangov — Curriculum Vitae",
    description: "Select and view Victor Frangov's CV in English or Français.",
  }
}

export default function CvPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between p-0 relative selection:bg-foreground selection:text-background font-sans transition-colors duration-300">
      {/* Top Left Navigation Link */}
      <Link
        href="https://victorfrangov.com"
        className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20 inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider text-foreground hover:text-foreground/50 transition-colors duration-100 ease-out cursor-pointer"
        aria-label="Return to victorfrangov.com"
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        VICTORFRANGOV.COM
      </Link>

      {/* Main Content: Giant Language Links */}
      <main className="relative z-10 w-full max-w-7xl mx-auto my-auto px-6 sm:px-12 py-16 flex flex-col items-center justify-center gap-4 sm:gap-8 text-center">
        {/* English Link */}
        <a
          href="/cv_en.pdf"
          className="group inline-flex items-center justify-center gap-3 sm:gap-5 text-[13vw] sm:text-[10vw] lg:text-[8.5vw] font-black tracking-[-0.04em] leading-[0.9] uppercase text-foreground hover:text-foreground/35 transition-colors duration-100 ease-out select-none cursor-pointer"
        >
          <span>English</span>
          <span className="inline-flex items-center justify-center shrink-0 pointer-events-none">
            <ArrowUpRight
              className="w-[0.6em] h-[0.6em] shrink-0 pointer-events-none"
              strokeWidth={2.8}
            />
          </span>
        </a>

        {/* Français Link */}
        <a
          href="/cv_fr.pdf"
          className="group inline-flex items-center justify-center gap-3 sm:gap-5 text-[13vw] sm:text-[10vw] lg:text-[8.5vw] font-black tracking-[-0.04em] leading-[0.9] uppercase text-foreground hover:text-foreground/35 transition-colors duration-100 ease-out select-none cursor-pointer"
        >
          <span>Français</span>
          <span className="inline-flex items-center justify-center shrink-0 pointer-events-none">
            {/* <ArrowUpRight
              className="w-[0.6em] h-[0.6em] shrink-0 pointer-events-none"
              strokeWidth={2.8}
            /> */}
          </span>
        </a>
      </main>

      {/* Bottom: Victor Frangov Wordmark (Sized to fit 100% width with zero cutoff) */}
      <footer
        className="w-full overflow-hidden select-none relative z-0 px-4 sm:px-8 pb-3 pt-1 flex items-end justify-center"
        aria-hidden="true"
      >
        <h2 className="text-[7.2vw] font-black tracking-[-0.04em] leading-[0.85] uppercase text-black dark:text-white text-center w-full whitespace-nowrap">
          VICTORFRANGOV©{new Date().getFullYear()}
        </h2>
      </footer>
    </div>
  )
}
