import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Sparkles, 
  Layers, 
  FileText, 
  Menu, 
  X, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Compass
} from 'lucide-react';

interface NavigationProps {
  currentRoute: string;
  navigate: (route: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentRoute, navigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      id: '/',
      label: 'Submission Hub',
      icon: Compass,
      badge: 'Start Here',
      description: 'Project overview & executive brief'
    },
    {
      id: '/animals',
      label: 'Practo for Animals',
      icon: HeartHandshake,
      badge: 'Part 1',
      description: 'PawPulse: Discovery, Emergency & Map'
    },
    {
      id: '/ai-course',
      label: 'AI Education',
      icon: Sparkles,
      badge: 'Part 2',
      description: 'CogniShift: Cohort landing & lead flow'
    },
    {
      id: '/carousel',
      label: 'Carousel Studio',
      icon: Layers,
      badge: 'Part 3',
      description: 'AI content engine & PDF export'
    },
    {
      id: '/overview',
      label: 'Written Strategy',
      icon: FileText,
      badge: 'Brief',
      description: 'Tech stack, MoSCoW & 30-day roadmap'
    }
  ];

  const handleNav = (route: string) => {
    navigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Top Banner with Assignment Context */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-medium text-white">Internship Assignment Submission</span>
          <span className="hidden sm:inline text-slate-400">• Role: Product Development, Design & AI Systems</span>
        </div>
        <div className="flex items-center gap-4 text-slate-300">
          <span className="hidden md:inline font-mono text-[11px] bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            Stack: React 18 + Vite + Tailwind + TypeScript
          </span>
          <button 
            onClick={() => handleNav('/overview')}
            className="hover:text-emerald-400 transition-colors flex items-center gap-1 font-semibold text-emerald-300"
          >
            <span>Read 30-Day Plan</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNav('/')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 via-emerald-600 to-indigo-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <span className="text-xl">🐾</span>
          </div>
          <div>
            <div className="font-extrabold text-slate-900 text-base leading-tight tracking-tight flex items-center gap-1.5">
              <span>PawPulse & AI Labs</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                PROTOTYPE
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Founder Portfolio Ecosystem</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/70">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentRoute === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all min-h-[44px] ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-500'}`} />
                <span>{link.label}</span>
                {link.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isActive ? 'bg-teal-100 text-teal-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleNav('/animals')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-all min-h-[44px]"
          >
            <span>Explore Animal Care MVP</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button (>=44px touch target) */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="w-11 h-11 flex items-center justify-center rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentRoute === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-sm font-semibold transition-all min-h-[48px] ${
                    isActive
                      ? 'bg-teal-50 text-teal-900 border border-teal-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold">{link.label}</div>
                      <div className="text-xs text-slate-500 font-normal">{link.description}</div>
                    </div>
                  </div>
                  {link.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
