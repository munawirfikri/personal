import React from 'react';
import { SOCIALS, PROFILE } from '../constants';
import { SectionId } from '../types';

const Footer: React.FC = () => {
  return (
    <footer id={SectionId.CONTACT} className="py-12 border-t border-border bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold font-mono mb-2 text-white">{PROFILE.name}</h4>
            <a href={`mailto:${PROFILE.email}`} className="text-secondary hover:text-white transition-colors">
              {PROFILE.email}
            </a>
          </div>

          <div className="flex gap-6">
            {SOCIALS.map(social => (
              <a 
                key={social.platform} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-secondary hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
                aria-label={social.platform}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                   <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Munawir Fikri. All rights reserved.</p>
          <p className="mt-2 text-xs">Built with React, Tailwind, and Gemini AI.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;