import React, { useState, useEffect } from 'react';
import { SectionId } from '../../types';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: `#${SectionId.ABOUT}` },
    { label: 'Experience', href: `#${SectionId.EXPERIENCE}` },
    { label: 'Projects', href: `#${SectionId.PROJECTS}` },
    { label: 'Contact', href: `#${SectionId.CONTACT}` },
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
        <a href="#" className="text-xl font-bold tracking-tighter hover:text-white transition-colors font-mono text-primary">
          mun.my.id
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="text-sm font-medium text-secondary hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a 
             href={`#${SectionId.CONTACT}`}
             className="px-4 py-2 bg-white text-black text-sm font-semibold rounded hover:bg-gray-200 transition-colors"
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-primary hover:text-white"
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-surfaceHighlight border-b border-border p-6 flex flex-col gap-4 animate-fade-in shadow-xl">
           {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              className="text-lg font-medium text-secondary hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;