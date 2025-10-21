import Link from "next/link"
import { ArrowRight, ExternalLink, Github } from "lucide-react"
import { getTranslations } from "next-intl/server"

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  topics: string[]
  language: string | null
  stargazers_count: number
  updated_at: string
}

async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch("https://api.github.com/users/victorfrangov/repos?sort=updated&per_page=8", {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      throw new Error("Failed to fetch repositories")
    }

    const repos: GitHubRepo[] = await response.json()
    return repos.filter((repo) => !repo.name.includes("victorfrangov")) // Filter out profile repo
  } catch (error) {
    console.error("Error fetching GitHub repos:", error)
    return []
  }
}

export default async function RunningProjectsSection() {
  const t = await getTranslations()

  const repos = await getGitHubRepos()

  return (
    <section id="running-project" className="py-16 sm:py-32 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-8 lg:gap-16">
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-none">
            {t("running.title.line1")}
            <br />
            {t("running.title.line2")}
          </h2>
          <div className="max-w-md lg:text-right">
            <p className="text-muted-foreground mb-8 text-lg">
              {t("running.description")}
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 border border-border px-4 sm:px-6 py-2 sm:py-3 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {t("running.cta")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.length > 0 ? (
            repos.map((repo) => (
              <div
                key={repo.id}
                className="border border-border rounded-lg p-6 hover:bg-accent/50 transition-colors group"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold group-hover:text-accent-foreground">{repo.name}</h3>
                  <Link
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Github className="w-5 h-5" />
                  </Link>
                </div>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {repo.description || t("running.repo.noDescription")}
                </p>
                <div className="flex items-center justify-between">
                  {repo.language && (
                    <span className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground">{repo.language}</span>
                  )}
                  {repo.homepage && (
                    <Link
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs flex items-center gap-1 hover:text-accent-foreground"
                    >
                      {t("running.repo.live")} <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Github className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">{t("running.empty.message")}</p>
              <Link
                href="https://github.com/victorfrangov"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm hover:text-accent-foreground"
              >
                {t("running.empty.visitGithub")} <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
