
import type { Metadata } from "next"
import MainSection from "@/components/MainSection"
import RunningProjectsSection from "@/components/RunningProjectsSection"
import ContactSection from "@/components/ContactSection"
import AboutMeSection from "@/components/AboutMeSection"
import ExpertiseSection from "@/components/ExpertiseSection"

export function generateStaticParams(): { locale: string }[] {
  return [{ locale: "en" }, { locale: "fr" }]
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams?.locale ?? "en"
  const base = "https://victorfrangov.com"
  const messages = (await import(`@/messages/${locale}.json`)).default

  const title = messages.seo.title
  const description = messages.seo.description
  const ogDescription = messages.seo.ogDescription
  const keywords = messages.seo.keywords.split(", ")

  return {
    metadataBase: new URL(base),
    title,
    description,
    keywords,
    openGraph: {
      title,
      description: ogDescription,
      type: "website",
      url: `${base}/${locale}`,
      siteName: "Victor Frangov",
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: ogDescription,
      creator: "@victorfrangov",
    },
    alternates: {
      canonical: `${base}/${locale}`,
      languages: {
        en: `${base}/en`,
        fr: `${base}/fr`,
      },
    },
    authors: [{ name: "Victor Frangov", url: base }],
    creator: "Victor Frangov",
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

