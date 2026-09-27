import { useState } from 'react';
import confetti from 'canvas-confetti';
import type { ParsedResume, TargetRole } from './types/resume';
import { SAMPLE_RESUMES, simulateCustomUpload } from './data/sampleResumes';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ResumeDropzone } from './components/ResumeDropzone';
import { ScoreDashboard } from './components/ScoreDashboard';
import { Footer } from './components/Footer';

export function App() {
  const [currentResume, setCurrentResume] = useState<ParsedResume | null>(SAMPLE_RESUMES['fullstack']);
  const [selectedRole, setSelectedRole] = useState<TargetRole>('Full Stack Engineer');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981', '#06b6d4', '#f59e0b']
      });
    } catch {
      // Fallback gracefully
    }
  };

  const handleSelectSample = (sampleKey: string) => {
    const sample = SAMPLE_RESUMES[sampleKey] || SAMPLE_RESUMES['fullstack'];
    setIsAnalyzing(true);
    setAnalysisStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setAnalysisStep(step);

      if (step >= 4) {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentResume(sample);
          setSelectedRole(sample.targetRole);
          setIsAnalyzing(false);
          fireConfetti();

          const el = document.getElementById('score-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 400);
      }
    }, 350);
  };

  const handleFileUpload = (file: File, role: TargetRole) => {
    setIsAnalyzing(true);
    setAnalysisStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setAnalysisStep(step);

      if (step >= 4) {
        clearInterval(interval);
        setTimeout(() => {
          const parsed = simulateCustomUpload(file.name, file.size, role);
          setCurrentResume(parsed);
          setIsAnalyzing(false);
          fireConfetti();

          const el = document.getElementById('score-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 400);
      }
    }, 400);
  };

  const handleRoleChange = (role: TargetRole) => {
    setSelectedRole(role);
    if (currentResume) {
      setCurrentResume({
        ...currentResume,
        targetRole: role
      });
    }
  };

  const scrollToScanner = () => {
    const el = document.getElementById('upload-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-surface-darker text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white overflow-x-hidden">
      {/* Sticky Header */}
      <Navbar 
        onLoadSample={handleSelectSample} 
        onScrollToScanner={scrollToScanner}
        hasScoredResume={!!currentResume}
      />

      <main className="flex-1">
        {/* Focused Hero Section */}
        <Hero 
          onScanClick={scrollToScanner} 
          onSampleClick={handleSelectSample} 
        />

        {/* Drag & Drop Resume Upload / Parser */}
        <ResumeDropzone
          onFileUpload={handleFileUpload}
          onSelectSample={handleSelectSample}
          selectedRole={selectedRole}
          onRoleChange={handleRoleChange}
          isAnalyzing={isAnalyzing}
          currentStep={analysisStep}
        />

        {/* Real-time ATS Score & Breakdown Dashboard */}
        {currentResume && (
          <ScoreDashboard
            resume={currentResume}
            onRoleChange={handleRoleChange}
            onScanAnother={scrollToScanner}
          />
        )}
      </main>

      {/* Clean Compact Footer */}
      <Footer />
    </div>
  );
}

export default App;
