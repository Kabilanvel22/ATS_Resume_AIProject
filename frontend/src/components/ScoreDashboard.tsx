import React, { useState } from 'react';
import type { 
  ParsedResume, 
  TargetRole 
} from '../types/resume';
import { 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  Layers, 
  Sparkles, 
  Building2, 
  Mail, 
  MapPin, 
  Copy, 
  Check, 
  ShieldCheck,
  Download,
  RotateCcw
} from 'lucide-react';

interface ScoreDashboardProps {
  resume: ParsedResume;
  onRoleChange: (role: TargetRole) => void;
  onScanAnother: () => void;
}

export const ScoreDashboard: React.FC<ScoreDashboardProps> = ({
  resume,
  onRoleChange,
  onScanAnother
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'warnings' | 'keywords' | 'compatibility'>('overview');
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const { scoreBreakdown } = resume;
  const overallScore = scoreBreakdown.overallScore;

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-cyber-emerald';
    if (score >= 70) return 'text-cyber-amber';
    return 'text-cyber-rose';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyword(text);
    setTimeout(() => setCopiedKeyword(null), 2000);
  };

  const handleExportReport = () => {
    const reportText = `=====================================================
RESUMETRIC AI - ATS SCORING REPORT
=====================================================
Candidate: ${resume.contact.name}
Target Role: ${resume.targetRole}
File: ${resume.fileName} (${resume.fileSize})
Date: ${new Date().toLocaleDateString()}

OVERALL ATS SCORE: ${overallScore}/100 (Grade ${scoreBreakdown.grade})
Percentile: Top ${scoreBreakdown.percentile}% of applicants
Passing Probability: ${scoreBreakdown.passingProbability}% on Workday & Lever

DIMENSIONAL BREAKDOWN:
- Tech Stack & Keywords: ${scoreBreakdown.categories.keywordMatch.score}/100
- Quantified Impact: ${scoreBreakdown.categories.impactMetrics.score}/100
- ATS Layout Readability: ${scoreBreakdown.categories.formatting.score}/100
- Seniority & Scope: ${scoreBreakdown.categories.experienceDepth.score}/100
- Action Verbs & Tone: ${scoreBreakdown.categories.actionVerbs.score}/100

DETECTED SKILLS (${resume.skills.length}):
${resume.skills.join(', ')}

KEYWORD MATCHES:
${resume.keywords.map(k => `[${k.status.toUpperCase()}] ${k.name} (${k.category})`).join('\n')}

ATS WARNINGS & RECOMMENDATIONS:
${resume.warnings.map(w => `[${w.severity.toUpperCase()}] ${w.title}\n→ ${w.recommendation}`).join('\n\n')}

COMPATIBILITY BY SYSTEM:
${resume.atsCompatibility.map(a => `${a.platform}: ${a.score}% (${a.status}) - ${a.notes}`).join('\n')}
=====================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resume.contact.name.replace(/\s+/g, '_')}_ATS_Score_Report.txt`;
    link.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  // Circular gauge geometry
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  return (
    <section id="score-section" className="py-8 sm:py-12 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Top Header Card */}
        <div className="rounded-2xl glass-panel p-4 sm:p-6 border border-surface-border shadow-2xl mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-surface-border">
            
            {/* Candidate Identity */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-brand-600 to-cyber-cyan flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-glow-brand shrink-0">
                {resume.contact.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold font-display text-white truncate">
                    {resume.contact.name}
                  </h2>
                  <span className="text-[11px] font-mono text-slate-400 bg-surface-darker px-2 py-0.5 rounded border border-surface-border">
                    {resume.fileName}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-0.5">
                  <span className="flex items-center gap-1 truncate">
                    <Mail className="w-3 h-3 text-slate-500 shrink-0" />
                    {resume.contact.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                    {resume.contact.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Target Role & Quick Actions */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
              <div className="flex items-center gap-1.5 bg-surface-darker/80 px-2.5 py-1 rounded-lg border border-surface-border">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Role:</span>
                <select
                  value={resume.targetRole}
                  onChange={(e) => onRoleChange(e.target.value as TargetRole)}
                  className="bg-transparent text-xs font-semibold text-brand-300 focus:outline-none cursor-pointer"
                >
                  <option value="Full Stack Engineer" className="bg-surface-dark text-slate-100">Full Stack Engineer</option>
                  <option value="Frontend Architect" className="bg-surface-dark text-slate-100">Frontend Architect</option>
                  <option value="Senior Product Manager" className="bg-surface-dark text-slate-100">Senior Product Manager</option>
                  <option value="Data & ML Scientist" className="bg-surface-dark text-slate-100">Data & ML Scientist</option>
                  <option value="DevOps / Cloud Architect" className="bg-surface-dark text-slate-100">DevOps / Cloud Architect</option>
                </select>
              </div>

              <button
                onClick={handleExportReport}
                className="px-3 py-1.5 text-xs font-semibold text-slate-200 bg-surface-card hover:bg-surface-cardHover border border-surface-border rounded-lg transition-all flex items-center gap-1.5"
                title="Download ATS summary text report"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-cyber-emerald" />
                    <span>Downloaded</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-brand-400" />
                    <span>Export Report</span>
                  </>
                )}
              </button>

              <button
                onClick={onScanAnother}
                className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-surface-card hover:bg-surface-cardHover border border-surface-border rounded-lg transition-all flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Upload New</span>
              </button>
            </div>

          </div>

          {/* Master Score Dial & Category Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-5 items-center">
            
            {/* Score Radial Circle */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-surface-darker/60 rounded-xl border border-surface-border text-center">
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    stroke={overallScore >= 85 ? '#10b981' : overallScore >= 70 ? '#f59e0b' : '#f43f5e'}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className={`text-3xl sm:text-4xl font-extrabold font-display ${getScoreColor(overallScore)}`}>
                    {overallScore}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    ATS Score / 100
                  </div>
                  <div className="mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-white">
                    Grade {scoreBreakdown.grade}
                  </div>
                </div>
              </div>

              <div className="mt-3 text-center">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold text-cyber-emerald bg-cyber-emerald/10 border border-cyber-emerald/20">
                  <TrendingUp className="w-3 h-3" />
                  <span>Top {scoreBreakdown.percentile}% of Applicants</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Passing Probability: <strong className="text-white">{scoreBreakdown.passingProbability}%</strong>
                </p>
              </div>
            </div>

            {/* Dimensional Category Bars */}
            <div className="md:col-span-8 space-y-2.5">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                ATS Evaluation Breakdown:
              </span>

              {Object.entries(scoreBreakdown.categories).map(([key, category]) => (
                <div 
                  key={key}
                  className="p-2.5 rounded-lg bg-surface-darker/60 border border-surface-border/80"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-200">{category.name}</span>
                    <span className={`font-bold font-mono ${getScoreColor(category.score)}`}>
                      {category.score}/100
                    </span>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-surface-border overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        category.score >= 85 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                          : category.score >= 70 
                            ? 'bg-gradient-to-r from-amber-500 to-yellow-400' 
                            : 'bg-gradient-to-r from-rose-500 to-red-400'
                      }`}
                      style={{ width: `${category.score}%` }}
                    />
                  </div>

                  <p className="text-[10px] text-slate-400 mt-1 truncate">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Detailed Tabs Card */}
        <div className="rounded-2xl glass-panel border border-surface-border shadow-2xl overflow-hidden">
          
          {/* Tab Navigation */}
          <div className="flex border-b border-surface-border bg-surface-darker/60 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-3 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shrink-0 border-b-2 ${
                activeTab === 'overview'
                  ? 'border-brand-500 text-white bg-surface-card/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4 text-brand-400" />
              <span>Extracted Profile & Skills</span>
            </button>

            <button
              onClick={() => setActiveTab('warnings')}
              className={`px-4 py-3 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shrink-0 border-b-2 ${
                activeTab === 'warnings'
                  ? 'border-cyber-rose text-white bg-surface-card/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>ATS Warnings ({resume.warnings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('keywords')}
              className={`px-4 py-3 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shrink-0 border-b-2 ${
                activeTab === 'keywords'
                  ? 'border-cyber-cyan text-white bg-surface-card/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyber-cyan" />
              <span>Keywords ({resume.keywords.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('compatibility')}
              className={`px-4 py-3 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shrink-0 border-b-2 ${
                activeTab === 'compatibility'
                  ? 'border-cyber-emerald text-white bg-surface-card/60'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-cyber-emerald" />
              <span>System Compatibility</span>
            </button>
          </div>

          {/* Tab 1: Profile & Skills */}
          {activeTab === 'overview' && (
            <div className="p-4 sm:p-6 space-y-6">
              
              {/* Summary */}
              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1.5">
                  Parsed Executive Summary
                </span>
                <p className="text-xs sm:text-sm text-slate-300 bg-surface-darker/60 p-3.5 rounded-xl border border-surface-border leading-relaxed">
                  "{resume.summary}"
                </p>
              </div>

              {/* Skills Chips */}
              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2">
                  Extracted Technical Skills ({resume.skills.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {resume.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-surface-card text-slate-200 border border-surface-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience Timeline */}
              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 block mb-3">
                  Work History & Bullet Point Impact Scores
                </span>
                <div className="space-y-3">
                  {resume.experiences.map((exp, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-xl bg-surface-darker/60 border border-surface-border"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <div>
                          <h4 className="text-sm font-bold text-white">
                            {exp.role} <span className="text-brand-400 font-semibold">• {exp.company}</span>
                          </h4>
                          <span className="text-[11px] text-slate-400">
                            {exp.period} | {exp.location}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-semibold text-cyber-emerald bg-cyber-emerald/10 px-2 py-0.5 rounded border border-cyber-emerald/20 self-start sm:self-auto">
                          Impact: {exp.impactScore}/100
                        </span>
                      </div>

                      <ul className="space-y-1.5 mt-2">
                        {exp.highlights.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-xs text-slate-300 flex items-start gap-1.5">
                            <span className="text-brand-400 mt-0.5">›</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2">
                  Education & Credentials
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {resume.education.map((edu, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-surface-darker/60 border border-surface-border text-xs">
                      <div className="font-bold text-white">{edu.degree}</div>
                      <div className="text-brand-300 mt-0.5">{edu.institution}</div>
                      <div className="text-slate-400 mt-0.5">{edu.year} {edu.honors && `(${edu.honors})`}</div>
                    </div>
                  ))}
                  {resume.certifications.length > 0 && (
                    <div className="p-3 rounded-lg bg-surface-darker/60 border border-surface-border text-xs">
                      <div className="font-bold text-white mb-1">Certifications</div>
                      {resume.certifications.map((cert, cIdx) => (
                        <div key={cIdx} className="text-slate-300 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-cyber-emerald shrink-0" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* Tab 2: ATS Warnings & Fixes */}
          {activeTab === 'warnings' && (
            <div className="p-4 sm:p-6 space-y-3">
              <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">
                Identified ATS Format Red Flags & Actionable Fixes:
              </span>

              {resume.warnings.length === 0 ? (
                <div className="p-6 text-center bg-surface-darker/40 rounded-xl">
                  <CheckCircle2 className="w-8 h-8 text-cyber-emerald mx-auto mb-1.5" />
                  <p className="text-sm font-semibold text-white">No Critical ATS Warnings!</p>
                  <p className="text-xs text-slate-400">Your format complies with standard Applicant Tracking Systems.</p>
                </div>
              ) : (
                resume.warnings.map((warn) => (
                  <div
                    key={warn.id}
                    className={`p-3.5 rounded-xl border ${
                      warn.severity === 'critical'
                        ? 'bg-rose-500/10 border-rose-500/30'
                        : warn.severity === 'warning'
                          ? 'bg-amber-500/10 border-amber-500/30'
                          : 'bg-brand-500/10 border-brand-500/30'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 shrink-0">
                        {warn.severity === 'critical' ? (
                          <AlertCircle className="w-4 h-4 text-cyber-rose" />
                        ) : warn.severity === 'warning' ? (
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                        ) : (
                          <Info className="w-4 h-4 text-brand-400" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                            {warn.title}
                          </h4>
                          <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded font-bold shrink-0 ${
                            warn.severity === 'critical'
                              ? 'bg-rose-500/20 text-rose-300'
                              : warn.severity === 'warning'
                                ? 'bg-amber-500/20 text-amber-300'
                                : 'bg-brand-500/20 text-brand-300'
                          }`}>
                            {warn.severity}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 mb-2">
                          {warn.description}
                        </p>

                        <div className="p-2 rounded-lg bg-surface-darker/80 border border-surface-border text-xs">
                          <strong className="text-white font-medium">Fix: </strong>
                          <span className="text-slate-300">{warn.recommendation}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 3: Keywords */}
          {activeTab === 'keywords' && (
            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-surface-border text-xs">
                <span className="font-semibold text-white">Target Keyword Density</span>
                <div className="flex items-center gap-3 text-[11px] font-mono">
                  <span className="text-cyber-emerald flex items-center gap-1">● Matched</span>
                  <span className="text-cyber-rose flex items-center gap-1">● Missing</span>
                  <span className="text-amber-400 flex items-center gap-1">● Recommended</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {resume.keywords.map((kw, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg border flex items-center justify-between text-xs ${
                      kw.status === 'matched'
                        ? 'bg-cyber-emerald/10 border-cyber-emerald/30 text-white'
                        : kw.status === 'missing'
                          ? 'bg-rose-500/10 border-rose-500/30 text-white'
                          : 'bg-amber-500/10 border-amber-500/30 text-white'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="font-bold truncate">{kw.name}</div>
                      <div className="text-[10px] text-slate-400 capitalize">{kw.category}</div>
                    </div>

                    <button
                      onClick={() => copyToClipboard(kw.name)}
                      className="p-1 rounded bg-surface-darker/60 hover:bg-white/10 text-slate-300 transition-colors shrink-0"
                      title="Copy keyword"
                    >
                      {copiedKeyword === kw.name ? (
                        <Check className="w-3.5 h-3.5 text-cyber-emerald" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Platform Compatibility */}
          {activeTab === 'compatibility' && (
            <div className="p-4 sm:p-6 space-y-3">
              <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">
                Compatibility by Enterprise ATS Platform:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {resume.atsCompatibility.map((ats, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-surface-darker/60 border border-surface-border text-xs"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-brand-400" />
                        <span className="font-bold text-white">{ats.platform}</span>
                      </div>
                      <span className={`font-mono font-bold ${getScoreColor(ats.score)}`}>
                        {ats.score}% Match
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      {ats.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
