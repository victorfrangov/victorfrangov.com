import { ExternalLink, Github } from 'lucide-react';
import { Translation } from '../types';

interface ProjectsProps {
  translations: Translation;
}

const projects = [
  {
    title: 'Portfolio Website',
    description: {
      fr: 'Site portfolio personnel avec support multilingue et mode sombre',
      en: 'Personal portfolio website with multilingual support and dark mode',
    },
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'GitHub Projects',
    description: {
      fr: 'Explorez mes projets open source et contributions',
      en: 'Explore my open source projects and contributions',
    },
    tech: ['Various Technologies'],
  },
];

export default function Projects({ translations }: ProjectsProps) {
  const lang = translations.about.greeting.includes('Bonjour') ? 'fr' : 'en';

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center px-6 py-24 bg-gray-50 dark:bg-gray-950"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          {translations.projects.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-8 rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
              <p className="opacity-70 mb-6">{project.description[lang]}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-900 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://github.com/victorfrangov"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition-opacity"
          >
            <Github size={20} />
            {translations.projects.viewGithub}
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
