import React from 'react';
import { SectionId } from '../../types';
import { useData } from '../../contexts/DataContext';

const Projects: React.FC = () => {
  const { projects } = useData();

  return (
    <section id={SectionId.PROJECTS} className="py-24 bg-surface scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
           <h2 className="text-3xl md:text-4xl font-bold text-primary">Featured Projects</h2>
           <p className="text-secondary mt-4 md:mt-0">Some things I've built.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group relative bg-surfaceHighlight border border-border rounded-xl overflow-hidden hover:border-secondary transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="aspect-video w-full overflow-hidden relative">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-primary transition-colors">{project.title}</h3>
                <p className="text-sm text-secondary mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 border border-border bg-background/50 rounded text-secondary">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.link && (
                    <a href={project.link} className="text-sm font-semibold hover:underline decoration-primary underline-offset-4 text-primary">
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                     <a href={project.github} className="text-sm font-semibold hover:underline decoration-primary underline-offset-4 text-primary">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;