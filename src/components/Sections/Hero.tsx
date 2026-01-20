import React, { useState, useEffect } from 'react';
import { SectionId } from '../../types';
import { useData } from '../../contexts/DataContext';

const Hero: React.FC = () => {
  const { profile } = useData();
  const [scrollY, setScrollY] = useState(0);
  
  // Typewriter State
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [delta, setDelta] = useState(100);
  const [greetings, setGreetings] = useState<string[]>([]);

  // Guard clause: If profile context isn't ready, don't render
  if (!profile) return <div className="min-h-screen bg-background"></div>;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Set greetings based on time of day
    const hour = new Date().getHours();
    let id = "Halo";
    let my = "Hai";
    let en = "Hello";

    if (hour >= 5 && hour < 12) {
      id = "Selamat Pagi"; my = "Selamat Pagi"; en = "Good Morning";
    } else if (hour >= 12 && hour < 15) {
      id = "Selamat Siang"; my = "Selamat Tengahari"; en = "Good Afternoon";
    } else if (hour >= 15 && hour < 18) {
      id = "Selamat Sore"; my = "Selamat Petang"; en = "Good Afternoon";
    } else {
      id = "Selamat Malam"; my = "Selamat Malam"; en = "Good Evening";
    }

    // Safe access to name parts
    const fullName = profile.name || "Munawir Fikri";
    const nameParts = fullName.split(' ');
    const lastName = nameParts.length > 1 ? nameParts[1] : nameParts[0];

    setGreetings([
      `${id}, Saya ${lastName}.`,
      `${my}, Saye ${lastName}.`, 
      `${en}, I'm ${lastName}.`
    ]);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [profile.name]);

  // Typewriter Effect Logic
  useEffect(() => {
    if (greetings.length === 0) return;

    const tick = () => {
      let i = loopNum % greetings.length;
      let fullText = greetings[i];
      let updatedText = isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (isDeleting) {
        setDelta(50); // Faster deleting
      } else {
        setDelta(100); // Normal typing
      }

      if (!isDeleting && updatedText === fullText) {
        setDelta(2000); // Wait before deleting
        setIsDeleting(true);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setDelta(500); // Wait before typing next
      }
    };

    let ticker = setTimeout(tick, delta);
    return () => clearTimeout(ticker);
  }, [text, delta, isDeleting, loopNum, greetings]);

  // Derived state for display
  const fullName = profile.name || "Munawir Fikri";
  const parts = fullName.split(' ');
  const firstName = parts[0];
  const lastNameRest = parts.slice(1).join(' ');
  const locationDisplay = profile.location ? profile.location.split(',')[0] : 'Indonesia';

  return (
    <section 
      id={SectionId.HERO} 
      className="min-h-screen flex items-center justify-center relative pt-20 pb-10 overflow-hidden bg-background"
    >
      {/* Subtle Background Pattern with Parallax */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          color: 'rgba(var(--color-primary), 0.5)',
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
                Based in {locationDisplay}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter mb-6 animate-slide-up text-primary leading-[1.1]">
              {firstName} <br />
              <span className="text-secondary/60">{lastNameRest}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-secondary max-w-lg mb-8 leading-relaxed animate-slide-up mx-auto md:mx-0" style={{animationDelay: '0.1s'}}>
              {profile.tagline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-slide-up" style={{animationDelay: '0.2s'}}>
              <a 
                href={`#${SectionId.PROJECTS}`}
                className="group px-8 py-4 bg-primary text-background font-medium rounded-lg hover:opacity-90 transition-all hover:-translate-y-1 shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2"
              >
                View Latest Work
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a 
                href={`#${SectionId.CONTACT}`}
                className="px-8 py-4 border border-border bg-transparent hover:bg-surfaceHighlight text-primary font-medium rounded-lg transition-all hover:border-primary flex items-center justify-center"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Image Side - Near Typography with Parallax */}
          <div 
            className="flex-1 order-1 md:order-2 flex flex-col items-center md:items-end animate-fade-in"
            style={{ transform: `translateY(${scrollY * 0.12}px)` }}
          >
            {/* Image Wrapper */}
            <div className="relative w-72 h-72 md:w-[450px] md:h-[550px] group">
              {/* Abstract Shape Background */}
              <div className="absolute inset-0 bg-surfaceHighlight rounded-[2rem] transform rotate-6 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105 border border-border/50"></div>
              <div className="absolute inset-0 bg-primary/5 rounded-[2rem] transform -rotate-3 transition-transform duration-500 group-hover:-rotate-1"></div>
              
              {/* Main Image */}
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] shadow-2xl border border-border bg-surfaceHighlight">
                <img 
                  src="/img/munawirfikri-1.jpg" 
                  alt={fullName}
                  className="w-full h-full object-cover filter grayscale contrast-110 brightness-90 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105"
                />
                
                {/* Overlay Texture */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-8 -left-8 md:bottom-8 md:-left-12 bg-surfaceHighlight p-6 rounded-2xl shadow-xl border border-border max-w-[200px] hidden md:block animate-bounce" style={{animationDuration: '4s'}}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary text-background rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary">Expertise</span>
                </div>
                <p className="font-bold text-primary leading-tight">Backend & Scalable Systems</p>
              </div>
            </div>

            {/* Typewriter Greeting - Below the photo */}
            <div className="mt-8 md:mr-4 h-8 flex items-center justify-end gap-3 min-w-[280px]" data-nosnippet>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-mono text-lg md:text-xl text-primary font-medium tracking-tight">
                {text}<span className="animate-blink ml-1 border-r-2 border-primary h-5 inline-block align-middle"></span>
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;