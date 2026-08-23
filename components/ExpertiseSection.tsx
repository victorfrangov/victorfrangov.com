import { getTranslations } from "next-intl/server"
import Image from "next/image"

type IconItem = { label: string; slug?: string; invertDark?: boolean; noIcon?: boolean }

const FRONTEND_ICONS: IconItem[] = [
  { label: "Next.js", slug: "nextdotjs", invertDark: true },
  { label: "React", slug: "react" },
  { label: "TypeScript", slug: "typescript" },
  { label: "JavaScript", slug: "javascript" },
  { label: "Tailwind CSS", slug: "tailwindcss" },
  { label: "HTML5", slug: "html5" },
  { label: "CSS3", slug: "css" },
  { label: "Webpack", slug: "webpack" },
  { label: "Npm", slug: "npm" },
]

const BACKEND_ICONS: IconItem[] = [
  { label: "Python", slug: "python" },
  { label: "PyTorch", slug: "pytorch" },
  { label: "TensorFlow", slug: "tensorflow" },
  { label: "C", slug: "c" },
  { label: "C++", slug: "cplusplus" },
  { label: "Node.js", slug: "nodedotjs" },
  { label: "Flask", slug: "flask" },
  { label: "Java", slug: "java" },
  { label: "PostgreSQL", slug: "postgresql" },
  { label: "Firebase", slug: "firebase" },
  { label: "NumPy", slug: "numpy" },
  { label: "Pandas", slug: "pandas" },
  { label: "Matplotlib", noIcon: true },
  { label: "CUDA", slug: "nvidia" },
  { label: "OpenGL", slug: "opengl" },
  { label: "Ollama", slug: "ollama" },
  { label: "Supabase", slug: "supabase" },
  { label: "SDL3", noIcon: true },
]

const TOOLS_DEVOPS_ICONS: IconItem[] = [
  { label: "Git", slug: "git" },
  { label: "GitHub Actions", slug: "githubactions" },
  { label: "Vercel", slug: "vercel", invertDark: true },
  { label: "Google Cloud", slug: "googlecloud" },
  { label: "Microsoft Azure", slug: "microsoftazure" },
  { label: "Postman", slug: "postman" },
  { label: "Bash / Zsh", slug: "gnubash" },
  { label: "Linux", slug: "json" },
]

function IconBadges({ items }: { items: IconItem[] }) {
  return (
    <ul className="flex flex-wrap gap-2 pt-4 list-none m-0 p-0">
      {items.map(({ label, slug, invertDark, noIcon }) => (
        <li
          key={label}
          className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/[0.03] px-3 py-1.5 text-xs font-mono hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-200"
          title={label}
        >
          {!noIcon && slug && (
            <Image
              src={`/icons/${slug}.svg`}
              alt={`${label} icon`}
              width={14}
              height={14}
              className={`h-3.5 w-3.5 object-contain ${invertDark ? "dark:invert" : ""}`}
              loading="lazy"
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

  const services = [
    {
      number: "01",
      title: t("expertise.service1.title"),
      desc: t("expertise.service1.desc"),
      icons: FRONTEND_ICONS,
    },
    {
      number: "02",
      title: t("expertise.service2.title"),
      desc: t("expertise.service2.desc"),
      icons: BACKEND_ICONS,
    },
    {
      number: "03",
      title: t("expertise.service3.title"),
      desc: t("expertise.service3.desc"),
      icons: TOOLS_DEVOPS_ICONS,
    },
  ]

  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="relative py-20 sm:py-32 border-b border-foreground/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-24">
          <div>
            <span className="text-xs font-mono text-foreground/50 tracking-widest uppercase block mb-3">
              ( 03 / {t("expertise.title.line1")} {t("expertise.title.line2")} )
            </span>
            <h2
              id="expertise-heading"
              className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight uppercase"
            >
              {t("expertise.title.line1")}{" "}
              <span className="font-serif italic font-normal lowercase">{t("expertise.title.line2")}</span>
            </h2>
          </div>
          <p className="text-sm font-mono text-foreground/60 max-w-xs md:text-right">
            {t("expertise.subtitle")}
          </p>
        </div>

        {/* Locomotive Numbered Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 sm:gap-12 divide-y md:divide-y-0 md:divide-x divide-foreground/10">
          {services.map((service, index) => (
            <div
              key={index}
              className={`space-y-6 ${index > 0 ? "pt-8 md:pt-0 md:pl-8 sm:md:pl-12" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-foreground/50">({service.number})</span>
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/30" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed font-normal">
                {service.desc}
              </p>
              <IconBadges items={service.icons} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
