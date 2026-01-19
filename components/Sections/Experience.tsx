import React from 'react';
import { SectionId } from '../../types';
import { EXPERIENCES } from '../../constants';

const Experience: React.FC = () => {
  return (
    <section id={SectionId.EXPERIENCE} className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">Work Experience</h2>
        
        <div className="space-y-12">
          {EXPERIENCES.map((exp, index) => (
            <div key={exp.id} className="relative pl-8 md:pl-0">
              {/* Timeline Line (Desktop) */}
              <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-border -translate-x-1/2"></div>
              
              <div className={`md:flex justify-between items-start gap-12 group ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                
                {/* Content Side */}
                <div className="md:w-[45%] mb-4 md:mb-0">
                  <div className="p-6 bg-surface border border-border rounded-xl hover:border-gray-500 transition-all duration-300 group-hover:translate-y-[-4px] shadow-sm hover:shadow-white/5">
                    <div className="flex flex-col mb-4">
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <h4 className="text-gray-400 font-medium">{exp.company}</h4>
                    </div>
                    <p className="text-secondary text-sm mb-4 leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map(tech => (
                        <span key={tech} className="text-xs font-mono text-gray-300 bg-surfaceHighlight border border-border px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline Dot & Date */}
                <div className="md:w-[10%] flex md:justify-center relative">
                   <div className="absolute left-[-21px] md:left-auto top-6 w-3 h-3 bg-black rounded-full border-4 border-white z-10 shadow-sm shadow-white/20"></div>
                </div>

                {/* Date Side (Desktop) */}
                <div className={`md:w-[45%] flex items-center ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                  <span className="font-mono text-sm text-gray-500 py-6 md:py-0 block">
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