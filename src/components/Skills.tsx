import { Translation } from '../types';

interface SkillsProps {
  translations: Translation;
}

const skillsData = {
  frontend: [
    'React',
    'TypeScript',
    'JavaScript',
    'HTML5',
    'CSS3',
    'Tailwind CSS',
    'Vite',
  ],
  backend: [
    'Node.js',
    'Python',
    'PostgreSQL',
    'REST APIs',
    'Supabase',
  ],
  tools: [
    'Git',
    'GitHub',
    'VS Code',
    'npm',
    'Linux',
  ],
  languages: [
    'JavaScript',
    'TypeScript',
    'Python',
    'SQL',
    'HTML/CSS',
  ],
};

export default function Skills({ translations }: SkillsProps) {
  return (
    <section
      id="skills"
      className="min-h-screen flex items-center justify-center px-6 py-24"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          {translations.skills.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-6 opacity-60">
              {translations.skills.categories.frontend}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skillsData.frontend.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 opacity-60">
              {translations.skills.categories.backend}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skillsData.backend.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 opacity-60">
              {translations.skills.categories.tools}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skillsData.tools.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 opacity-60">
              {translations.skills.categories.languages}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skillsData.languages.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
