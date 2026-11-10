import React from 'react';
import { Heart, Compass, ShieldCheck } from 'lucide-react';

interface FooterProps {
  navigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold">
            🐾
          </div>
          <div>
            <div className="font-extrabold text-white text-sm">PawPulse & AI Systems Ecosystem</div>
            <p className="text-[11px] text-slate-500">Candidate Submission • Product, Design & AI Systems Intern</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 font-medium">
          <button onClick={() => navigate('/')} className="hover:text-white transition-colors">
            Submission Hub
          </button>
          <button onClick={() => navigate('/animals')} className="hover:text-white transition-colors">
            Practo for Animals (/animals)
          </button>
          <button onClick={() => navigate('/ai-course')} className="hover:text-white transition-colors">
            AI Education Landing (/ai-course)
          </button>
          <button onClick={() => navigate('/carousel')} className="hover:text-white transition-colors">
            AI Carousel Studio (/carousel)
          </button>
          <button onClick={() => navigate('/overview')} className="hover:text-white transition-colors">
            Written Strategy (/overview)
          </button>
        </div>

        <div className="text-[11px] text-slate-500 text-center md:text-right">
          Built with React 18, Vite, Tailwind CSS & TypeScript.
        </div>
      </div>
    </footer>
  );
};
