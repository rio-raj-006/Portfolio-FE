
import React, { useEffect, useState } from 'react';
import { profileService } from '../services/api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    profileService.getSummary()
      .then(data => {
        setSummary(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Home API Error:", err);
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
        <div className="p-8 bg-zinc-900 rounded-3xl border border-red-500/20 shadow-2xl max-w-md">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-2">API Connection Failed</h2>
          <p className="text-zinc-400 mb-6">Unable to retrieve profile data from the backend. Please check your network connection or if the API is active.</p>
          <div className="text-xs font-mono p-3 bg-black rounded border border-zinc-800 text-zinc-500 mb-6 overflow-hidden text-ellipsis whitespace-nowrap">
            https://python-portfolio-kn9o.onrender.com/api
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-zinc-100 text-zinc-950 font-bold rounded-xl hover:bg-white transition-colors"
          >
            Retry Connection
          </button>
        </div>
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
