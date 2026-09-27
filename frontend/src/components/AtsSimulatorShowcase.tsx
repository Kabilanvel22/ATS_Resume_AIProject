import React from 'react';
import { 
  Workflow, 
  FileSearch, 
  Binary, 
  Layers, 
  Database,
  Building
} from 'lucide-react';

export const AtsSimulatorShowcase: React.FC = () => {
  const atsPlatforms = [
    {
      name: 'Workday ATS',
      marketShare: '32% of Fortune 500',
      parserType: 'Structured Entity Field Extraction',
      gotcha: 'Strictly penalizes 2-column graphics and non-standard date notations.'
    },
    {
      name: 'Greenhouse',
      marketShare: 'Popular in High-Growth Tech & Unicorns',
      parserType: 'Semantic Skill Frequency Indexing',
      gotcha: 'Screens for specific tech stack clusters and role tenure continuity.'
    },
    {
      name: 'Lever',
      marketShare: 'Mid-Market & Tech Startups',
      parserType: 'Contact & Portfolio Direct Parsing',
      gotcha: 'Auto-scrapes GitHub and LinkedIn URLs directly from contact headers.'
    },
    {
      name: 'Oracle Taleo',
      marketShare: 'Legacy Enterprise & Aerospace',
      parserType: 'Strict Keyword Boolean Matcher',
      gotcha: 'High false-negative rate if exact acronyms and terms are not verbatim.'
    }
  ];

  const pipelineSteps = [
    {
      step: '01',
      title: 'Ingestion & OCR Normalization',
      desc: 'Flattens PDF vector streams and Word XML trees into standard UTF-8 characters, discarding invisible rendering artifacts.',
      icon: FileSearch
    },
    {
      step: '02',
      title: 'Layout & Boundary Dissection',
      desc: 'Identifies standard canonical sections: Work Experience, Education, Technical Skills, and Projects.',
      icon: Layers
    },
    {
      step: '03',
      title: 'Canonical Skill Entity Mapping',
      desc: 'Translates syntax variations ("React.js", "ReactJS", "React 18") into a unified knowledge graph node.',
      icon: Binary
    },
    {
      step: '04',
      title: 'Semantic Recruiter Ranking',
      desc: 'Scores resumes against the hiring manager’s boolean query, job description requirements, and seniority tenure.',
      icon: Database
    }
  ];

  return (
    <section id="ats-systems" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-3">
            <Workflow className="w-3.5 h-3.5" />
            <span>Architecture Breakdown</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4">
            How Modern ATS Engines <span className="gradient-text">Actually Read Your CV</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Recruiters don't read resumes; algorithms do first. Here is the exact parsing pipeline ResuMetric simulates to guarantee your resume passes through unhindered.
          </p>
        </div>

        {/* 4-Step Pipeline Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pipelineSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl glass-panel p-6 border border-surface-border hover:border-brand-500/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-2xl font-bold text-slate-600 group-hover:text-brand-400 transition-colors">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Major ATS Platforms Matrix Grid */}
        <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-surface-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-surface-border">
            <div>
              <h3 className="text-lg font-bold font-display text-white">
                Platform Specific Calibration Standards
              </h3>
              <p className="text-xs text-slate-400">
                ResuMetric AI continuously tests against real-world test feeds from tier-1 recruiting portals.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-cyber-emerald font-mono">
              <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-pulse" />
              <span>Calibrated for 2026 Systems</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {atsPlatforms.map((plat, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-surface-darker/60 border border-surface-border hover:border-brand-500/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Building className="w-4 h-4 text-brand-400" />
                  <h4 className="font-bold text-white text-sm">{plat.name}</h4>
                </div>
                <div className="text-[11px] font-mono text-brand-300 mb-2">
                  {plat.marketShare}
                </div>
                <div className="text-xs text-slate-400 mb-2">
                  <strong className="text-slate-300">Parser Logic:</strong> {plat.parserType}
                </div>
                <div className="p-2.5 rounded-lg bg-surface-card border border-surface-border text-[11px] text-amber-300/90 leading-tight">
                  ⚠️ <strong className="text-slate-200">Watchout:</strong> {plat.gotcha}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
