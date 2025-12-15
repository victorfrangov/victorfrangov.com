"use client"

import React, { useRef, useLayoutEffect, useState } from "react"
import { ExternalLink, Github } from "lucide-react"
import { useTranslations } from "next-intl"
import { AnimatedBeam } from "./ui/shadcn-io/animated-beam"
import { cn } from "@/lib/utils"
import { ProjectCard } from "./project-card"
import CurvedLoop from "./ui/shadcn-io/curved-loop"

type ProjectLink = {
  icon: React.ReactNode
  type: string
  href: string
}

type Project = {
  slug: string
  href?: string
  image?: string
  video?: string
  tags: readonly string[]
  links: readonly ProjectLink[]
}

const PROJECTS: Project[] = [
  {
    slug: "portfolio",
    href: "/",
    image: "/projects/portfolio.png",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "Shadcn UI", "i18n"],
    links: [
      { icon: <ExternalLink className="w-3.5 h-3.5" />, type: "Website", href: "/" },
      { icon: <Github className="w-3.5 h-3.5" />, type: "Source", href: "https://github.com/victorfrangov/victorfrangov.com" }
    ]
  },
  {
    slug: "stock-ai-robot",
    image: "/projects/stock.png",
    tags: ["Python", "PyTorch", "Pandas", "NumPy", "MPS", "CUDA", "Matplotlib", "Big Data", "Scikit-Learn"],
    links: [
      { icon: <Github className="w-3.5 h-3.5" />, type: "Source", href: "https://github.com/victorfrangov/stock-robot" }
    ]
  },
  {
    slug: "supervitre",
    href: "https://supervitre.net",
    image: "/projects/supervitre.png",
    tags: ["Next.js", "Typescript", "Firebase", "Google Cloud", "Resend", "Pug", "reCAPTCHA", "SquareSpace", "TailwindCSS", "Shadcn UI", "i18n", "Magic UI"],
    links: [
      { icon: <ExternalLink className="w-3.5 h-3.5" />, type: "Website", href: "https://supervitre.net" },
      { icon: <Github className="w-3.5 h-3.5" />, type: "Source", href: "https://github.com/victorfrangov/superVitre" }
    ]
  },
  {
    slug: "fluidsim",
    image: "/projects/fluid-simulation.gif",
    tags: ["C++", "C", "OpenGL", "ImGui", "SDL3"],
    links: [
      { icon: <Github className="w-3.5 h-3.5" />, type: "Source", href: "https://github.com/victorfrangov/fluid-simulation1" }
    ]
  },
  {
    slug: "pong",
    image: "/projects/pong.gif",
    tags: ["C", "C++", "SDL3"],
    links: [
      { icon: <Github className="w-3.5 h-3.5" />, type: "Source", href: "https://github.com/victorfrangov/pong" }
    ]
  },
  {
    slug: "esp32",
    image: "/projects/esp32.png",
    tags: ["C", "ESP-IDF", "FreeRTOS", "Python", "Low-level", "u8g2"],
    links: [
      { icon: <Github className="w-3.5 h-3.5" />, type: "Source", href: "https://github.com/victorfrangov/esp32-humidity" }
    ]
  }
]

export default function RunningProjectsSection() {
  const t = useTranslations()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const dotRefs = useRef<(HTMLDivElement | null)[]>([])
  dotRefs.current = PROJECTS.map((_, i) => dotRefs.current[i] ?? null)

  const [ready, setReady] = useState(false)
  const [lineTop, setLineTop] = useState<number>(0)
  const [lineHeight, setLineHeight] = useState<number>(0)

  useLayoutEffect(() => {
    const id = requestAnimationFrame(() => {
      setReady(true)
      // compute vertical line start/end using first and last dot centers
      const container = containerRef.current
      const first = dotRefs.current[0]
      const last = dotRefs.current[dotRefs.current.length - 1]
      if (!container || !first || !last) return
      const cRect = container.getBoundingClientRect()
      const fRect = first.getBoundingClientRect()
      const lRect = last.getBoundingClientRect()

      const firstCenterY = fRect.top - cRect.top + fRect.height / 2
      const lastCenterY = lRect.top - cRect.top + lRect.height / 2

      const top = Math.min(firstCenterY, lastCenterY)
      const height = Math.abs(lastCenterY - firstCenterY)

      setLineTop(top)
      setLineHeight(height)
    })
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <section id="projects" className="py-2 sm:py-16">
      <div className="relative -top-30 sm:-top-30">
        <CurvedLoop
          marqueeText={t("running.title")}
          speed={2}
          curveAmount={300}
          direction="left"
          interactive={true}
          className="fill-black dark:fill-white text-9xl sm:text-8xl lg:text-6xl"
        />
      </div>

      <div className="max-w-7xl mx-auto -mt-6 lg:mt-10">
        <p className="mx-auto mt-2 sm:mt-3 mb-10 sm:mb-12 max-w-3xl text-center text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          {t("running.description")}
        </p>

        <div ref={containerRef} className="relative mx-auto max-w-3xl">
          {/* Center line and beams only on lg+ */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-blue-500/60 via-blue-400/25 to-blue-300/10 hidden lg:block"
            style={{ top: `${lineTop}px`, height: `${lineHeight}px` }}
          />

          {/* Mobile/md: stacked centered. lg+: alternating */}
          <div className="flex flex-col gap-10 md:gap-14 lg:gap-16">
            {PROJECTS.map((p, i) => {
              const leftSide = i % 2 === 0
              const title = t(`projects.${p.slug}.title`)
              const dates = t(`projects.${p.slug}.dates`)
              const description = t(`projects.${p.slug}.description`)

              return (
                <div
                  key={p.slug}
                  className={cn(
                    "relative w-full",
                    // Only offset on lg+ (no md offsets)
                    leftSide ? "lg:pr-[60%]" : "lg:pl-[60%]"
                  )}
                >
                  {/* Dot only on lg+ */}
                  <div
                    ref={(el) => {
                      dotRefs.current[i] = el
                    }}
                    className="absolute left-1/2 top-6 -translate-x-1/2 hidden lg:block"
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-500 shadow-[0_0_0_6px_rgba(59,130,246,0.25)]" />
                  </div>

                  <div
                    className={cn(
                      "relative",
                      // Centered card on mobile/md; push left/right on lg
                      "mx-auto max-w-[22rem] md:max-w-[24rem] lg:max-w-[26rem]",
                      leftSide ? "lg:ml-0 lg:mr-auto" : "lg:mr-0 lg:ml-auto"
                    )}
                  >
                    <ProjectCard
                      title={title}
                      href={p.href}
                      description={description}
                      dates={dates}
                      tags={p.tags}
                      image={p.image}
                      links={p.links}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Beams only on lg+ */}
          {ready &&
            dotRefs.current.length > 1 &&
            dotRefs.current.map((_, i) => {
              const from = dotRefs.current[i]
              const to = dotRefs.current[i + 1]
              if (!from || !to) return null
              return (
                <AnimatedBeam
                  key={`beam-${i}`}
                  containerRef={containerRef}
                  fromRef={{ current: from }}
                  toRef={{ current: to }}
                  orientation="vertical"
                  duration={18}
                  pathOpacity={0.22}
                  className="pointer-events-none hidden lg:block"
                />
              )
            })}
        </div>
      </div>
    </section>
  )
}
