import { Translation } from '../types';

export const translations: Record<'fr' | 'en', Translation> = {
  fr: {
    nav: {
      about: 'À Propos',
      projects: 'Projets',
      skills: 'Compétences',
      contact: 'Contact',
    },
    about: {
      greeting: 'Bonjour, je suis',
      title: 'Développeur Full Stack',
      bio: [
        "Passionné par la création d'applications web modernes et performantes, je transforme des idées en solutions numériques élégantes.",
        "Avec une expertise en développement front-end et back-end, je m'efforce de créer des expériences utilisateur exceptionnelles tout en maintenant des standards de code élevés.",
      ],
    },
    projects: {
      title: 'Projets',
      viewGithub: 'Voir sur GitHub',
    },
    skills: {
      title: 'Compétences',
      categories: {
        frontend: 'Frontend',
        backend: 'Backend',
        tools: 'Outils & Technologies',
        languages: 'Langages',
      },
    },
    contact: {
      title: 'Contact',
      subtitle: 'Discutons de votre prochain projet',
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
    },
  },
  en: {
    nav: {
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
    },
    about: {
      greeting: 'Hello, I am',
      title: 'Full Stack Developer',
      bio: [
        'Passionate about creating modern and performant web applications, I transform ideas into elegant digital solutions.',
        'With expertise in both front-end and back-end development, I strive to create exceptional user experiences while maintaining high code standards.',
      ],
    },
    projects: {
      title: 'Projects',
      viewGithub: 'View on GitHub',
    },
    skills: {
      title: 'Skills',
      categories: {
        frontend: 'Frontend',
        backend: 'Backend',
        tools: 'Tools & Technologies',
        languages: 'Languages',
      },
    },
    contact: {
      title: 'Contact',
      subtitle: "Let's discuss your next project",
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
    },
  },
};
