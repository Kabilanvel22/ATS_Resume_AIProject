import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  CheckCircle, 
  Loader2, 
  Cpu, 
  Code2, 
  Briefcase, 
  Binary,
  FileCheck
} from 'lucide-react';
import type { TargetRole } from '../types/resume';

interface ResumeDropzoneProps {
  onFileUpload: (file: File, role: TargetRole) => void;
  onSelectSample: (sampleKey: string) => void;
  selectedRole: TargetRole;
  onRoleChange: (role: TargetRole) => void;
  isAnalyzing: boolean;
  currentStep: number;
}

export const ResumeDropzone: React.FC<ResumeDropzoneProps> = ({
  onFileUpload,
  onSelectSample,
  selectedRole,
  onRoleChange,
  isAnalyzing,
  currentStep
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const availableRoles: TargetRole[] = [
    'Full Stack Engineer',
    'Frontend Architect',
    'Senior Product Manager',
    'Data & ML Scientist',
    'DevOps / Cloud Architect'
  ];

  const parsingSteps = [
    'Extracting document text and layout hierarchy...',
    'Analyzing technical skills, tools & experience timeline...',
    'Scoring impact metrics and action verb strength...',
    'Running Workday & Greenhouse compatibility heuristics...',
    'Compiling composite ATS score & recommendations...'
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setSelectedFileName(file.name);
    onFileUpload(file, selectedRole);
  };

  return (
    <section id="upload-section" className="py-10 sm:py-16 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Scanner</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
            Upload Your Resume
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
            Select your target career track and drop your file for immediate parsing and scoring.
          </p>
        </div>

        {/* Target Role Selector */}
        <div className="mb-6">
          <label className="block text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 text-center">
            Benchmark Role:
          </label>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {availableRoles.map((role) => (
              <button
                key={role}
                onClick={() => onRoleChange(role)}
                disabled={isAnalyzing}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedRole === role
                    ? 'bg-brand-600 text-white shadow-glow-brand border border-brand-400'
                    : 'bg-surface-card hover:bg-surface-cardHover text-slate-400 hover:text-white border border-surface-border'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Dropzone Container */}
        <div className="rounded-2xl glass-panel p-5 sm:p-8 border border-surface-border shadow-xl">
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            accept=".pdf,.docx,.doc,.txt"
            className="hidden"
          />

          {!isAnalyzing ? (
            <div>
              {/* Drop Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 sm:p-10 text-center cursor-pointer transition-all ${
                  isDragOver
                    ? 'border-brand-400 bg-brand-500/10'
                    : 'border-surface-border/80 hover:border-brand-500/50 hover:bg-surface-card/40'
                }`}
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-surface-card border border-brand-500/30 flex items-center justify-center mb-3 shadow-glow-brand">
                    <UploadCloud className="w-6 h-6 sm:w-7 sm:h-7 text-brand-400" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                    Drag and drop resume here, or <span className="text-brand-400 underline decoration-brand-400/50">browse</span>
                  </h3>
                  
                  <p className="text-xs text-slate-400 max-w-sm mb-3">
                    Supports PDF, DOCX, or TXT (Max 15MB). Processed client-side in real time.
                  </p>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-darker text-[11px] font-mono text-slate-400 border border-surface-border">
                    <FileCheck className="w-3.5 h-3.5 text-cyber-emerald" />
                    <span>Auto-detects contact, skills & impact metrics</span>
                  </span>
                </div>
              </div>

              {/* Sample Presets */}
              <div className="mt-6 pt-5 border-t border-surface-border/60">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                  <span className="text-xs text-slate-400">
                    Or test with a pre-configured sample:
                  </span>

                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      onClick={() => onSelectSample('fullstack')}
                      className="px-2.5 py-1.5 rounded-lg bg-surface-card hover:bg-surface-cardHover border border-brand-500/30 text-xs text-slate-200 transition-all flex items-center gap-1.5"
                    >
                      <Code2 className="w-3.5 h-3.5 text-brand-400" />
                      <span>Staff SWE (Score: 94)</span>
                    </button>

                    <button
                      onClick={() => onSelectSample('product')}
                      className="px-2.5 py-1.5 rounded-lg bg-surface-card hover:bg-surface-cardHover border border-amber-500/30 text-xs text-slate-200 transition-all flex items-center gap-1.5"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                      <span>Product Manager (Score: 78)</span>
                    </button>

                    <button
                      onClick={() => onSelectSample('datascience')}
                      className="px-2.5 py-1.5 rounded-lg bg-surface-card hover:bg-surface-cardHover border border-cyber-cyan/30 text-xs text-slate-200 transition-all flex items-center gap-1.5"
                    >
                      <Binary className="w-3.5 h-3.5 text-cyber-cyan" />
                      <span>ML Scientist (Score: 89)</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* Parsing Progress Stepper */
            <div className="py-6 px-2 text-center">
              <div className="inline-flex p-3 rounded-xl bg-brand-500/10 border border-brand-500/30 shadow-glow-brand mb-4">
                <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
              </div>

              <h3 className="text-lg font-bold font-display text-white mb-1">
                Parsing Resume Document
              </h3>
              
              <p className="text-xs text-slate-400 mb-6 font-mono">
                {selectedFileName || 'Analyzing document...'}
              </p>

              <div className="max-w-md mx-auto space-y-2 text-left">
                {parsingSteps.map((stepText, idx) => {
                  const isDone = idx < currentStep;
                  const isCurrent = idx === currentStep;
                  return (
                    <div 
                      key={idx} 
                      className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs font-medium transition-all ${
                        isDone 
                          ? 'bg-cyber-emerald/10 border-cyber-emerald/30 text-cyber-emerald' 
                          : isCurrent 
                            ? 'bg-brand-500/15 border-brand-500/40 text-white shadow-glow-brand/20' 
                            : 'bg-surface-darker/40 border-surface-border text-slate-500'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle className="w-3.5 h-3.5 text-cyber-emerald shrink-0" />
                      ) : isCurrent ? (
                        <Loader2 className="w-3.5 h-3.5 text-brand-400 animate-spin shrink-0" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0" />
                      )}
                      <span className="truncate">{stepText}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
