import type { Metadata } from "next"
import MainSection from "@/components/MainSection"
import RunningProjectsSection from "@/components/RunningProjectsSection"
import ContactSection from "@/components/ContactSection"
import NavBar from "@/components/NavBar"
import AboutMeSection from "@/components/AboutMeSection"
import ExpertiseSection from "@/components/ExpertiseSection"

export function generateStaticParams(): { locale: string }[] {
  return [{ locale: "en" }, { locale: "fr" }]
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams?.locale ?? "en"
  const base = "https://victorfrangov.com"

  return {
    title: "Victor Frangov | Developer",
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
      title: "Victor Frangov | Developer",
      description:
        "Computer Science student passionate about building modern web applications. Explore my projects and technical skills.",
      type: "website",
      url: `${base}/${locale}`,
    },
    alternates: {
      canonical: `${base}/${locale}`,
      languages: {
        en: `${base}/en`,
        fr: `${base}/fr`,
      },
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
}

export default async function Page(props: any) {
  const params = await props.params
  const { locale } = params ?? { locale: "en" }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main id="main-content">
        <MainSection />
        <AboutMeSection />
        <ExpertiseSection locale={locale} />
        <RunningProjectsSection />
        <ContactSection locale={locale} />
      </main>
    </div>
  )
}

