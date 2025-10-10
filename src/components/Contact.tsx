import { Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { Translation } from '../types';

interface ContactProps {
  translations: Translation;
}

export default function Contact({ translations }: ContactProps) {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center px-6 py-24 bg-gray-50 dark:bg-gray-950"
    >
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          {translations.contact.title}
        </h2>
        <p className="text-xl opacity-70 mb-16">
          {translations.contact.subtitle}
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <a
            href="mailto:victor.frangov@example.com"
            className="group p-8 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-lg transition-all hover:scale-105"
          >
            <Mail className="mx-auto mb-4" size={32} />
            <h3 className="font-bold mb-2">{translations.contact.email}</h3>
            <p className="text-sm opacity-60 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              victor.frangov@example.com
              <ExternalLink size={14} />
            </p>
          </a>

          <a
            href="https://github.com/victorfrangov"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-8 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-lg transition-all hover:scale-105"
          >
            <Github className="mx-auto mb-4" size={32} />
            <h3 className="font-bold mb-2">{translations.contact.github}</h3>
            <p className="text-sm opacity-60 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              victorfrangov
              <ExternalLink size={14} />
            </p>
          </a>

          <a
            href="https://www.linkedin.com/in/victor-frangov-4b974a147/"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-8 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-lg transition-all hover:scale-105"
          >
            <Linkedin className="mx-auto mb-4" size={32} />
            <h3 className="font-bold mb-2">{translations.contact.linkedin}</h3>
            <p className="text-sm opacity-60 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              Victor Frangov
              <ExternalLink size={14} />
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
