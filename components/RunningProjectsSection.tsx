"use client"

import React, { useState } from "react"
import { useTranslations } from "next-intl"
import ProjectCard from "./project-card"
import Esp32Model from "./Esp32Model"
import PongModel from "./PongModel"
import FluidSimModel from "./FluidSimModel"
import StockChartModel from "./StockChartModel"
import SitusModel from "./SitusModel"

type ProjectCategory = "all" | "web" | "systems" | "embedded"

type ProjectLinkKey = "website" | "sourceCode"

type Project = {
  slug: string
  category: ProjectCategory
  image?: string
  tags: readonly string[]
  links: readonly { key: ProjectLinkKey; href: string }[]
}

const PROJECTS: Project[] = [
  {
    slug: "agency",
    category: "web",
    image: "/projects/situs-large-white.webp",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "i18n", "SEO Architecture"],
    links: [
      { key: "website", href: "https://situsdigital.com" },
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
    tags: ["C++", "C", "OpenGL", "SDL3", "Navier-Stokes"],
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
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all")

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === "all") return true
    return p.category === activeFilter
  })

  const filterCategories: ProjectCategory[] = ["all", "web", "systems", "embedded"]

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-20 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-b border-foreground/10"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div>
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

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {filterCategories.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-foreground text-background font-semibold"
                  : "border border-foreground/20 text-foreground/70 hover:border-foreground hover:text-foreground"
              }`}
            >
              {t(`running.filter.${filter}`)}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Locomotive Works Grid */}
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        {filteredProjects.map((p, idx) => {
          const indexFormatted = `( ${String(idx + 1).padStart(2, "0")} )`
          const title = t(`projects.${p.slug}.title`)
          const dates = t(`projects.${p.slug}.dates`)
          const description = t(`projects.${p.slug}.description`)
          const mappedLinks = p.links.map((link) => ({
            type: t(`running.linkTypes.${link.key}`),
            href: link.href,
          }))

          let customComponent: React.ReactNode | undefined
          if (p.slug === "agency") {
            customComponent = <SitusModel />
          } else if (p.slug === "esp32") {
            customComponent = <Esp32Model />
          } else if (p.slug === "pong") {
            customComponent = <PongModel />
          } else if (p.slug === "fluidsim") {
            customComponent = <FluidSimModel />
          } else if (p.slug === "stock-ai-robot") {
            customComponent = <StockChartModel />
          }

          return (
            <ProjectCard
              key={p.slug}
              index={indexFormatted}
              title={title}
              description={description}
              dates={dates}
              tags={p.tags}
              image={p.image}
              customComponent={customComponent}
              links={mappedLinks}
            />
          )
        })}
      </div>
    </section>
  )
}
