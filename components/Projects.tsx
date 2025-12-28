
import React, { useEffect, useState } from 'react';
import { projectService } from '../services/api';
import { Project } from '../types';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectService.getProjects().then(data => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen py-24 px-6 lg:px-24 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold text-zinc-100">03. My Work</h2>
        <div className="h-px bg-zinc-800 flex-grow"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="flex flex-col gap-6 p-6 bg-zinc-900 rounded-2xl border border-zinc-800 group hover:translate-y-[-4px] transition-all duration-300"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-4">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-emerald-400 transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </a>
                  )}
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-emerald-400 transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
              
              <p className="text-zinc-400 mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-4 font-mono text-xs text-emerald-400/80">
                {project.technologies.map(tech => (
                  <span key={tech} className="px-2 py-1 bg-emerald-500/5 border border-emerald-500/20 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
