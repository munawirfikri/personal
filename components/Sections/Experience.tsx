import React from 'react';
import { SectionId } from '../../types';
import { EXPERIENCES } from '../../constants';

const Experience: React.FC = () => {
  return (
    <section id={SectionId.EXPERIENCE} className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">Work Experience</h2>
        
        <div className="flex flex-col">
          {EXPERIENCES.map((exp, index) => (
            <div 
              key={exp.id} 
              className="relative pl-8 md:pl-0 group pb-12 last:pb-0 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}
            >
              {/* Timeline Line (Desktop) - Enhanced with dashed style and glow */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full z-0 top-0">
                  {/* Upper segment (connects to previous) - Only if not first */}
                  {index !== 0 && (
                      <div className="absolute top-0 h-8 w-full border-l-2 border-dashed border-white/30 shadow-[0_0_8px_rgba(255,255,255,0.4)]"></div>
                  )}
                  {/* Lower segment (connects to next) - Only if not last */}
                  {index !== EXPERIENCES.length - 1 && (
                      <div className="absolute top-8 bottom-0 w-full border-l-2 border-dashed border-white/30 shadow-[0_0_8px_rgba(255,255,255,0.4)]"></div>
                  )}
              </div>

              {/* Timeline Line (Mobile) - Simple solid line */}
              <div className="md:hidden absolute left-[11px] top-6 bottom-[-24px] w-px bg-border group-last:bottom-auto group-last:h-full"></div>

              <div className={`flex flex-col md:flex-row justify-between items-start md:gap-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Content Side */}
                <div className="md:w-[45%] mb-4 md:mb-0 relative z-10 order-2 md:order-none w-full">
                  <div className="p-6 bg-surface border border-border rounded-xl hover:border-gray-500 transition-all duration-300 group-hover:-translate-y-1 shadow-sm hover:shadow-white/5 relative overflow-hidden">
                    {/* Subtle hover gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    
                    <div className="flex flex-col mb-4 relative z-10">
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <h4 className="text-gray-400 font-medium">{exp.company}</h4>
                    </div>
                    <p className="text-secondary text-sm mb-4 leading-relaxed relative z-10">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2 relative z-10">
                      {exp.technologies.map(tech => (
                        <span key={tech} className="text-xs font-mono text-gray-300 bg-surfaceHighlight border border-border px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-0 md:static md:w-[10%] flex md:justify-center z-20 mt-1 md:mt-0">
                   {/* Glow behind dot - Always breathing */}
                   <div className="absolute top-6 left-[3px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-white/40 rounded-full blur-md animate-pulse"></div>
                   
                   {/* Hover Ripple - Expands on hover */}
                   <div className="absolute top-6 left-[3px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full border border-white opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[2.5] group-hover:border-opacity-0 ease-out"></div>

                   {/* Actual Dot */}
                   <div className="absolute top-6 left-[3px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-black rounded-full border-[3px] border-white shadow-[0_0_10px_rgba(255,255,255,0.4)] transition-all duration-300 group-hover:scale-125 group-hover:bg-white group-hover:border-black group-hover:shadow-[0_0_20px_rgba(255,255,255,0.8)] z-10"></div>
                </div>

                {/* Date Side */}
                <div className={`md:w-[45%] flex items-center md:py-0 order-1 md:order-none mb-2 md:mb-0 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                  <span className="font-mono text-sm text-gray-500 block group-hover:text-white transition-colors duration-300">
                    {exp.period}
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;