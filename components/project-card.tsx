"use client"

import React, { useEffect, useRef } from "react"
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
  const videoRef = useRef<HTMLVideoElement>(null)
  const isVideo =
    !!image &&
    (image.toLowerCase().endsWith(".webm") ||
      image.toLowerCase().endsWith(".mp4"))

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.05 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <article className="group relative w-full h-[50vh] sm:h-[52vh] md:h-[50vh] min-h-[400px] overflow-hidden border-b md:border-r border-foreground/20 bg-background select-none">
      {/* 1. Default Visual Canvas (Image / Video + 3D Model with pointer-events-none) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-foreground/[0.02] flex items-center justify-center">
        {image &&
          (isVideo ? (
            <video
              ref={videoRef}
              src={image}
              muted
              loop
              playsInline
              preload="none"
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
          ) : (
            <Image
              src={image}
              alt={title}
              width={1200}
              height={800}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out ${
                customComponent ? "opacity-70" : ""
              }`}
              priority={false}
            />
          ))}

        {/* 3D Model: Pointer events disabled so mouse passes directly through */}
        {customComponent && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            {customComponent}
          </div>
        )}
      </div>

      {/* 2. Hover State: Color Flip & Full Information Overlay */}
      <div className="absolute inset-0 z-30 bg-foreground text-background p-6 sm:p-8 md:p-10 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none group-hover:pointer-events-auto">
        {/* Top: Index & Dates */}
        <div className="flex items-center justify-between font-mono text-xs text-background/60 uppercase tracking-widest">
          <span className="font-bold">{index}</span>
          <span>{dates}</span>
        </div>

        {/* Middle: Big Title & Description */}
        <div className="space-y-3 my-auto">
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none text-background">
            {title}
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-background/80 leading-relaxed font-normal max-w-xl">
            {description}
          </p>

          {/* Tech Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full border border-background/25 text-[10px] sm:text-xs font-mono text-background/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom: Action Links (Pills that invert on hover) */}
        {links && links.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-background/20">
            {links.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-background bg-background text-foreground hover:bg-transparent hover:text-background text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 shadow-sm"
              >
                <span>{link.type}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}