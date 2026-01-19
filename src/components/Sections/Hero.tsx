import React, { useState, useEffect } from 'react';
import { SectionId } from '../../types';
import { PROFILE } from '../../constants';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id={SectionId.HERO} 
      className="min-h-screen flex items-center justify-center relative pt-20 pb-10 overflow-hidden bg-background"
    >
      {/* Subtle Background Pattern with Parallax */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#525252 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Typography Side */}
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-border rounded-full bg-surface/50 backdrop-blur-sm shadow-sm animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-mono font-medium text-secondary uppercase tracking-wider">
                Based in {PROFILE.location.split(',')[0]}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter mb-6 animate-slide-up text-white leading-[1.1]">
              Munawir <br />
              <span className="text-gray-500">Fikri</span> <span className="text-white">Al-Akbari</span>
            </h1>
            
            <p className="text-lg md:text-xl text-secondary max-w-lg mb-8 leading-relaxed animate-slide-up mx-auto md:mx-0" style={{animationDelay: '0.1s'}}>
              {PROFILE.tagline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-slide-up" style={{animationDelay: '0.2s'}}>
              <a 
                href={`#${SectionId.PROJECTS}`}
                className="group px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-all hover:-translate-y-1 shadow-lg hover:shadow-white/10 flex items-center justify-center gap-2"
              >
                View Latest Work
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a 
                href={`#${SectionId.CONTACT}`}
                className="px-8 py-4 border border-border bg-transparent hover:bg-surfaceHighlight text-white font-medium rounded-lg transition-all hover:border-white flex items-center justify-center"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Image Side - Near Typography with Parallax */}
          <div 
            className="flex-1 order-1 md:order-2 flex justify-center md:justify-end animate-fade-in"
            style={{ transform: `translateY(${scrollY * 0.12}px)` }}
          >
            <div className="relative w-72 h-72 md:w-[450px] md:h-[550px] group">
              {/* Abstract Shape Background */}
              <div className="absolute inset-0 bg-surfaceHighlight rounded-[2rem] transform rotate-6 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105 border border-border/50"></div>
              <div className="absolute inset-0 bg-white/5 rounded-[2rem] transform -rotate-3 transition-transform duration-500 group-hover:-rotate-1"></div>
              
              {/* Main Image */}
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] shadow-2xl border border-border bg-surfaceHighlight">
                <img 
                  src="/munawirfikri-1.jpg" 
                  alt={PROFILE.name}
                  className="w-full h-full object-cover filter grayscale contrast-110 brightness-90 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105"
                />
                
                {/* Overlay Texture */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-8 -left-8 md:bottom-8 md:-left-12 bg-surfaceHighlight p-6 rounded-2xl shadow-xl border border-border max-w-[200px] hidden md:block animate-bounce" style={{animationDuration: '4s'}}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white text-black rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary">Expertise</span>
                </div>
                <p className="font-bold text-white leading-tight">Backend & Scalable Systems</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;