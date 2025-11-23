"use client"

export default function AboutMeSection() {
  return (
    <section
      id="about-me"
      className="relative px-4 sm:px-6 pt-24 pb-24 sm:pt-32 sm:pb-32 overflow-hidden"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0"/>
      <div className="max-w-6xl mx-auto relative">
        <span className="uppercase tracking-widest text-xs sm:text-sm text-muted-foreground mb-8 inline-block">
          ABOUT ME
        </span>
        <h2 className="font-bold leading-tight text-4xl sm:text-6xl md:text-7xl space-y-4">
          <div>
            I&apos;m a passionate{" "}
            <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:w-full after:bg-blue-500">
              full–stack
            </span>{" "}
            developer
          </div>
          <div>
            committed to building{" "}
            <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:w-full after:bg-blue-500">
              innovative
            </span>{" "}
            and{" "}
            <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:w-full after:bg-blue-500">
              creative
            </span>{" "}
            websites
          </div>
        </h2>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-8 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-semibold text-blue-500">5</p>
            <p className="mt-2 text-xs sm:text-sm tracking-wide">
              YEARS OF EXPERIENCE
            </p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-semibold text-blue-500">10+</p>
            <p className="mt-2 text-xs sm:text-sm tracking-wide">
              PROJECTS COMPLETED
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}