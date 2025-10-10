export type Language = 'fr' | 'en';
export type Theme = 'light' | 'dark';

export interface Translation {
  nav: {
    about: string;
    projects: string;
    skills: string;
    contact: string;
  };
  about: {
    greeting: string;
    title: string;
    bio: string[];
  };
  projects: {
    title: string;
    viewGithub: string;
  };
  skills: {
    title: string;
    categories: {
      frontend: string;
      backend: string;
      tools: string;
      languages: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    github: string;
    linkedin: string;
  };
}
