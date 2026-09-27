import React from 'react';
import { 
  Zap, 
  Search, 
  BarChart3, 
  Lock, 
  Cpu, 
  LayoutList, 
  Target
} from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: Search,
      title: 'Neural Keyword Matcher',
      description: 'Identifies missing keywords based on live 2026 job postings across Silicon Valley and Fortune 500 tech companies.',
      tag: 'Semantic Graph'
    },
    {
      icon: BarChart3,
      title: 'Google X-Y-Z Impact Scoring',
      description: 'Quantifies bullet strength by scoring action verbs, measurable outcomes, dollar savings, and scale metrics.',
      tag: 'Executive Tier'
    },
    {
      icon: LayoutList,
      title: 'Formatting & Layout Validator',
      description: 'Flags unparseable multi-column layouts, nested graphics, fancy tables, and non-standard date formats that trip ATS bots.',
      tag: 'OCR Safe'
    },
    {
      icon: Target,
      title: 'Role-Specific Benchmarking',
      description: 'Benchmark your profile dynamically against Software Engineering, Product Management, Data Science, or DevOps standards.',
      tag: 'Dynamic Models'
    },
    {
      icon: Lock,
      title: '100% Client-Side Privacy',
      description: 'Your career credentials, personal contact info, and salary histories are processed securely and never sold or retained.',
      tag: 'SOC-2 Ready'
    },
    {
      icon: Zap,
      title: 'Sub-Second Parse Latency',
      description: 'Engineered in high-performance WebAssembly and optimized TypeScript, returning a complete diagnostic in under 400ms.',
      tag: '0.4s Fast'
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Enterprise Engine Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4">
            Engineered for <span className="gradient-text">Uncompromising Accuracy</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Unlike basic word counters, ResuMetric AI runs deep structural parsing to model how recruitment software scores your profile.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-panel-interactive p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-600/30 to-cyber-cyan/20 border border-brand-500/40 flex items-center justify-center text-brand-400 shadow-glow-brand/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded-full bg-surface-card border border-surface-border text-brand-300">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 font-display">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-surface-border/60 flex items-center text-xs font-semibold text-brand-400">
                  <span>Included in Free Tier</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
