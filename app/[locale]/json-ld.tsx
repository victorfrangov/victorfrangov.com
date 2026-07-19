type JsonLdProps = {
  locale: string
}

export default function JsonLd({ locale }: JsonLdProps) {
  const base = "https://victorfrangov.com"

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Victor Frangov",
    url: base,
    jobTitle: "Full Stack Developer",
    description:
      locale === "fr"
        ? "Développeur full stack et étudiant en informatique à l'EPFL"
        : "Full stack developer and Computer Science student at EPFL",
    sameAs: [
      "https://github.com/victorfrangov",
      "https://www.linkedin.com/in/victor-frangov/",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "EPFL",
      url: "https://www.epfl.ch",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Python",
      "C",
      "C++",
      "Node.js",
      "PostgreSQL",
      "TensorFlow",
      "PyTorch",
      "Full Stack Development",
      "Machine Learning",
    ],
    knowsLanguage: ["en", "fr"],
  }

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Victor Frangov",
    url: base,
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
    author: {
      "@type": "Person",
      name: "Victor Frangov",
    },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "fr" ? "Accueil" : "Home",
        item: `${base}/${locale}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
