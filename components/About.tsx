
import React, { useEffect, useState } from 'react';
import { profileService } from '../services/api';
import { AboutInfo } from '../types';

const About: React.FC = () => {
  const [about, setAbout] = useState<AboutInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    profileService.getAbout().then(data => {
      setAbout(data);
      setLoading(false);
    });
  }, []);

  if (loading) return null;

  return (
    <div className="min-h-screen py-24 px-6 lg:px-24 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold text-zinc-100">01. About Me</h2>
        <div className="h-px bg-zinc-800 flex-grow"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6 text-zinc-400 leading-relaxed text-lg">
          <p className="whitespace-pre-line">{about?.about}</p>
        </div>

        <div className="relative group max-w-sm mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800">
            <img 
              src="https://picsum.photos/seed/profile-real/600/600" 
              alt="Profile" 
              className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
