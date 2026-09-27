import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Upload, 
  FileText,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface HeroProps {
  onScanClick: () => void;
  onSampleClick: (key: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScanClick, onSampleClick }) => {
  return (
    <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 overflow-hidden bg-radial-gradient">
      
      {/* Background Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-brand-500/15 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card border border-brand-500/30 text-xs font-medium text-slate-200 mb-6">
          <span className="flex h-2 w-2 rounded-full bg-cyber-emerald animate-ping" />
          <span className="text-brand-300 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            AI Resume Intelligence
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">Calibrated for Workday & Greenhouse</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-5">
          AI Resume Parser & <br />
          <span className="gradient-text">Real-Time ATS Score Analyzer</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Upload your resume to extract skills, evaluate layout readability, identify missing keywords, and get an instant ATS score calibrated against enterprise hiring systems.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
          <button
            onClick={onScanClick}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-brand-600 to-cyber-cyan hover:from-brand-500 hover:to-brand-400 shadow-glow-brand transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Resume (PDF, DOCX)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onSampleClick('fullstack')}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-300 bg-surface-card hover:bg-surface-cardHover border border-surface-border hover:border-brand-500/40 transition-all flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-brand-400" />
            <span>Try Sample Resume</span>
          </button>
        </div>

        {/* Value Micro-Points */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyber-emerald" />
            <span>Instant Parsing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyber-cyan" />
            <span>100% Client-Side Privacy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Google X-Y-Z Scoring</span>
          </div>
        </div>

      </div>

    </section>
  );
};
