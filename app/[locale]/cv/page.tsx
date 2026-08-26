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
    <div className="min-h-screen bg-[#fbfbfd] text-[#111115] flex flex-col justify-between p-6 sm:p-10 relative selection:bg-[#111115] selection:text-white font-sans">
      {/* Subtle background dot grid pattern */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
      />

      {/* Top Left Navigation Button */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex justify-start">
        <Link
          href="https://victorfrangov.com"
          className="group inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-black/10 rounded-full text-sm font-semibold tracking-tight shadow-sm hover:border-black/25 hover:shadow-md transition-all duration-200 hover:-translate-x-0.5"
          aria-label="Return to victorfrangov.com"
        >
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          victorfrangov.com
        </Link>
      </div>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-[720px] mx-auto my-auto py-8 sm:py-12 flex flex-col items-center text-center">
        <div className="mb-10 sm:mb-12 flex flex-col items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6e6e7d] bg-black/[0.04] px-3.5 py-1.5 rounded-full border border-black/[0.08]">
            Victor Frangov
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#111115] leading-tight font-mono">
            Select Curriculum Vitae
          </h1>
          <p className="text-base sm:text-lg text-[#6e6e7d] max-w-md">
            Choose your preferred language
          </p>
        </div>

        {/* Big Choice Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
          {/* English Button */}
          <a
            href="/cv_en.pdf"
            className="group relative flex flex-col items-center justify-center gap-5 p-8 sm:p-10 bg-white border border-black/10 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 hover:border-black"
          >
            <span className="text-4xl sm:text-5xl select-none" role="img" aria-label="English">
              🇬🇧
            </span>
            <span className="text-2xl sm:text-3xl font-bold tracking-tight font-mono">
              English
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full bg-[#111115] text-white transition-transform duration-200 group-hover:scale-105">
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
            className="group relative flex flex-col items-center justify-center gap-5 p-8 sm:p-10 bg-white border border-black/10 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 hover:border-black"
          >
            <span className="text-4xl sm:text-5xl select-none" role="img" aria-label="Français">
              🇫🇷
            </span>
            <span className="text-2xl sm:text-3xl font-bold tracking-tight font-mono">
              Français
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full bg-[#111115] text-white transition-transform duration-200 group-hover:scale-105">
              Consulter CV
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-xs text-[#6e6e7d]">
        <p>© 2026 Victor Frangov</p>
      </footer>
    </div>
  )
}
