import Link from "next/link"
import { Mail, MapPin, Github, Linkedin } from "lucide-react"
import { getTranslations } from "next-intl/server"

export default async function ContactSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale })
  return (
    <section id="contact" className="max-w-7xl mx-auto mt-16 sm:mt-32 px-4 sm:px-6">
      <div className="mb-16 sm:mb-32">
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-12">
          {t("contact.title.line1")}
          <br />
          {t("contact.title.line2")}
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">{t("contact.about.name")}</h3>
              <p className="text-muted-foreground mb-6">{t("contact.about.description")}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 text-muted-foreground" />
                <div>
                  <div className="font-medium">{t("contact.info.location.label")}</div>
                  <div className="text-muted-foreground">{t("contact.info.location.value")}</div>
                  <div className="text-sm text-muted-foreground">{t("contact.info.location.note")}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-1 text-muted-foreground" />
                <div>
                  <div className="font-medium">{t("contact.info.touch.label")}</div>
                  <div className="text-muted-foreground">{t("contact.info.touch.value")}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Link
                href="https://github.com/victorfrangov"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border px-6 py-3 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
                {t("contact.social.github")}
              </Link>
              <Link
                href="https://www.linkedin.com/in/victor-frangov-4b974a147/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border px-6 py-3 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                {t("contact.social.linkedin")}
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold">{t("contact.skills.title")}</h3>
            <div className="space-y-4">
              <div>
                <div className="font-medium mb-2">{t("contact.skills.frontend.label")}</div>
                <div className="text-sm text-muted-foreground">
                  {t("contact.skills.frontend.items")}
                </div>
              </div>
              <div>
                <div className="font-medium mb-2">{t("contact.skills.backend.label")}</div>
                <div className="text-sm text-muted-foreground">{t("contact.skills.backend.items")}</div>
              </div>
              <div>
                <div className="font-medium mb-2">{t("contact.skills.tools.label")}</div>
                <div className="text-sm text-muted-foreground">{t("contact.skills.tools.items")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 sm:mt-32 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">{t("contact.footer.navigation.title")}</div>
          {[
            { nameKey: "contact.footer.navigation.items.work", href: "#featured-work" },
            { nameKey: "contact.footer.navigation.items.projects", href: "/projects" },
            { nameKey: "contact.footer.navigation.items.contact", href: "#contact" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="block hover:text-muted-foreground">
              {t(item.nameKey)}
            </Link>
          ))}
        </div>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">{t("contact.footer.expertise.title")}</div>
          {[0,1,2,3].map((i) => (
            <div key={i} className="block">
              {t(`contact.footer.expertise.items.${i}`)}
            </div>
          ))}
        </div>
        <div className="space-y-4 md:col-span-2">
          <div className="text-sm text-muted-foreground">{t("contact.footer.connect.title")}</div>
          <div className="flex gap-4">
            {[
              { nameKey: "contact.footer.connect.items.linkedin", url: "https://www.linkedin.com/in/victor-frangov-4b974a147/" },
              { nameKey: "contact.footer.connect.items.github", url: "https://github.com/victorfrangov" },
              { nameKey: "contact.footer.connect.items.website", url: "https://victorfrangov.com" },
            ].map((social) => (
              <Link
                key={social.url}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-muted-foreground"
              >
                {t(social.nameKey)}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mt-16 flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-border">
  <div className="text-sm text-muted-foreground mb-4 sm:mb-0">{t("contact.footer.copyright")}</div>
        <div className="flex gap-4 text-sm">
          <Link href="#" className="hover:text-muted-foreground">
            {t("contact.footer.legal.privacy")}
          </Link>
          <Link href="#" className="hover:text-muted-foreground">
            {t("contact.footer.legal.terms")}
          </Link>
        </div>
      </div>
    </section>
  )
}
