import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Marcus Sterling',
      role: 'Staff Engineer at Stripe',
      initialScore: 68,
      finalScore: 95,
      avatarColor: 'from-blue-600 to-indigo-600',
      initials: 'MS',
      quote: 'I submitted my old resume to 40+ roles with zero callbacks. ResuMetric flagged that my two-column PDF format was scrambling all my experience in Workday. Switched to single-column, boosted my keyword score, and had 6 recruiter calls in 10 days.',
      offers: 'Offers: Stripe, Datadog'
    },
    {
      name: 'Elena Rostova',
      role: 'Lead Product Manager at Snowflake',
      initialScore: 61,
      finalScore: 91,
      avatarColor: 'from-purple-600 to-pink-600',
      initials: 'ER',
      quote: 'The AI Bullet Optimizer is incredible. It pinpointed that my bullet points lacked revenue and ARR quantification. Rewrote them with the Google X-Y-Z formula and jumped from a 61 to 91 score. Landed my dream PM role.',
      offers: 'Offer: Snowflake ($280k TC)'
    },
    {
      name: 'Kavita Patel',
      role: 'Machine Learning Specialist at Anthropic',
      initialScore: 72,
      finalScore: 96,
      avatarColor: 'from-emerald-600 to-teal-600',
      initials: 'KP',
      quote: 'Most parsers treat "Python" and "PyTorch" as basic text strings. ResuMetric’s semantic graph highlighted that I had missed specific inference serving keywords (vLLM, TensorRT) required for tier-1 AI roles. Truly enterprise-grade.',
      offers: 'Offer: Anthropic'
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-emerald/10 border border-cyber-emerald/20 text-cyber-emerald text-xs font-semibold mb-3">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Verified Candidate Outcomes</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4">
            From ATS Rejection to <span className="gradient-text">Top-Tier Offers</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            See how tech professionals calibrated their resumes to outrank hundreds of applicants.
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="rounded-2xl glass-panel p-6 sm:p-8 flex flex-col justify-between border border-surface-border relative"
            >
              <div>
                {/* Score Transformation Pill */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-surface-border/60">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold bg-surface-darker px-2.5 py-1 rounded-full border border-surface-border">
                    <span className="text-rose-400">{rev.initialScore}</span>
                    <span className="text-slate-500">→</span>
                    <span className="text-cyber-emerald">{rev.finalScore} ATS</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-surface-border flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${rev.avatarColor} flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md`}>
                  {rev.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">
                    {rev.name}
                  </h4>
                  <p className="text-xs text-brand-300 font-medium">
                    {rev.role}
                  </p>
                  <p className="text-[11px] text-cyber-emerald font-mono mt-0.5">
                    {rev.offers}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
