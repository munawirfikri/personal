
import React from 'react';
import { SectionId } from '../../types';
import { useData } from '../../contexts/DataContext';

const Education: React.FC = () => {
  const { education, t } = useData();

  return (
    <section id={SectionId.EDUCATION} className="py-24 bg-surfaceHighlight scroll-mt-28 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor" className="text-primary transform rotate-12">
            <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
          </svg>
      </div>

      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-primary">{t('edu_title')}</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {education.map((edu, index) => (
            <div 
              key={edu.id}
              className="bg-background border border-border rounded-xl p-8 hover:border-secondary transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-xl hover:shadow-primary/5 flex flex-col relative overflow-hidden group"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex justify-between items-start mb-4">
                 <div className="p-3 bg-surfaceHighlight rounded-lg border border-border text-primary group-hover:bg-primary group-hover:text-background transition-colors duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                 </div>
                 <span className="font-mono text-sm text-secondary bg-surface px-3 py-1 rounded-full border border-border">
                    {edu.year}
                 </span>
              </div>

              <h3 className="text-xl font-bold text-primary mb-1">{edu.school}</h3>
              <h4 className="text-lg font-medium text-secondary mb-4">{edu.degree}</h4>
              
              <p className="text-secondary text-sm leading-relaxed mb-6 flex-grow">
                 {edu.description}
              </p>

              {edu.gpa && (
                  <div className="pt-4 border-t border-border flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-secondary font-semibold">{t('edu_gpa')}</span>
                      <span className="font-mono font-bold text-primary">{edu.gpa}</span>
                  </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
