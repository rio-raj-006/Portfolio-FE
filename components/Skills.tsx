
import React, { useEffect, useState } from 'react';
import { skillService } from '../services/api';
import { Skill } from '../types';

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    skillService.getSkills().then(data => {
      setSkills(data);
      setLoading(false);
    });
  }, []);

  const getLevelColor = (level: string) => {
    switch(level.toLowerCase()) {
      case 'advanced': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5';
      case 'intermediate': return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5';
      default: return 'text-zinc-400 border-zinc-500/30 bg-zinc-500/5';
    }
  };

  return (
    <div className="min-h-screen py-24 px-6 lg:px-24 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold text-zinc-100">02. Tech Stack</h2>
        <div className="h-px bg-zinc-800 flex-grow"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all group"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                {skill.name}
              </h3>
              <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded border ${getLevelColor(skill.level)}`}>
                {skill.level}
              </span>
            </div>
            <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden mt-3">
              <div 
                className={`h-full bg-emerald-500 transition-all duration-1000 ${
                  skill.level.toLowerCase() === 'advanced' ? 'w-full' : 
                  skill.level.toLowerCase() === 'intermediate' ? 'w-2/3' : 'w-1/3'
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 text-center">
        <h4 className="text-zinc-400 mb-2">Backend Focused</h4>
        <p className="text-zinc-500 italic">Specializing in high-performance banking systems and scalable architectures.</p>
      </div>
    </div>
  );
};

export default Skills;
