import React from 'react';
import { SectionId } from '../../types';
import { useData } from '../../contexts/DataContext';

const About: React.FC = () => {
  const { profile, skills } = useData();

  if (!profile) return null;

  return (
    <section id={SectionId.ABOUT} className="py-24 bg-surface relative overflow-hidden scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6 order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">About Me</h2>
            <div className="text-secondary text-lg leading-relaxed whitespace-pre-line">
              {profile.about}
            </div>
            
            <div className="pt-8">
              <h3 className="text-xl font-semibold mb-4 text-primary">Core Competencies</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span 
                    key={skill.name} 
                    className="px-3 py-1 bg-surfaceHighlight border border-border rounded-full text-sm text-secondary hover:border-secondary hover:text-primary transition-colors"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative order-1 md:order-2">
            {/* Image Container */}
            <div className="aspect-[3/4] md:aspect-square rounded-2xl overflow-hidden bg-surfaceHighlight border border-border relative group shadow-2xl transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
              <img 
                src="/profile.jpg" 
                alt={profile.name} 
                className="object-cover object-top w-full h-full transition-transform duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0"
              />
              
              {/* Overlay Gradient (Keep text white here as it is on top of image) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90"></div>
              
              {/* Floating Text */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                 <p className="font-mono text-xs opacity-80 uppercase tracking-widest mb-2 border-l-2 border-white pl-3">{profile.title}</p>
                 <p className="text-2xl font-bold leading-tight">{profile.name}</p>
              </div>
            </div>
            
            {/* Modern Decoration Background */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10"></div>
            
            {/* Pattern Dots */}
            <div className="absolute -z-10 -right-4 top-10 opacity-20" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px', width: '100px', height: '100px', color: 'rgba(var(--color-primary), 1)' }}></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;