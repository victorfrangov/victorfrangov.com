import { Translation } from '../types';

interface AboutProps {
  translations: Translation;
}

export default function About({ translations }: AboutProps) {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 py-24"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-widest opacity-60">
              {translations.about.greeting}
            </p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Victor Frangov
            </h1>
            <p className="text-2xl md:text-3xl opacity-70">
              {translations.about.title}
            </p>
          </div>

          <div className="space-y-4 text-lg md:text-xl opacity-80 leading-relaxed">
            {translations.about.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
