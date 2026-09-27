export interface ResumeKeyword {
  term: string;
  status: 'matched' | 'partial' | 'missing';
  evidence: string;
}

export interface ResumeStrength {
  title: string;
  evidence: string;
}

export interface ResumeSuggestion {
  priority: 'high' | 'medium' | 'low';
  title: string;
  rationale: string;
  rewriteExample: string;
}

export interface ResumeAnalysis {
  score: number;
  verdict: string;
  summary: string;
  strengths: ResumeStrength[];
  keywords: ResumeKeyword[];
  suggestions: ResumeSuggestion[];
  interviewAngle: string;
}