import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function FeaturedWorkSection() {
  return (
    <section id="featured-work" className="px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 sm:mb-32">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-8 sm:mb-16 gap-6 sm:gap-0">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold">
              FEATURED
              <br />
              WORK
            </h2>
            <div className="max-w-md">
              <p className="text-muted-foreground mb-4">
                From automated deployment scripts to full-stack web applications and data analysis projects, my
                portfolio showcases a blend of technical expertise and problem-solving skills.
              </p>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 border border-border px-4 sm:px-6 py-2 sm:py-3 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Let's create <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {[
            {
              title: "FRONTEND DEVELOPMENT",
              number: "01",
              description: "Building modern, responsive interfaces with React, TypeScript, and Tailwind CSS",
            },
            {
              title: "BACKEND DEVELOPMENT",
              number: "02",
              description: "Creating robust APIs and server solutions with Node.js, Python, and PostgreSQL",
            },
            {
              title: "SYSTEM ADMINISTRATION",
              number: "03",
              description: "Automating deployments with Bash & PowerShell, managing server setups",
            },
            {
              title: "DATA ANALYSIS",
              number: "04",
              description: "Processing and analyzing data with Python, pandas, and visualization libraries",
            },
          ].map((category, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-8 sm:py-12 border-t border-border"
            >
              <div className="space-y-4 mb-4 sm:mb-0">
                <div className="flex items-baseline gap-4">
                  <h3 className="text-2xl sm:text-4xl font-bold">{category.title}</h3>
                  <span className="text-sm text-muted-foreground">({category.number})</span>
                </div>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Our Service Expertise */}
        <div className="mb-16 sm:mb-32">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-8 sm:mb-16 gap-6 sm:gap-0">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold">
              MY TECHNICAL
              <br />
              EXPERTISE
            </h2>
            <div className="max-w-md">
              <p className="text-muted-foreground mb-4">
                Leveraging modern technologies and frameworks to deliver efficient, scalable solutions. Quick learner
                with a structured approach to problem-solving.
              </p>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 border border-border px-4 sm:px-6 py-2 sm:py-3 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Start a project <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
            {[
              {
                number: "01",
                title: "FRONTEND",
                descriptions: [
                  "React, TypeScript, JavaScript for modern web interfaces.",
                  "HTML5, CSS3, Tailwind CSS for responsive design.",
                ],
              },
              {
                number: "02",
                title: "BACKEND",
                descriptions: [
                  "Node.js and Python for server-side development.",
                  "PostgreSQL, Supabase, REST APIs for data management.",
                ],
              },
              {
                number: "03",
                title: "TOOLS & DEVOPS",
                descriptions: [
                  "Git, GitHub, VS Code for version control and development.",
                  "Bash, PowerShell, Linux for automation and system administration.",
                ],
              },
            ].map((service, index) => (
              <div key={index} className="space-y-4">
                <span className="text-sm text-muted-foreground">({service.number})</span>
                <h3 className="text-2xl font-bold">{service.title}</h3>
                {service.descriptions.map((desc, i) => (
                  <p key={i} className="text-muted-foreground text-sm">
                    {desc}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
