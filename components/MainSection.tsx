import Link from "next/link"
import { ArrowRight, User } from "lucide-react"

export default function MainSection() {
  return (
    <section id="main" className="pt-24 sm:pt-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16 sm:mb-32">
          <div className="text-sm mb-4">(BONJOUR, I'M VICTOR FRANGOV)</div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 sm:mb-8">
            FULL STACK <span className="font-serif italic font-normal">developer</span>
            <br className="hidden sm:block" /> & STUDENT
          </h1>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-0">
            <p className="max-w-md text-muted-foreground">
              Computer Science student at EPFL passionate about creating modern and performant web applications.
              Transforming ideas into elegant digital solutions with expertise in full-stack development.
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 border border-border px-4 sm:px-6 py-2 sm:py-3 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Let's collaborate <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-16 sm:mb-32">
          <p className="max-w-md mb-8 sm:mb-16 text-muted-foreground">
            Currently studying Computer Science at EPFL in Switzerland, I bring passion and technical expertise to every
            project. From automated deployment scripts to full-stack web applications, I create efficient and scalable
            solutions.
          </p>
        </div>

        <div className="aspect-square sm:aspect-[4/3] max-w-md mx-auto relative bg-muted mb-16 sm:mb-32 border border-border flex items-center justify-center">
          <div className="text-center">
            <User className="w-24 h-24 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">Add your headshot here</p>
          </div>
        </div>
      </div>
    </section>
  )
}
