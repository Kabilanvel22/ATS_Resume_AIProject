import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  Copy,
  TrendingUp,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface BulletSample {
  role: string;
  weakText: string;
  weakScore: number;
  weakFlaws: string[];
  strongText: string;
  strongScore: number;
  strongHighlights: string[];
}

const BULLET_EXAMPLES: BulletSample[] = [
  {
    role: 'Software Engineer',
    weakText: 'Worked on the frontend dashboard and fixed some bugs to make it faster.',
    weakScore: 42,
    weakFlaws: ['Passive verb ("Worked on")', 'No concrete metrics', 'Vague technologies ("frontend dashboard")'],
    strongText: 'Architected high-throughput React & TypeScript telemetry dashboard, reducing p99 render latency by 42% and eliminating 180+ critical bugs for 450,000 active enterprise users.',
    strongScore: 96,
    strongHighlights: ['High-impact verb ("Architected")', 'Explicit stack ("React & TypeScript")', 'Quantified speed (42% latency cut)', 'Scale context (450k enterprise users)']
  },
  {
    role: 'Product Manager',
    weakText: 'Responsible for product features and talked with customers for feedback.',
    weakScore: 38,
    weakFlaws: ['Job description wording ("Responsible for")', 'Zero business KPIs or ARR', 'Missing cross-functional leadership'],
    strongText: 'Spearheaded end-to-end launch of automated analytics feature set, increasing self-serve onboarding conversion by 31% and unlocking $1.4M in incremental ARR across 60+ enterprise accounts.',
    strongScore: 94,
    strongHighlights: ['Leadership verb ("Spearheaded")', 'Quantified conversion (+31%)', 'Direct revenue impact ($1.4M ARR)']
  },
  {
    role: 'DevOps / Cloud',
    weakText: 'Helped maintain AWS servers and set up Docker containers for the team.',
    weakScore: 45,
    weakFlaws: ['Diminishing verb ("Helped maintain")', 'Missing downtime/uptime metrics', 'No cost efficiency tracking'],
    strongText: 'Orchestrated automated Kubernetes (EKS) migration across 45 microservices, cutting annual cloud compute costs by $130,000 while raising cluster availability to 99.99%.',
    strongScore: 97,
    strongHighlights: ['Authoritative verb ("Orchestrated")', 'Explicit tooling (EKS, 45 microservices)', 'Cost reduction ($130,000)', 'SLA precision (99.99% uptime)']
  }
];

export const BulletOptimizer: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const current = BULLET_EXAMPLES[selectedIdx];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="optimizer" className="py-20 relative bg-surface-darker/60">

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-amber/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Impact Metric Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3">
            Transform Weak Bullets into <span className="gradient-text">Top 1% ATS Magnets</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            ATS scanners rank resumes using semantic embeddings and quantifiable metrics. See how ResuMetric AI upgrades bullet points using the proven Google X-Y-Z formula.
          </p>
        </div>

        {/* Role Presets Selector */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {BULLET_EXAMPLES.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${selectedIdx === idx
                  ? 'bg-brand-600 text-white shadow-glow-brand border border-brand-400'
                  : 'bg-surface-card hover:bg-surface-cardHover text-slate-400 hover:text-white border border-surface-border'
                }`}
            >
              {sample.role}
            </button>
          ))}
        </div>

        {/* Comparison Box */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

          {/* Before: Weak Bullet */}
          <div className="rounded-2xl glass-panel p-6 border border-rose-500/20 bg-rose-500/[0.03] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-rose-500/20 mb-4">
                <span className="text-xs font-bold font-mono uppercase text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  Before: Unoptimized Draft
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-300">
                  ATS Score: {current.weakScore}/100
                </span>
              </div>

              <div className="p-4 rounded-xl bg-surface-darker/80 border border-surface-border mb-4 font-mono text-sm text-slate-300 leading-relaxed italic">
                "{current.weakText}"
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Identified Red Flags:
                </span>
                {current.weakFlaws.map((flaw, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-rose-300/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                    <span>{flaw}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-surface-border text-xs text-slate-500">
              Typical outcome: Ignored by recruiters due to lack of proof.
            </div>
          </div>

          {/* After: ResuMetric Optimized */}
          <div className="rounded-2xl glass-panel p-6 border border-cyber-emerald/30 bg-cyber-emerald/[0.03] shadow-glow-emerald/20 flex flex-col justify-between relative overflow-hidden">

            <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-emerald/10 blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-cyber-emerald/20 mb-4">
                <span className="text-xs font-bold font-mono uppercase text-cyber-emerald flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  After: ResuMetric AI Optimized
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyber-emerald/20 text-cyber-emerald">
                  ATS Score: {current.strongScore}/100
                </span>
              </div>

              <div className="p-4 rounded-xl bg-surface-darker/80 border border-cyber-emerald/30 mb-4 text-sm font-medium text-white leading-relaxed">
                "{current.strongText}"
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Why It Gets Interviews:
                </span>
                {current.strongHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-cyber-emerald">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyber-emerald shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-surface-border flex items-center justify-between">
              <span className="text-xs text-cyber-emerald font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                +{(current.strongScore - current.weakScore)} Score Boost
              </span>

              <button
                onClick={() => handleCopy(current.strongText)}
                className="px-3 py-1.5 rounded-lg bg-surface-card hover:bg-surface-cardHover border border-cyber-emerald/40 text-xs font-semibold text-white flex items-center gap-1.5 transition-all active:scale-95"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-cyber-emerald" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Bullet</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
