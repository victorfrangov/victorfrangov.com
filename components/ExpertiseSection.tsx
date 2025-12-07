import { getTranslations } from "next-intl/server"
import { ScrollVelocity } from "./ui/shadcn-io/scroll-velocity";

type IconItem = { label: string; slug?: string; invertDark?: boolean; noIcon?: boolean }

// CDN overrides for missing icons
const ICON_OVERRIDES: Record<string, string> = {
  java: "https://www.vectorlogo.zone/logos/java/java-icon.svg",
  microsoftazure: "https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg",
  metal: "https://developer.apple.com/assets/elements/icons/metal/metal-256x256_2x.png",
}

function getIconSrc(slug: string) {
  return ICON_OVERRIDES[slug] ?? `https://cdn.simpleicons.org/${slug}`
}

const FRONTEND_ICONS: IconItem[] = [
  { label: "Next.js", slug: "nextdotjs", invertDark: true },
  { label: "React", slug: "react" },
  { label: "TypeScript", slug: "typescript" },
  { label: "JavaScript", slug: "javascript" },
  { label: "HTML", slug: "html5" },
  { label: "CSS", slug: "css" },
  { label: "Tailwind CSS", slug: "tailwindcss" },
  { label: "Bootstrap", slug: "bootstrap" },
  { label: "Webpack", slug: "webpack" },
  { label: "NPM", slug: "npm" },
]

const BACKEND_ICONS: IconItem[] = [
  { label: "Node.js", slug: "nodedotjs" },
  { label: "Flask", slug: "flask" },
  { label: "Python", slug: "python" },
  { label: "Java", slug: "java" },
  { label: "PostgreSQL", slug: "postgresql" },
  { label: "Firebase", slug: "firebase" },
  { label: "TensorFlow", slug: "tensorflow" },
  { label: "PyTorch", slug: "pytorch" },
  { label: "NumPy", slug: "numpy" },
  { label: "Pandas", slug: "pandas" },
  { label: "Matplotlib", noIcon: true },
  { label: "CUDA", slug: "nvidia" },
  { label: "OpenGL", slug: "opengl" },
  { label: "Ollama", slug: "ollama" },
  { label: "SDL3", noIcon: true },
  { label: "C", slug: "c" },
  { label: "C++", slug: "cplusplus" },
]

const TOOLS_DEVOPS_ICONS: IconItem[] = [
  { label: "Git", slug: "git" },
  { label: "GitHub Actions", slug: "githubactions" },
  { label: "Vercel", slug: "vercel", invertDark: true },
  { label: "Google Cloud", slug: "googlecloud" },
  { label: "Microsoft Azure", slug: "microsoftazure" },
  { label: "Heroku", slug: "heroku" },
  { label: "Postman", slug: "postman" },
  { label: "Insomnia", slug: "insomnia" },
  { label: "Anaconda", slug: "anaconda" },
  { label: "Bash", slug: "gnubash" },
  { label: "Prettier", slug: "prettier" },
  { label: "JSON", slug: "json" },
]

function IconBadges({ items }: { items: IconItem[] }) {
  return (
    <ul className="flex flex-wrap gap-2 justify-center sm:justify-start">
      {items.map(({ label, slug, invertDark, noIcon }) => (
        <li
          key={label}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-2.5 py-1 text-xs sm:text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
          title={label}
        >
          {!noIcon && slug && (
            <img
              src={getIconSrc(slug)}
              alt={`${label} logo`}
              className={`h-4 w-4 ${invertDark ? "dark:invert" : ""}`}
              loading="lazy"
              decoding="async"
            />
          )}
          <span>{label}</span>
        </li>
      ))}
    </ul>
  )
}

export default async function ExpertiseSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale })

  return (
    <section id="expertise" className="pt-24 pb-28 sm:pb-12">
      <ScrollVelocity
        texts={[t("expertise.title.line1"), t("expertise.title.line2")]}
        className="text-4xl sm:text-6xl md:text-8xl font-bold text-center sm:text-left"
      />
      <div className="max-w-7xl mx-auto mb-16 sm:mb-32 mt-16">
        {/* Center on mobile, left-align on larger screens */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 text-center sm:text-left">
          {[
            {
              number: "01",
              titleKey: "expertise.items.0.title",
              icons: FRONTEND_ICONS,
            },
            {
              number: "02",
              titleKey: "expertise.items.1.title",
              icons: BACKEND_ICONS,
            },
            {
              number: "03",
              titleKey: "expertise.items.2.title",
              icons: TOOLS_DEVOPS_ICONS,
            },
          ].map((service, index) => (
            <div key={index} className="space-y-4">
              <span className="text-sm text-muted-foreground">({service.number})</span>
              <h3 className="text-2xl font-bold">{t(service.titleKey)}</h3>
              <IconBadges items={service.icons} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
