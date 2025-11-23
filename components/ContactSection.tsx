import Link from "next/link"
import { Mail, MapPin, Github, Linkedin, ArrowRight } from "lucide-react"
import { getTranslations } from "next-intl/server"

export default async function ContactSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale })
  return (
    <section
      id="contact"
      className="w-full mt-24 sm:mt-40 px-4 sm:px-8 py-24 border-t border-border bg-gradient-to-b from-background to-background/60"
    >
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 max-w-7xl mx-auto">
        <div className="lg:col-span-5 space-y-8">
          <h2 className="text-5xl sm:text-7xl font-bold leading-[0.95]">
            {t("contact.title.line1")}
            <br />
            {t("contact.title.line2")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-md">
            {t("contact.invite", {
              default: "Let’s build something impactful together."
            })}
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="mailto:victor.frangov@gmail.com?"
              className="inline-flex items-center gap-2 rounded-md px-6 py-3 bg-blue-600 text-white hover:bg-blue-500 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              {t("contact.cta.primary", { default: "Start a Project" })}
            </Link>
          </div>
        </div>

        {/* Right: Details */}
        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {t("contact.about.name")}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t("contact.about.description")}
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-muted-foreground" />
                <div>
                  <div className="font-medium">
                    {t("contact.info.location.label")}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {t("contact.info.location.value")}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {t("contact.info.location.note")}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 text-muted-foreground" />
                <div>
                  <div className="font-medium">
                    {t("contact.info.touch.label")}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {t("contact.info.touch.value")}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="https://github.com/victorfrangov"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
                {t("contact.social.github")}
              </Link>
              <Link
                href="https://www.linkedin.com/in/victor-frangov-4b974a147/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                {t("contact.social.linkedin")}
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-md border border-dashed border-border p-6">
              <h4 className="font-medium mb-2 text-sm tracking-wide">
                {t("contact.availability.title")}
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {t("contact.availability.body")}
              </p>
            </div>
            <div className="rounded-md border border-dashed border-border p-6">
              <h4 className="font-medium mb-2 text-sm tracking-wide">
                {t("contact.response.title")}
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {t("contact.response.body")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 sm:mt-16 flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-border">
        <div className="text-sm text-muted-foreground mb-4 sm:mb-0">{t("contact.footer.copyright")}</div>
      </div>
    </section>
  )
}
