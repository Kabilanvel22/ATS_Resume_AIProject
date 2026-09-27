import React, { useState, useEffect } from 'react';
import { 
  FileCheck2, 
  Sparkles, 
  Menu, 
  X, 
  Upload
} from 'lucide-react';

interface NavbarProps {
  onLoadSample: (key: string) => void;
  onScrollToScanner: () => void;
  hasScoredResume: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onLoadSample, 
  onScrollToScanner,
  hasScoredResume 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled 
          ? 'bg-surface-darker/95 backdrop-blur-md border-b border-surface-border/70 py-3 shadow-glass' 
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-brand-500 to-cyber-cyan p-0.5 shadow-glow-brand group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-surface-darker rounded-[10px] flex items-center justify-center">
                <FileCheck2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400 group-hover:text-cyber-cyan transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-white">
                  ResuMetric<span className="text-brand-400">.ai</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] sm:text-[10px] font-mono font-semibold uppercase bg-brand-500/20 text-brand-300 border border-brand-500/30 rounded-md">
                  v4.2
                </span>
              </div>
            </div>
          </a>

          {/* Center Links - Focused & Useful */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
            <a href="#upload-section" className="hover:text-white transition-colors flex items-center gap-1.5">
              <span>Resume Parser</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald animate-pulse"></span>
            </a>
            {hasScoredResume && (
              <a href="#score-section" className="hover:text-brand-400 transition-colors flex items-center gap-1 text-cyber-emerald">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ATS Score Report</span>
              </a>
            )}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => onLoadSample('fullstack')}
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-surface-card hover:bg-surface-cardHover border border-surface-border rounded-lg transition-all"
            >
              Load Sample CV
            </button>

            <button
              onClick={onScrollToScanner}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-brand-600 hover:bg-brand-500 shadow-glow-brand transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Scan Resume</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onScrollToScanner}
              className="px-2.5 py-1 text-xs font-semibold text-white bg-brand-600 rounded-md flex items-center gap-1"
            >
              <Upload className="w-3 h-3" />
              <span>Scan</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-400 hover:text-white rounded-md bg-surface-card border border-surface-border"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-surface-dark border-b border-surface-border px-4 py-3 space-y-2.5 mt-2 animate-in fade-in duration-200">
          <a
            href="#upload-section"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-slate-200 hover:text-brand-400 text-xs font-medium"
          >
            Upload Resume
          </a>
          {hasScoredResume && (
            <a
              href="#score-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-cyber-emerald text-xs font-medium"
            >
              View ATS Score Report
            </a>
          )}
          <button
            onClick={() => {
              onLoadSample('fullstack');
              setMobileMenuOpen(false);
            }}
            className="w-full py-2 text-xs font-semibold text-slate-200 bg-surface-card border border-surface-border rounded-lg text-center"
          >
            Load Sample Profile (Staff SWE)
          </button>
        </div>
      )}
    </header>
  );
};
