import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-32 px-4 sm:px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-8 lg:gap-16">
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-none">
            WHAT PEOPLE
            <br />
            SAY
          </h2>
          <div className="max-w-md lg:text-right">
            <p className="text-gray-400 mb-8 text-lg">
              Collaborating effectively in teams and taking projects from concept to completion. Here's what colleagues
              and collaborators have to say about working together.
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 border border-white px-4 sm:px-6 py-2 sm:py-3 hover:bg-white hover:text-black transition-colors rounded-full"
            >
              Let's discuss <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {[
            {
              image: "/professional-developer-portrait.png",
              quote:
                "Victor's ability to learn quickly and adapt to new technologies is impressive. His structured approach to problem-solving makes him a valuable team member on any project.",
              name: "Colleague",
              role: "Software Engineer",
            },
            {
              image: "/professional-team-member.png",
              quote:
                "Working with Victor on full-stack projects has been great. He brings both technical expertise and a collaborative mindset that helps the entire team succeed.",
              name: "Team Member",
              role: "Project Lead",
            },
          ].map((testimonial, index) => (
            <div key={index} className="space-y-6">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt="Testimonial portrait"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <blockquote className="text-lg sm:text-xl text-gray-300">{testimonial.quote}</blockquote>
                <div>
                  <div className="text-xl font-semibold">{testimonial.name}</div>
                  <div className="text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
