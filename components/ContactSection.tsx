import Link from "next/link"
import { Mail, MapPin, Github, Linkedin } from "lucide-react"

export default function ContactSection() {
  return (
    <section id="contact" className="max-w-7xl mx-auto mt-16 sm:mt-32 px-4 sm:px-6">
      <div className="mb-16 sm:mb-32">
        <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-12">
          LET'S
          <br />
          CONNECT
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Victor Frangov</h3>
              <p className="text-muted-foreground mb-6">
                Computer Science student at EPFL with a passion for technology and problem-solving. Originally from
                Montréal, Canada, currently studying in Switzerland. I'm always interested in collaborating on
                innovative projects and learning new technologies.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 text-muted-foreground" />
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-muted-foreground">Lausanne, Switzerland</div>
                  <div className="text-sm text-muted-foreground">Originally from Montréal, Canada</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-1 text-muted-foreground" />
                <div>
                  <div className="font-medium">Get in Touch</div>
                  <div className="text-muted-foreground">Available for collaboration and opportunities</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Link
                href="https://github.com/victorfrangov"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border px-6 py-3 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </Link>
              <Link
                href="https://www.linkedin.com/in/victor-frangov-4b974a147/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border px-6 py-3 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold">Technical Skills</h3>
            <div className="space-y-4">
              <div>
                <div className="font-medium mb-2">Frontend</div>
                <div className="text-sm text-muted-foreground">
                  React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS
                </div>
              </div>
              <div>
                <div className="font-medium mb-2">Backend</div>
                <div className="text-sm text-muted-foreground">Node.js, Python, PostgreSQL, Supabase, REST APIs</div>
              </div>
              <div>
                <div className="font-medium mb-2">Tools & DevOps</div>
                <div className="text-sm text-muted-foreground">Git, GitHub, VS Code, Bash, PowerShell, Linux</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 sm:mt-32 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">Navigation</div>
          {[
            { name: "Work", href: "#featured-work" },
            { name: "Projects", href: "/projects" },
            { name: "Contact", href: "#contact" },
          ].map((item) => (
            <Link key={item.name} href={item.href} className="block hover:text-muted-foreground">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">Expertise</div>
          {["Frontend Dev", "Backend Dev", "System Admin", "Data Analysis"].map((item) => (
            <div key={item} className="block">
              {item}
            </div>
          ))}
        </div>
        <div className="space-y-4 md:col-span-2">
          <div className="text-sm text-muted-foreground">Connect</div>
          <div className="flex gap-4">
            {[
              { name: "LinkedIn", url: "https://www.linkedin.com/in/victor-frangov-4b974a147/" },
              { name: "GitHub", url: "https://github.com/victorfrangov" },
              { name: "Website", url: "https://victorfrangov.com" },
            ].map((social) => (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-muted-foreground"
              >
                {social.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mt-16 flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-border">
        <div className="text-sm text-muted-foreground mb-4 sm:mb-0">© 2025 Victor Frangov. All rights reserved.</div>
        <div className="flex gap-4 text-sm">
          <Link href="#" className="hover:text-muted-foreground">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-muted-foreground">
            Terms of Service
          </Link>
        </div>
      </div>
    </section>
  )
}
