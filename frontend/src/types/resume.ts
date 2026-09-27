export type TargetRole = 
  | 'Full Stack Engineer' 
  | 'Frontend Architect' 
  | 'Senior Product Manager' 
  | 'Data & ML Scientist' 
  | 'DevOps / Cloud Architect';

export interface CategoryScore {
  name: string;
  score: number; // 0 - 100
  weight: number; // percentage
  status: 'excellent' | 'good' | 'warning' | 'critical';
  description: string;
  tips: string;
}

export interface ScoreBreakdown {
  overallScore: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D';
  percentile: number; // e.g. top 8% of applicants
  passingProbability: number; // 0 - 100%
  categories: {
    keywordMatch: CategoryScore;
    impactMetrics: CategoryScore;
    formatting: CategoryScore;
    experienceDepth: CategoryScore;
    actionVerbs: CategoryScore;
  };
}

export interface ExtractedContact {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface ExtractedExperience {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
  impactScore: number;
}

export interface ExtractedEducation {
  degree: string;
  institution: string;
  year: string;
  honors?: string;
}

export interface KeywordMatch {
  name: string;
  category: 'core' | 'frameworks' | 'cloud' | 'architecture' | 'management';
  status: 'matched' | 'missing' | 'recommended';
  relevance: 'high' | 'medium';
}

export interface ATSWarning {
  id: string;
  severity: 'critical' | 'warning' | 'tip';
  title: string;
  description: string;
  recommendation: string;
  affectedSection: string;
}

export interface AtsCompatibility {
  platform: 'Workday' | 'Greenhouse' | 'Lever' | 'Taleo' | 'BambooHR';
  score: number;
  status: 'optimal' | 'acceptable' | 'risk';
  notes: string;
}

export interface ParsedResume {
  id: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  targetRole: TargetRole;
  contact: ExtractedContact;
  summary: string;
  skills: string[];
  experiences: ExtractedExperience[];
  education: ExtractedEducation[];
  certifications: string[];
  scoreBreakdown: ScoreBreakdown;
  keywords: KeywordMatch[];
  warnings: ATSWarning[];
  atsCompatibility: AtsCompatibility[];
}
