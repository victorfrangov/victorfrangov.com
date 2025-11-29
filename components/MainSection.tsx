"use client"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { AnimatedGradientText } from "./ui/animated-gradient-text"
import { cn } from "@/lib/utils"
import { Highlighter } from "./ui/highlighter"
import { Particles } from "./ui/particles"
import { Meteors } from "./ui/meteors"

export default function MainSection() {
  const t = useTranslations()
  return (
    <section id="main" className="relative isolate px-4 sm:px-6 pt-24 sm:pt-32 mt-24 sm:mt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -bottom-32 sm:-bottom-48 z-0"
      >
        <Particles className="w-full h-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-16 sm:mb-32">
          <div className="flex items-end justify-between gap-6">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold leading-none tracking-tight md:whitespace-nowrap">
              {t("main.hero.title.line1")}{" "}
              <Highlighter iterations={2} color="#0066FF" animationDuration={800}>
                <span className="font-serif italic font-normal">
                  {t("main.hero.title.emphasis")}
                </span>
              </Highlighter>
              <br /> {t("main.hero.title.line2")}
            </h1>
            <div className="shrink-0">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-border bg-muted">
                <Image
                  src="/headshot.jpg"
                  alt={t("main.hero.headshotAlt")}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 8rem, 6rem"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 flex flex-col items-center text-center gap-6">
            <p className="pt-28 sm:pt-28 max-w-7xl text-2xl sm:text-3xl md:text-4xl leading-relaxed md:leading-snug text-muted-foreground">
              {t("main.hero.subtitle.line1")}{" "}
              <Highlighter action="underline" color="#0033FF" animationDuration={800}>
                {t("main.hero.subtitle.line2")}
              </Highlighter>{" "}
              {t("main.hero.subtitle.line3")}
            </p>
            <Link
              href="#contact"
              className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-2 shadow-[inset_0_-8px_10px_#4d5bff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#4d5bff3f] border border-border"
            >
              <span
                className={cn(
                  "animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#3b82f6]/50 via-[#6366f1]/50 to-[#8b5cf6]/50 bg-[length:300%_100%] p-[1px]"
                )}
                style={{
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "destination-out",
                  mask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "subtract",
                  WebkitClipPath: "padding-box"
                }}
              />
              <span className="mr-2">🎉</span>
              <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
              <AnimatedGradientText className="text-sm sm:text-base font-medium">
                {t("main.hero.cta")}
              </AnimatedGradientText>
              <ChevronRight className="ml-1 h-4 w-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
