
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Using fetch instead of import to avoid module resolution/alias issues
    fetch('./data/projects.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load projects');
        return res.json();
      })
      .then(data => {
        setProjects(data as Project[]);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading project data:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-zinc-500 font-mono">Error loading projects. Check data/projects.json path.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-6 lg:px-24 max-w-7xl mx-auto">
      <div className="flex flex-col mb-12">
        <div className="flex items-center gap-4 mb-2">
          <h2 className="text-3xl font-bold text-zinc-100">03. Featured Projects</h2>
          <div className="h-px bg-zinc-800 flex-grow"></div>
        </div>
        <p className="text-zinc-500 font-mono text-sm">Case studies from my professional career</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {projects.map((project) => (
          <Link 
            to={`/projects/${project.id}`}
            key={project.id} 
            className="flex flex-col gap-6 p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800 group hover:border-emerald-500/50 hover:bg-zinc-900 transition-all duration-300 shadow-xl"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded">
                  {project.domain}
                </span>
                <span className="text-xs text-zinc-500 font-mono">{project.duration}</span>
              </div>
              
              <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors mb-4">
                {project.title}
              </h3>
              
              <p className="text-zinc-400 mb-6 flex-grow leading-relaxed line-clamp-3">
                {project.overview}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {project.techStack?.backend?.slice(0, 2).map(tech => (
                  <span key={tech} className="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-[10px] text-zinc-400 font-mono">
                    {tech}
                  </span>
                ))}
                {project.techStack?.database?.slice(0, 1).map(tech => (
                  <span key={tech} className="px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-[10px] text-zinc-400 font-mono">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 text-emerald-500 text-sm font-bold group-hover:gap-4 transition-all">
                View Case Study
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
