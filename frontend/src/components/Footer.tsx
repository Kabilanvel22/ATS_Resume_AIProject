import React from 'react';
import { 
  FileCheck2, 
  Lock, 
  ArrowUp
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-surface-border bg-surface-darker py-8 mt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-cyber-cyan p-0.5 shadow-glow-brand">
              <div className="w-full h-full bg-surface-darker rounded-[6px] flex items-center justify-center">
                <FileCheck2 className="w-3.5 h-3.5 text-brand-400" />
              </div>
            </div>
            <span className="font-display font-bold text-sm text-white">
              ResuMetric<span className="text-brand-400">.ai</span>
            </span>
            <span className="text-slate-500 text-xs hidden sm:inline">•</span>
            <span className="text-slate-400 text-xs hidden sm:inline">
              Enterprise Resume Parsing & ATS Intelligence
            </span>
          </div>

          {/* Privacy badge & Scroll to Top */}
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 text-cyber-emerald">
              <Lock className="w-3.5 h-3.5" />
              <span>100% Client-Side Privacy</span>
            </div>

            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-surface-card hover:bg-surface-cardHover border border-surface-border text-slate-300 hover:text-white transition-colors"
              title="Scroll to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        <div className="mt-4 pt-4 border-t border-surface-border/50 text-center text-[11px] text-slate-500">
          &copy; {new Date().getFullYear()} ResuMetric AI. All document analysis runs securely in-browser. No resumes stored.
        </div>
      </div>
    </footer>
  );
};
