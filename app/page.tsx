import type { Metadata } from "next"
import MainSection from "@/components/MainSection"
import FeaturedWorkSection from "@/components/FeaturedWorkSection"
import RunningProjectsSection from "@/components/RunningProjectsSection"
import ContactSection from "@/components/ContactSection"
import Link from "next/link"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"

export const metadata: Metadata = {
  title: "Victor Frangov | Full Stack Developer",
  description:
    "Computer Science student at EPFL passionate about creating modern and performant web applications. Specializing in React, TypeScript, Node.js, and full-stack development.",
  keywords: [
    "full stack developer",
    "web development",
    "React developer",
    "TypeScript",
    "Node.js",
    "Python",
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
  twitter: {
    card: "summary_large_image",
    title: "Victor Frangov | Full Stack Developer",
    description:
      "Computer Science student passionate about building modern web applications. Explore my projects and technical skills.",
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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl sm:text-2xl font-medium">
            Victor.
          </Link>
          <div className="hidden sm:flex items-center gap-4 sm:gap-8">
            <Link href="#work" className="hover:text-gray-300">
              Work
            </Link>
            <Link href="#about" className="hover:text-gray-300">
              About
            </Link>
            <Link href="#contact" className="hover:text-gray-300">
              Contact
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
      <FeaturedWorkSection />
      <RunningProjectsSection />
      <ContactSection />
    </div>
  )
}
