import type { Metadata } from "next"
import MainSection from "@/components/MainSection"
import FeaturedWorkSection from "@/components/FeaturedWorkSection"
import RunningProjectsSection from "@/components/RunningProjectsSection"
import ContactSection from "@/components/ContactSection"
import NavBar from "@/components/NavBar"
import DockController from "@/components/DockController"
import AboutMeSection from "@/components/AboutMeSection"

const apps = [
  { id: "linkedin-light", icon: "/linkedin.png" },
  { id: "github-light", icon: "/github-light.png" },
  { id: "github-dark", icon: "/github-dark.png" },
  { id: "mail-light", icon: "/mail-light.png" },
  { id: "mail-dark", icon: "/mail-dark.png" },
  { id: "phone", icon: "/phone.png" },
  { id: "messages-light", icon: "/messages-light.png" },
  { id: "messages-dark", icon: "/messages-dark.png" },
  { id: "whatsapp-light", icon: "/whatsapp-light.png" },
  { id: "whatsapp-dark", icon: "/whatsapp-dark.png" }
]

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

export default async function HomePage({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <MainSection />
      <AboutMeSection />
      <FeaturedWorkSection locale={locale} />
      <RunningProjectsSection locale={locale} />
      <ContactSection locale={locale} />
      <DockController apps={apps} />
    </div>
  )
}

