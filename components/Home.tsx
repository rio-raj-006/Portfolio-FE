
import React, { useEffect, useState } from 'react';
import { profileService } from '../services/api';
import { ProfileSummary } from '../types';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [summary, setSummary] = useState<ProfileSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    profileService.getSummary()
      .then(data => {
        setSummary(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
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
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h2 className="text-xl font-bold text-red-400 mb-2">Connection Error</h2>
        <p className="text-zinc-500">Unable to reach the backend API at localhost:8080</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 lg:px-24">
      <div className="max-w-4xl animate-fade-in-up">
        <p className="font-mono text-emerald-400 mb-4">Hi, my name is</p>
        <h1 className="text-5xl md:text-7xl font-bold text-zinc-100 mb-4">
          {summary?.name}.
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold text-zinc-400 mb-6">
          {summary?.role} | {summary?.experience}
        </h2>
        <div className="flex items-center gap-2 mb-6">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-sm font-mono">
            {summary?.domain}
          </span>
        </div>
        <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          {summary?.shortIntro}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/projects"
            className="px-8 py-4 border border-emerald-500 text-emerald-500 rounded font-medium hover:bg-emerald-500/10 transition-all"
          >
            View Projects
          </Link>
          <Link
            to="/ai"
            className="px-8 py-4 bg-zinc-100 text-zinc-900 rounded font-medium hover:bg-zinc-300 transition-all flex items-center gap-2"
          >
            Chat with AI
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
