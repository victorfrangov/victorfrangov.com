"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

interface Props {
  index: string
  title: string
  description: string
  dates: string
  tags: readonly string[]
  image?: string
  customComponent?: React.ReactNode
  links?: readonly {
    icon?: React.ReactNode
    type: string
    href: string
  }[]
}

export default function ProjectCard({
  index,
  title,
  description,
  dates,
  tags,
  image,
  customComponent,
  links,
}: Props) {
  const isVideo =
    !!image &&
    (image.toLowerCase().endsWith(".webm") ||
      image.toLowerCase().endsWith(".mp4"))

  return (
    <article className="group flex flex-col justify-between border border-foreground/15 rounded-none bg-background hover:border-foreground/40 transition-all duration-300">
      {/* Media Canvas */}
      {(customComponent || image) && (
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-foreground/[0.03] border-b border-foreground/10 flex items-center justify-center">
          {image && (
            isVideo ? (
              <video
                src={image}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
              />
            ) : (
              <Image
                src={image}
                alt={title}
                width={1000}
                height={600}
                className={`w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out ${
                  customComponent ? "opacity-75" : "p-4"
                }`}
                priority={false}
              />
            )
          )}
          {customComponent && (
            <div className="absolute inset-0 z-10">
              {customComponent}
            </div>
          )}
          {/* Index Pill Overlay */}
          <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-foreground/20 text-[11px] font-mono tracking-wider z-20 pointer-events-none">
            {index}
          </div>
        </div>
      )}

      {/* Info & Meta */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:underline underline-offset-4">
              {title}
            </h3>
            <span className="text-xs font-mono text-foreground/50 shrink-0">
              {dates}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed font-normal">
            {description}
          </p>
        </div>

        {/* Tags & Action Capsules */}
        <div className="pt-4 border-t border-foreground/10 space-y-3">
          {/* Tech tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full border border-foreground/15 text-[10px] font-mono text-foreground/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Locomotive Connected Action Pills */}
          {links && links.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {links.map((link, idx) => (
                <Link
                  href={link.href}
                  key={idx}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-foreground/40 text-xs font-mono uppercase tracking-tight hover:bg-foreground hover:text-background transition-all duration-200"
                >
                  <span>{link.type}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}