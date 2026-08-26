import type { Metadata } from "next"
import Link from "next/link"

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
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between p-6 sm:p-10 relative selection:bg-foreground selection:text-background font-sans transition-colors duration-300">
      {/* Top Left Navigation Link */}
      <Link
        href="https://victorfrangov.com"
        className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20 inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider text-foreground hover:opacity-60 transition-opacity"
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

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-[720px] mx-auto my-auto py-8 sm:py-12 flex flex-col items-center text-center">
        <div className="mb-10 sm:mb-12 flex flex-col items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground bg-muted px-3.5 py-1.5 rounded-full border border-border">
            Victor Frangov
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight font-mono">
            Select Curriculum Vitae
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-md">
            Choose your preferred language
          </p>
        </div>

        {/* Big Choice Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
          {/* English Button */}
          <a
            href="/cv_en.pdf"
            className="group relative flex flex-col items-center justify-center gap-5 p-8 sm:p-10 bg-card border border-border rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 hover:border-foreground/50"
          >
            <span className="text-4xl sm:text-5xl select-none" role="img" aria-label="English">
              🇬🇧
            </span>
            <span className="text-2xl sm:text-3xl font-bold tracking-tight font-mono text-foreground">
              English
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full bg-foreground text-background transition-transform duration-200 group-hover:scale-105">
              View CV
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </a>

          {/* Français Button */}
          <a
            href="/cv_fr.pdf"
            className="group relative flex flex-col items-center justify-center gap-5 p-8 sm:p-10 bg-card border border-border rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 hover:border-foreground/50"
          >
            <span className="text-4xl sm:text-5xl select-none" role="img" aria-label="Français">
              🇫🇷
            </span>
            <span className="text-2xl sm:text-3xl font-bold tracking-tight font-mono text-foreground">
              Français
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full bg-foreground text-background transition-transform duration-200 group-hover:scale-105">
              Consulter CV
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </a>
        </div>
      </main>

      {/* Bottom: Victor Frangov Wordmark (matching hamburger menu) */}
      <footer
        className="w-full overflow-hidden select-none relative z-10 px-4 sm:px-8 pb-3 pt-4 flex items-end justify-center"
        aria-hidden="true"
      >
        <h2 className="text-[7.2vw] font-black tracking-[-0.04em] leading-[0.85] uppercase text-black dark:text-white text-center w-full whitespace-nowrap">
          VICTORFRANGOV©{new Date().getFullYear()}
        </h2>
      </footer>
    </div>
  )
}
