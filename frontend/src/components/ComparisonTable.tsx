import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  const comparisons = [
    {
      feature: 'Real-time 5-Dimensional ATS Composite Score',
      resumetric: true,
      legacy: false,
      chatbots: 'Vague estimates'
    },
    {
      feature: 'Workday, Greenhouse & Lever Compatibility Checks',
      resumetric: true,
      legacy: false,
      chatbots: false
    },
    {
      feature: 'Google X-Y-Z Metric Quantification Scoring',
      resumetric: true,
      legacy: false,
      chatbots: 'Partial'
    },
    {
      feature: 'Target Role Alignment Switcher',
      resumetric: true,
      legacy: false,
      chatbots: 'Manual prompt'
    },
    {
      feature: 'Automated 1-Click Bullet Point Rewrite',
      resumetric: true,
      legacy: false,
      chatbots: 'Hallucination risk'
    },
    {
      feature: 'OCR & Multi-Column Format Parsing Validation',
      resumetric: true,
      legacy: 'Basic string match',
      chatbots: false
    },
    {
      feature: 'Zero Data Retention / 100% Client-Side Privacy',
      resumetric: true,
      legacy: false,
      chatbots: 'Trained on your data'
    }
  ];

  return (
    <section className="py-20 relative bg-surface-darker/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3">
            Why Generic Checkers <span className="gradient-text">Fail You</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Traditional tools count keyword occurrences. ResuMetric AI actually parses and scores your CV like an enterprise ATS engine.
          </p>
        </div>

        {/* Table Card */}
        <div className="rounded-2xl glass-panel border border-surface-border overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-border bg-surface-darker/80 text-xs uppercase tracking-wider font-mono text-slate-400">
                  <th className="py-4 px-6 font-semibold">Capability</th>
                  <th className="py-4 px-6 text-brand-300 font-bold bg-brand-500/10 border-x border-brand-500/20">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-brand-400" />
                      <span>ResuMetric AI</span>
                    </div>
                  </th>
                  <th className="py-4 px-6 font-semibold">Legacy Free Checkers</th>
                  <th className="py-4 px-6 font-semibold">Generic LLM / Chatbots</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border text-sm">
                {comparisons.map((row, idx) => (
                  <tr key={idx} className="hover:bg-surface-card/40 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-200">
                      {row.feature}
                    </td>

                    <td className="py-4 px-6 bg-brand-500/5 border-x border-brand-500/20 text-cyber-emerald font-semibold">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-cyber-emerald/20 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-cyber-emerald" />
                        </div>
                        <span className="text-xs">Yes, Built-in</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-slate-400 text-xs">
                      {typeof row.legacy === 'boolean' ? (
                        row.legacy ? (
                          <Check className="w-4 h-4 text-cyber-emerald" />
                        ) : (
                          <X className="w-4 h-4 text-rose-500" />
                        )
                      ) : (
                        row.legacy
                      )}
                    </td>

                    <td className="py-4 px-6 text-slate-400 text-xs">
                      {typeof row.chatbots === 'boolean' ? (
                        row.chatbots ? (
                          <Check className="w-4 h-4 text-cyber-emerald" />
                        ) : (
                          <X className="w-4 h-4 text-rose-500" />
                        )
                      ) : (
                        row.chatbots
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
