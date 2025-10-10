import { Moon, Sun, Globe } from 'lucide-react';
import { Language, Theme } from '../types';

interface HeaderProps {
  language: Language;
  theme: Theme;
  onLanguageToggle: () => void;
  onThemeToggle: () => void;
  translations: any;
}

export default function Header({
  language,
  theme,
  onLanguageToggle,
  onThemeToggle,
  translations,
}: HeaderProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection('about')}
            className="text-xl font-bold tracking-tight hover:opacity-70 transition-opacity"
          >
            VF
          </button>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm hover:opacity-70 transition-opacity"
            >
              {translations.nav.about}
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-sm hover:opacity-70 transition-opacity"
            >
              {translations.nav.projects}
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="text-sm hover:opacity-70 transition-opacity"
            >
              {translations.nav.skills}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm hover:opacity-70 transition-opacity"
            >
              {translations.nav.contact}
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onLanguageToggle}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors flex items-center gap-2"
              aria-label="Toggle language"
            >
              <Globe size={18} />
              <span className="text-sm font-medium">
                {language === 'fr' ? 'Français' : 'English'}
              </span>
            </button>

            <button
              onClick={onThemeToggle}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>

        <nav className="md:hidden flex justify-around mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={() => scrollToSection('about')}
            className="text-xs hover:opacity-70 transition-opacity"
          >
            {translations.nav.about}
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="text-xs hover:opacity-70 transition-opacity"
          >
            {translations.nav.projects}
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="text-xs hover:opacity-70 transition-opacity"
          >
            {translations.nav.skills}
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-xs hover:opacity-70 transition-opacity"
          >
            {translations.nav.contact}
          </button>
        </nav>
      </div>
    </header>
  );
}
