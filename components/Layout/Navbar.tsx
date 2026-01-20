
import React, { useState, useEffect } from 'react';
import { SectionId, Language } from '../../types';
import { useData } from '../../contexts/DataContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const { language, setLanguage, t } = useData();
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navLinks = [
    { label: t('nav_about'), href: `#${SectionId.ABOUT}` },
    { label: t('nav_experience'), href: `#${SectionId.EXPERIENCE}` },
    { label: t('nav_education'), href: `#${SectionId.EDUCATION}` },
    { label: t('nav_projects'), href: `#${SectionId.PROJECTS}` },
    { label: t('nav_contact'), href: `#${SectionId.CONTACT}` },
  ];

  const languages: {code: Language, label: string, flag: string}[] = [
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'id', label: 'ID', flag: '🇮🇩' },
    { code: 'ms', label: 'MS', flag: '🇲🇾' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-border py-4' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-xl font-bold tracking-tighter hover:text-secondary transition-colors font-mono text-primary">
          mun.my.id
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              className="text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          
          <div className="w-px h-6 bg-border mx-2"></div>

          {/* Language Switcher */}
          <div className="relative">
            <button 
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              <span>{languages.find(l => l.code === language)?.flag}</span>
              <span className="uppercase">{language}</span>
              <svg className={`w-3 h-3 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            
            {langMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-24 bg-surfaceHighlight border border-border rounded-lg shadow-xl py-1 animate-fade-in">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-background flex items-center gap-2 ${language === lang.code ? 'text-primary font-bold' : 'text-secondary'}`}
                  >
                    <span>{lang.flag}</span>
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-secondary hover:text-primary hover:bg-surfaceHighlight transition-all"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <a 
             href={`#${SectionId.CONTACT}`}
             className="px-4 py-2 bg-accent text-btnText text-sm font-semibold rounded hover:opacity-90 transition-opacity"
          >
            {t('nav_talk')}
          </a>
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-4">
             {/* Mobile Lang Toggle */}
            <button 
              onClick={() => {
                 const nextLang = language === 'en' ? 'id' : language === 'id' ? 'ms' : 'en';
                 setLanguage(nextLang);
              }}
              className="text-sm font-bold text-secondary uppercase border border-border px-2 py-1 rounded hover:bg-surfaceHighlight"
            >
              {language}
            </button>

            {/* Mobile Theme Toggle */}
            <button 
                onClick={toggleTheme}
                className="p-2 text-secondary hover:text-primary"
                aria-label="Toggle Theme"
            >
                {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                )}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
                className="text-primary hover:text-secondary"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
                </svg>
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-surfaceHighlight border-b border-border p-6 flex flex-col gap-4 animate-fade-in shadow-xl">
           {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              className="text-lg font-medium text-secondary hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a 
             href={`#${SectionId.CONTACT}`}
             className="text-lg font-medium text-accent hover:opacity-80 mt-2"
             onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('nav_talk')}
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
