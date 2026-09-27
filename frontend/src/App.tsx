import { useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, FileText, LoaderCircle, LockKeyhole, ScanSearch, Sparkles, Upload, X } from 'lucide-react';
import type { ResumeAnalysis } from './lib/resumeAnalysis';
import './workspace.css';

const MAX_FILE_SIZE = 4 * 1024 * 1024;

interface AnalysisResponse {
  success: boolean;
  data?: { analysis?: ResumeAnalysis };
  error?: { message?: string };
}

export function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const selectFile = (file?: File) => {
    if (!file) return;
    setErrorMessage('');
    setAnalysis(null);

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setResumeFile(null);
      setErrorMessage('Choose a PDF file to continue.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setResumeFile(null);
      setErrorMessage('This file is over 4 MB. Choose a smaller PDF.');
      return;
    }
    setResumeFile(file);
  };

  const handleAnalyze = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!resumeFile || !jobDescription.trim()) return;

    setIsAnalyzing(true);
    setErrorMessage('');
    setAnalysis(null);

    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('jobDescription', jobDescription.trim());
      const response = await fetch('/api/resume/analyze', { method: 'POST', body: formData });
      const payload = await response.json() as AnalysisResponse;
      const result = payload.data?.analysis;

      if (!response.ok || !payload.success || !result) {
        throw new Error(payload.error?.message ?? 'The resume could not be analyzed. Please try again.');
      }

      setAnalysis(result);
      window.setTimeout(() => document.getElementById('analysis-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearFile = () => {
    setResumeFile(null);
    setAnalysis(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="ResuMetric home">
          <span className="wordmark-icon"><ScanSearch size={19} strokeWidth={2.2} /></span>
          <span>resume<span className="wordmark-accent">metric</span></span>
        </a>
        <div className="privacy-note"><LockKeyhole size={14} /><span>AI-assisted review via OpenRouter</span></div>
      </header>

      <main id="top" className="workspace">
        <section className="page-intro" aria-labelledby="page-title">
          <div>
            <p className="eyebrow"><span className="eyebrow-mark" /> RESUME WORKSPACE</p>
            <h1 id="page-title">Find the gaps before you apply.</h1>
            <p className="intro-copy">Compare your resume with a specific job description and get a focused list of terms to strengthen.</p>
          </div>
          <span className="review-stamp">PDF <span>/</span> UP TO 4 MB</span>
        </section>

        <form className="analysis-form" onSubmit={handleAnalyze}>
          <div className="input-grid">
            <section className="input-section resume-section" aria-labelledby="resume-heading">
              <div className="section-heading">
                <span className="section-index">01</span>
                <div><h2 id="resume-heading">Your resume</h2><p>Upload a PDF to extract its text.</p></div>
              </div>

              <label
                className={`upload-zone${isDragging ? ' is-dragging' : ''}${resumeFile ? ' has-file' : ''}`}
                onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(event) => { event.preventDefault(); setIsDragging(false); selectFile(event.dataTransfer.files[0]); }}
              >
                <input
                  ref={fileInputRef}
                  className="file-input"
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={(event) => selectFile(event.currentTarget.files?.[0])}
                  aria-describedby="upload-hint"
                />
                <span className="upload-icon">{resumeFile ? <FileText size={22} /> : <Upload size={22} />}</span>
                <span className="upload-copy">
                  <strong>{resumeFile ? resumeFile.name : 'Drop your resume here'}</strong>
                  <span>{resumeFile ? `${(resumeFile.size / 1024).toFixed(0)} KB · PDF` : 'or choose a PDF from your device'}</span>
                </span>
                <span className="browse-label">{resumeFile ? 'Change' : 'Browse'}</span>
              </label>
              <p id="upload-hint" className="field-hint">PDF only. Maximum file size 4 MB.</p>
              {resumeFile && <button className="remove-file" type="button" onClick={clearFile}><X size={14} /> Remove file</button>}
            </section>

            <section className="input-section description-section" aria-labelledby="description-heading">
              <div className="section-heading">
                <span className="section-index">02</span>
                <div><h2 id="description-heading">Job description</h2><p>Paste the role you’re applying for.</p></div>
              </div>
              <label className="visually-hidden" htmlFor="job-description">Job description text</label>
              <textarea
                id="job-description"
                value={jobDescription}
                onChange={(event) => { setJobDescription(event.target.value); setAnalysis(null); }}
                placeholder="Paste the responsibilities, skills, and qualifications from the job listing…"
                rows={8}
                maxLength={12000}
                required
              />
              <div className="textarea-footer"><span>Include the full listing for a more useful comparison.</span><span>{jobDescription.length} chars</span></div>
            </section>
          </div>

          <div className="form-actions">
            <p className="privacy-detail"><LockKeyhole size={14} /> Resume text and job description are sent to OpenRouter for AI analysis.</p>
            <button className="analyze-button" type="submit" disabled={!resumeFile || !jobDescription.trim() || isAnalyzing}>
              {isAnalyzing ? <LoaderCircle className="spinner" size={17} /> : <Sparkles size={17} />}
              <span>{isAnalyzing ? 'Building your review…' : 'Analyze with AI'}</span>
              {!isAnalyzing && <ArrowUpRight size={16} />}
            </button>
          </div>
          {errorMessage && <p className="error-message" role="alert">{errorMessage}</p>}
        </form>

        <section id="analysis-results" className="results-section" aria-live="polite" aria-labelledby="results-heading">
          <div className="results-heading-row">
            <div><p className="eyebrow"><span className="eyebrow-mark" /> YOUR REVIEW</p><h2 id="results-heading">Resume match</h2></div>
            {analysis && <span className="result-label">BASED ON YOUR DOCUMENTS</span>}
          </div>

          {!analysis ? (
            <div className="empty-results"><span className="empty-icon"><FileText size={20} /></span><p>Your match report will appear here after you compare a resume and job description.</p></div>
          ) : (
            <div className="report-grid">
              <section className="analysis-overview" aria-label="AI review summary">
                <div className="overview-orbit"><Sparkles size={18} /><span>AI BRIEF</span></div>
                <div><span className="score-kicker">THE READ</span><h3>{analysis.verdict}</h3><p>{analysis.summary}</p></div>
              </section>

              <section className="score-summary" aria-label="Keyword fit score">
                <div className="score-ring" style={{ background: `conic-gradient(var(--accent) ${analysis.score * 3.6}deg, var(--line) 0deg)` }} role="img" aria-label={`Keyword fit ${analysis.score} out of 100`}>
                  <div className="score-ring-center"><strong>{analysis.score}</strong><span>OUT OF 100</span></div>
                </div>
                <div className="score-copy"><span className="score-kicker">EVIDENCE ALIGNMENT</span><h3>{analysis.verdict}</h3><p>{analysis.keywords.filter((keyword) => keyword.status === 'matched').length} clear matches across {analysis.keywords.length} role-specific signals.</p></div>
                <p className="score-caveat">An AI-assisted estimate, not an ATS score or hiring prediction.</p>
              </section>

              <section className="keyword-review" aria-labelledby="keyword-heading">
                <div className="result-subhead"><div><span className="section-index">03</span><h3 id="keyword-heading">Role signals</h3></div><span>{analysis.keywords.length} signals</span></div>
                <div className="keyword-list">
                  {analysis.keywords.map((keyword) => <span key={keyword.term} className={`keyword-tag ${keyword.status}`} title={keyword.evidence || undefined}><span className="tag-mark">{keyword.status === 'matched' ? <Check size={12} /> : <span />}</span>{keyword.term}</span>)}
                </div>
                <div className="tag-legend"><span><i className="legend-dot matched-dot" /> Evidenced</span><span><i className="legend-dot partial-dot" /> Adjacent</span><span><i className="legend-dot missing-dot" /> Not found</span></div>
              </section>

              <section className="strengths" aria-labelledby="strengths-heading">
                <div className="result-subhead"><div><span className="section-index">02</span><h3 id="strengths-heading">What already lands</h3></div><span>{analysis.strengths.length} strengths</span></div>
                {analysis.strengths.length ? <div className="strength-grid">{analysis.strengths.map((strength) => <article className="strength-item" key={strength.title}><span className="strength-spark"><Sparkles size={13} /></span><h4>{strength.title}</h4><p>{strength.evidence}</p></article>)}</div> : <p className="no-strengths">The review found no clearly evidenced strengths to highlight yet.</p>}
              </section>

              <section className="suggestions" aria-labelledby="suggestions-heading">
                <div className="result-subhead"><div><span className="section-index">04</span><h3 id="suggestions-heading">Your next edits</h3></div><span>{analysis.suggestions.length} actions</span></div>
                <ol className="suggestion-list">{analysis.suggestions.map((suggestion, index) => <li key={`${suggestion.title}-${index}`}><span className={`priority-mark ${suggestion.priority}`}>{suggestion.priority}</span><div className="suggestion-copy"><h4>{suggestion.title}</h4><p>{suggestion.rationale}</p>{suggestion.rewriteExample && <blockquote>{suggestion.rewriteExample}</blockquote>}</div></li>)}</ol>
              </section>

              <aside className="interview-angle"><span className="score-kicker">A STORY TO LEAD WITH</span><p>{analysis.interviewAngle}</p></aside>
            </div>
          )}
        </section>

        <footer className="page-footer"><span>RESUMEMETRIC</span><span>NVIDIA Nemotron 3 Super via OpenRouter · Review based on your supplied documents.</span></footer>
      </main>
    </div>
  );
}

export default App;
