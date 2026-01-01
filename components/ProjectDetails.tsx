
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('./data/projects.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load project details');
        return res.json();
      })
      .then(data => {
        const foundProject = data.find((p) => p.id === id);
        if (foundProject) {
          setProject(foundProject);
        }
        setLoading(false);
        window.scrollTo(0, 0);
      })
      .catch(err => {
        console.error("Error loading project details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-zinc-100 mb-4">Project not found</h2>
        <Link to="/projects" className="text-emerald-400 hover:underline">Back to all projects</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-6 lg:px-24 max-w-5xl mx-auto">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/projects')}
        className="flex items-center gap-2 text-zinc-500 hover:text-emerald-400 transition-colors mb-12 font-mono text-sm group"
      >
        <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Projects
      </button>

      {/* Hero Section */}
      <div className="mb-20">
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-mono">
            {project.domain}
          </span>
          <span className="px-3 py-1 bg-zinc-800 text-zinc-400 border border-zinc-700 rounded-full text-xs font-mono">
            {project.projectType}
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-zinc-100 mb-8 leading-tight">
          {project.title}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-zinc-800">
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1 font-mono">Duration</p>
            <p className="text-zinc-200">{project.duration}</p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1 font-mono">Role</p>
            <p className="text-zinc-200">Lead Developer</p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1 font-mono">Github</p>
            <p className="text-zinc-200">{project.githubUrl ? 'Available' : 'Private Repo'}</p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1 font-mono">Live Demo</p>
            <p className="text-zinc-200">{project.demoUrl ? 'View Site' : 'Internal System'}</p>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="space-y-24">
        {/* Overview */}
        <section>
          <h2 className="text-2xl font-bold text-zinc-100 mb-6 flex items-center gap-4">
            <span className="text-emerald-500 font-mono">01.</span> Overview
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            {project.overview}
          </p>
        </section>

        {/* Problem & Solution */}
        <section className="grid md:grid-cols-2 gap-12">
          <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/10">
            <h3 className="text-red-400 font-bold mb-4 uppercase text-sm tracking-widest">The Problem</h3>
            <p className="text-zinc-400 leading-relaxed">
              {project.problemStatement}
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
            <h3 className="text-emerald-400 font-bold mb-4 uppercase text-sm tracking-widest">The Solution</h3>
            <p className="text-zinc-400 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </section>

        {/* Key Features */}
        <section>
          <h2 className="text-2xl font-bold text-zinc-100 mb-8 flex items-center gap-4">
            <span className="text-emerald-500 font-mono">02.</span> Core Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.keyFeatures?.map((feature, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800 items-start">
                <svg className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-zinc-300">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section className="p-10 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm3 3h6v6H9V9z" />
             </svg>
          </div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">System Architecture</h2>
          <p className="text-zinc-400 mb-10 max-w-2xl">{project.architecture?.description}</p>
          <div className="flex flex-wrap gap-4">
            {project.architecture?.components?.map((comp, i) => (
              <div key={i} className="px-6 py-4 bg-zinc-900 border border-zinc-700 rounded-2xl flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-zinc-200 font-medium">{comp}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Responsibilities */}
        <section>
          <h2 className="text-2xl font-bold text-zinc-100 mb-8 flex items-center gap-4">
            <span className="text-emerald-500 font-mono">03.</span> Responsibilities
          </h2>
          <div className="space-y-4">
            {project.responsibilities?.map((resp, i) => (
              <div key={i} className="group flex items-start gap-4 text-zinc-400 hover:text-zinc-200 transition-colors">
                <span className="text-emerald-500 font-mono mt-1 text-sm">#</span>
                <p className="leading-relaxed">{resp}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack - Detailed */}
        <section>
          <h2 className="text-2xl font-bold text-zinc-100 mb-10 flex items-center gap-4">
            <span className="text-emerald-500 font-mono">04.</span> Tech Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Fix: Casting Object.entries(project.techStack) as any to handle potential unknown types during map */}
            {project.techStack && (Object.entries(project.techStack) as any[]).map(([category, techs]) => (
              <div key={category} className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-emerald-400 font-mono">{category}</h3>
                <ul className="space-y-2">
                  {/* Fix: Casting techs as any[] to resolve 'unknown' type error during map */}
                  {(techs as any[]).map((tech) => (
                    <li key={tech} className="text-zinc-400 text-sm py-2 px-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Impact */}
        <section className="bg-gradient-to-br from-emerald-500 to-cyan-600 p-1 rounded-3xl">
          <div className="bg-zinc-950 p-10 rounded-[1.4rem]">
            <h2 className="text-2xl font-bold text-zinc-100 mb-8">Business Impact</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.impact?.map((item, i) => (
                <div key={i} className="flex gap-4 items-center p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <span className="text-zinc-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer Navigation */}
      <div className="mt-32 pt-12 border-t border-zinc-900 flex justify-center">
        <Link 
          to="/projects" 
          className="px-10 py-4 bg-emerald-500 text-zinc-950 font-bold rounded-xl hover:bg-emerald-400 transition-all shadow-lg hover:shadow-emerald-500/20"
        >
          View More Projects
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetails;
