
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-10 text-center border-t border-zinc-900/50">
      <div className="flex justify-center gap-6 mb-4">
        <a href="#" className="text-zinc-500 hover:text-emerald-400 transition-colors">Github</a>
        <a href="#" className="text-zinc-500 hover:text-emerald-400 transition-colors">LinkedIn</a>
      </div>
      <p className="text-xs text-zinc-600 font-mono">
        Designed & Built by Rajkumar &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
