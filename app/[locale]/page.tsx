import type { Metadata } from "next"
import MainSection from "@/components/MainSection"
import FeaturedWorkSection from "@/components/FeaturedWorkSection"
import RunningProjectsSection from "@/components/RunningProjectsSection"
import ContactSection from "@/components/ContactSection"
import Link from "next/link"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import DockController from "@/components/DockController"
import { getTranslations } from "next-intl/server"

export const metadata: Metadata = {
  title: "Victor Frangov | Full Stack Developer",
  description:
    "Computer Science student at EPFL passionate about creating modern and performant applications.",
  keywords: [
    "full stack developer",
    "web development",
    "React developer",
    "TypeScript",
    "Python",
    "C",
    "Node.js",
    "PostgreSQL",
    "Victor Frangov",
    "frontend developer",
    "backend developer",
    "EPFL",
    "Computer Science",
  ],
  openGraph: {
    title: "Victor Frangov | Full Stack Developer",
    description:
      "Computer Science student passionate about building modern web applications. Explore my projects and technical skills.",
    type: "website",
    url: "https://victorfrangov.com",
  },
  alternates: {
    canonical: "https://victorfrangov.com",
  },
  authors: [{ name: "Victor Frangov" }],
  category: "Technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

const apps = [
  {
    id: "linkedin-light",
    icon: "/linkedin.png",
  },
  {
    id: "github-light",
    icon: "/github-light.png"
  },
  {
    id: "github-dark",
    icon: "/github-dark.png"
  },
  {
    id: "mail-light",
    icon: "/mail-light.png"
  },
  {
    id: "mail-dark",
    icon: "/mail-dark.png"
  },
  {
    id: "phone",
    icon: "/phone.png"
  },
  {
    id: "messages-light",
    icon: "/messages-light.png"
  },
  {
    id: "messages-dark",
    icon: "/messages-dark.png"
  },
  {
    id: "whatsapp-light",
    icon: "/whatsapp-light.png"
  },
  {
    id: "whatsapp-dark",
    icon: "/whatsapp-dark.png"
  },
  {
    id: "uk",
    icon: "/uk.png"
  },
  {
    id: "fr",
    icon: "/france.png"
  },
  {
    id: "mode-light",
    icon: "/light-mode.png"
  },
  {
    id: "mode-dark",
    icon: "/dark-mode.png"
  }
]

export default async function HomePage({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params
  const t = await getTranslations({ locale })

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href={`/${locale}`} className="text-xl sm:text-2xl font-medium">
            {t("brand.name")}
          </Link>
          <div className="hidden sm:flex items-center gap-4 sm:gap-8">
            <Link href="#work" className="hover:text-gray-300">
              {t("nav.work")}
            </Link>
            <Link href="#about" className="hover:text-gray-300">
              {t("nav.about")}
            </Link>
            <Link href="#contact" className="hover:text-gray-300">
              {t("nav.contact")}
            </Link>
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
          <button className="sm:hidden w-8 h-8 flex flex-col justify-center gap-1.5">
            <span className="w-full h-0.5 bg-white"></span>
            <span className="w-full h-0.5 bg-white"></span>
          </button>
        </div>
      </nav>
      <MainSection />
      <FeaturedWorkSection locale={locale} />
      <RunningProjectsSection locale={locale} />
      <ContactSection locale={locale} />
      <DockController apps={apps} />
    </div>
  )
}

