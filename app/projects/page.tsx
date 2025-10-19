import Link from "next/link"
import { ArrowLeft, Github } from "lucide-react"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"

export default function ProjectsPage() {
  const projects = [
    {
      title: "Portfolio Website",
      category: "Frontend Development",
      description:
        "Personal portfolio built with Next.js, TypeScript, and Tailwind CSS. Features dark mode, responsive design, and modern animations.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
      status: "Current",
      github: "https://github.com/victorfrangov",
    },
    {
      title: "Automated Deployment Scripts",
      category: "System Administration",
      description:
        "Collection of Bash and PowerShell scripts for automating server deployments and configuration management.",
      technologies: ["Bash", "PowerShell", "Linux", "Git"],
      status: "Past",
      github: "https://github.com/victorfrangov",
    },
    {
      title: "Full-Stack Web Application",
      category: "Full-Stack Development",
      description: "Complete web application with user authentication, database integration, and RESTful API.",
      technologies: ["React", "Node.js", "PostgreSQL", "Express"],
      status: "Past",
      github: "https://github.com/victorfrangov",
    },
    {
      title: "Data Analysis Project",
      category: "Data Analysis",
      description: "Python-based data analysis and visualization project for processing and analyzing large datasets.",
      technologies: ["Python", "Pandas", "NumPy", "Matplotlib"],
      status: "Past",
      github: "https://github.com/victorfrangov",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            VICTOR FRANGOV
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </nav>

      <main className="pt-24 px-4 sm:px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6">
              ALL
              <br />
              PROJECTS
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A collection of my past and current projects showcasing full-stack development, system administration, and
              data analysis work.
            </p>
          </div>

          {/* Current Projects */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Current Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {projects
                .filter((p) => p.status === "Current")
                .map((project, index) => (
                  <div key={index} className="border border-border p-6 hover:border-foreground/20 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">{project.category}</div>
                        <h3 className="text-xl font-bold">{project.title}</h3>
                      </div>
                      <span className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded">{project.status}</span>
                    </div>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm hover:text-muted-foreground"
                      >
                        <Github className="w-4 h-4" />
                        View Code
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Past Projects */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Past Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {projects
                .filter((p) => p.status === "Past")
                .map((project, index) => (
                  <div key={index} className="border border-border p-6 hover:border-foreground/20 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">{project.category}</div>
                        <h3 className="text-xl font-bold">{project.title}</h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm hover:text-muted-foreground"
                      >
                        <Github className="w-4 h-4" />
                        View Code
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 border-t border-border pt-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Interested in collaborating?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
