import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

export default function FeaturedWorkSection() {
  const t = useTranslations()
  return (
    <section id="featured-work" className="px-4 sm:px-6 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 sm:mb-32">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-8 sm:mb-16 gap-6 sm:gap-0">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold">
              {t("featured.title.line1")}
              <br />
              {t("featured.title.line2")}
            </h2>
            <div className="max-w-md">
              <p className="text-muted-foreground mb-4">{t("featured.intro")}</p>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 border border-border px-4 sm:px-6 py-2 sm:py-3 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {t("featured.cta")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {[
            {
              titleKey: "featured.categories.0.title",
              number: "01",
              descriptionKey: "featured.categories.0.description",
            },
            {
              titleKey: "featured.categories.1.title",
              number: "02",
              descriptionKey: "featured.categories.1.description",
            },
            {
              titleKey: "featured.categories.2.title",
              number: "03",
              descriptionKey: "featured.categories.2.description",
            },
            {
              titleKey: "featured.categories.3.title",
              number: "04",
              descriptionKey: "featured.categories.3.description",
            },
          ].map((category, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-8 sm:py-12 border-t border-border"
            >
              <div className="space-y-4 mb-4 sm:mb-0">
                <div className="flex items-baseline gap-4">
                  <h3 className="text-2xl sm:text-4xl font-bold">{t(category.titleKey)}</h3>
                  <span className="text-sm text-muted-foreground">({category.number})</span>
                </div>
                <p className="text-muted-foreground">{t(category.descriptionKey)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Our Service Expertise */}
        <div className="mb-16 sm:mb-32">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-8 sm:mb-16 gap-6 sm:gap-0">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold">
              {t("featured.expertise.title.line1")}
              <br />
              {t("featured.expertise.title.line2")}
            </h2>
            <div className="max-w-md">
              <p className="text-muted-foreground mb-4">{t("featured.expertise.intro")}</p>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 border border-border px-4 sm:px-6 py-2 sm:py-3 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {t("featured.expertise.cta")} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
            {[
              {
                number: "01",
                titleKey: "featured.expertise.items.0.title",
                descriptionKeys: [
                  "featured.expertise.items.0.descriptions.0",
                  "featured.expertise.items.0.descriptions.1",
                ],
              },
              {
                number: "02",
                titleKey: "featured.expertise.items.1.title",
                descriptionKeys: [
                  "featured.expertise.items.1.descriptions.0",
                  "featured.expertise.items.1.descriptions.1",
                ],
              },
              {
                number: "03",
                titleKey: "featured.expertise.items.2.title",
                descriptionKeys: [
                  "featured.expertise.items.2.descriptions.0",
                  "featured.expertise.items.2.descriptions.1",
                ],
              },
            ].map((service, index) => (
              <div key={index} className="space-y-4">
                <span className="text-sm text-muted-foreground">({service.number})</span>
                <h3 className="text-2xl font-bold">{t(service.titleKey)}</h3>
                {service.descriptionKeys.map((descKey, i) => (
                  <p key={i} className="text-muted-foreground text-sm">
                    {t(descKey)}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
