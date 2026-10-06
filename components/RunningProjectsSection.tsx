"use client"

import React from "react"
import { useTranslations } from "next-intl"
import ProjectCard from "./project-card"

type ProjectLinkKey = "website" | "sourceCode"

type Project = {
  slug: string
  category: "web" | "systems" | "embedded"
  image?: string
  tags: readonly string[]
  links: readonly { key: ProjectLinkKey; href: string }[]
}

const PROJECTS: Project[] = [
  {
    slug: "papagal",
    category: "systems",
    image: "/projects/papagal.webp",
    tags: ["Swift", "AppKit", "MetalKit", "SQLite", "Parquet", "macOS"],
    links: [
      { key: "website", href: "https://papagal.dev" },
    ]
  },
  {
    slug: "agency",
    category: "web",
    image: "/projects/kollowo-large-white.webp",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "i18n", "SEO Architecture"],
    links: [
      { key: "website", href: "https://kollowo.com" },
    ]
  },
  {
    slug: "stock-ai-robot",
    category: "systems",
    image: "/projects/stock.webp",
    tags: ["Python", "PyTorch", "Pandas", "CUDA / MPS", "Time Series"],
    links: [
      { key: "sourceCode", href: "https://github.com/victorfrangov/stock-robot" }
    ]
  },
  {
    slug: "fluidsim",
    category: "systems",
    image: "/projects/fluid-simulation.webm",
    tags: ["C++", "C", "Metal", "SDL3", "Navier-Stokes"],
    links: [
      { key: "sourceCode", href: "https://github.com/victorfrangov/fluid-simulation1" }
    ]
  },
  {
    slug: "pong",
    category: "embedded",
    image: "/projects/pong.webm",
    tags: ["C", "C++", "SDL3", "Game Loop"],
    links: [
      { key: "sourceCode", href: "https://github.com/victorfrangov/pong" }
    ]
  },
  {
    slug: "esp32",
    category: "embedded",
    image: "/projects/esp32.webp",
    tags: ["C", "ESP-IDF", "FreeRTOS", "IoT", "Sensors"],
    links: [
      { key: "sourceCode", href: "https://github.com/victorfrangov/esp32-humidity" }
    ]
  }
]

export default function RunningProjectsSection() {
  const t = useTranslations()

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="pt-20 sm:pt-32 pb-0 w-full border-b border-foreground/20"
    >
      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-10 sm:mb-14">
        <span className="text-xs font-mono text-foreground/50 tracking-widest uppercase block mb-3">
          ( 04 / {t("running.sectionTag")} )
        </span>
        <h2
          id="projects-heading"
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight uppercase"
        >
          {t("running.title.line1")}{" "}
          <span className="font-serif italic font-normal lowercase">
            {t("running.title.line2")}
          </span>
        </h2>
      </div>

      {/* 2-Column Full-Bleed Flush Brutalist Works Grid (Zero gap, zero padding) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-foreground/20">
        {PROJECTS.map((p, idx) => {
          const indexFormatted = `( ${String(idx + 1).padStart(2, "0")} )`
          const title = t(`projects.${p.slug}.title`)
          const dates = t(`projects.${p.slug}.dates`)
          const description = t(`projects.${p.slug}.description`)
          const mappedLinks = p.links.map((link) => ({
            type: t(`running.linkTypes.${link.key}`),
            href: link.href,
          }))

          return (
            <ProjectCard
              key={p.slug}
              index={indexFormatted}
              title={title}
              description={description}
              dates={dates}
              tags={p.tags}
              image={p.image}
              links={mappedLinks}
            />
          )
        })}
      </div>
    </section>
  )
}
