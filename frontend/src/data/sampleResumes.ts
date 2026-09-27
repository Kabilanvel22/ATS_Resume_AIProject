import type { ParsedResume, TargetRole } from '../types/resume';

export const SAMPLE_RESUMES: Record<string, ParsedResume> = {
  'fullstack': {
    id: 'sample-fullstack',
    fileName: 'Alex_Chen_Staff_Engineer_Resume.pdf',
    fileSize: '142 KB',
    uploadedAt: 'Just now',
    targetRole: 'Full Stack Engineer',
    contact: {
      name: 'Alex Chen',
      email: 'alex.chen.dev@gmail.com',
      phone: '+1 (415) 892-4412',
      location: 'San Francisco, CA (Open to Remote)',
      linkedin: 'linkedin.com/in/alexchen-dev',
      github: 'github.com/alexchen-cloud',
      portfolio: 'alexchen.engineering',
    },
    summary: 'High-impact Staff Full Stack Software Engineer with 7+ years of expertise scaling microservices, distributed systems, and real-time React web applications. Proven track record leading multi-disciplinary teams that increased platform availability to 99.99% and slashed cloud infrastructure latency by 45%.',
    skills: [
      'React 18/19', 'TypeScript', 'Node.js', 'Next.js', 'Go', 'GraphQL', 
      'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS (EKS, Lambda)', 
      'Distributed Systems', 'CI/CD Pipelines', 'Tailwind CSS', 'Kafka'
    ],
    experiences: [
      {
        role: 'Staff Full Stack Engineer',
        company: 'HyperScale Cloud Labs',
        period: '2022 - Present',
        location: 'San Francisco, CA',
        highlights: [
          'Spearheaded transition of monolithic core API into Go-based microservices, reducing p99 response times from 340ms to 48ms for 4.2M daily users.',
          'Architected real-time telemetry dashboard using React, TypeScript, and WebSockets, cutting incident triage MTTR by 35%.',
          'Mentored 8 senior and mid-level engineers, establishing RFC review processes and zero-downtime canary deployment practices.',
          'Reduced AWS compute expenses by $180,000 annually through intelligent container auto-scaling and Redis caching layers.'
        ],
        impactScore: 96
      },
      {
        role: 'Senior Software Engineer',
        company: 'Stratos Fintech Solutions',
        period: '2019 - 2022',
        location: 'San Jose, CA',
        highlights: [
          'Engineered bank-grade payment processing pipeline handling $45M+ in monthly transaction volume with zero loss.',
          'Implemented end-to-end automated testing suite with Jest & Playwright, expanding test coverage from 44% to 91%.',
          'Collaborated with compliance and security teams to achieve SOC-2 Type II and PCI-DSS Level 1 compliance.'
        ],
        impactScore: 90
      }
    ],
    education: [
      {
        degree: 'B.S. in Computer Science',
        institution: 'University of California, Berkeley',
        year: '2015 - 2019',
        honors: 'Magna Cum Laude (GPA: 3.86/4.0)'
      }
    ],
    certifications: [
      'AWS Certified Solutions Architect – Professional',
      'Certified Kubernetes Administrator (CKA)'
    ],
    scoreBreakdown: {
      overallScore: 94,
      grade: 'A+',
      percentile: 4, // Top 4%
      passingProbability: 98,
      categories: {
        keywordMatch: {
          name: 'Tech Stack & Keywords',
          score: 96,
          weight: 30,
          status: 'excellent',
          description: 'Strong alignment with high-demand cloud and distributed systems keywords.',
          tips: 'Consider adding gRPC and OpenTelemetry for maximum enterprise indexing.'
        },
        impactMetrics: {
          name: 'Quantified Impact',
          score: 95,
          weight: 25,
          status: 'excellent',
          description: 'Nearly every bullet item highlights concrete percentages, dollar savings, or latency improvements.',
          tips: 'Consistently follows the Google X-Y-Z formula (Accomplished [X], measured by [Y], by doing [Z]).'
        },
        formatting: {
          name: 'ATS Readability & Layout',
          score: 94,
          weight: 20,
          status: 'excellent',
          description: 'Single-column structure, standard section headers, clean UTF-8 text with no unparseable tables.',
          tips: 'Perfect formatting for Taleo and Workday OCR parsers.'
        },
        experienceDepth: {
          name: 'Seniority & Scope',
          score: 92,
          weight: 15,
          status: 'excellent',
          description: 'Clear career trajectory with escalating leadership, architecture, and mentoring responsibilities.',
          tips: 'Scope of work reflects Staff/Lead level responsibilities.'
        },
        actionVerbs: {
          name: 'Power Verbs & Tone',
          score: 91,
          weight: 10,
          status: 'excellent',
          description: 'Strong leadership action verbs (Spearheaded, Architected, Engineered, Mentored).',
          tips: 'Minimal passive voice detected (0.2%).'
        }
      }
    },
    keywords: [
      { name: 'React & TypeScript', category: 'frameworks', status: 'matched', relevance: 'high' },
      { name: 'Distributed Systems', category: 'architecture', status: 'matched', relevance: 'high' },
      { name: 'AWS & Kubernetes', category: 'cloud', status: 'matched', relevance: 'high' },
      { name: 'Microservices & Go', category: 'core', status: 'matched', relevance: 'high' },
      { name: 'Redis Caching', category: 'core', status: 'matched', relevance: 'high' },
      { name: 'CI/CD Pipelines', category: 'cloud', status: 'matched', relevance: 'high' },
      { name: 'gRPC Protobuf', category: 'architecture', status: 'recommended', relevance: 'medium' },
      { name: 'Terraform / IaC', category: 'cloud', status: 'missing', relevance: 'high' },
      { name: 'System Observability', category: 'architecture', status: 'recommended', relevance: 'medium' }
    ],
    warnings: [
      {
        id: 'warn-1',
        severity: 'tip',
        title: 'Include Infrastructure-as-Code (Terraform)',
        description: 'Target roles in your tier frequently search for "Terraform" or "CloudFormation" alongside Kubernetes.',
        recommendation: 'Mention how your EKS and microservices clusters were provisioned in your HyperScale experience.',
        affectedSection: 'Experience - HyperScale Cloud Labs'
      },
      {
        id: 'warn-2',
        severity: 'tip',
        title: 'Add OpenTelemetry or APM Keywords',
        description: 'Your telemetry dashboard bullet point is strong, but adding standard tooling terms boosts keyword indexing.',
        recommendation: 'Specifically cite Datadog, Prometheus, or Grafana if used.',
        affectedSection: 'Skills & Experience'
      }
    ],
    atsCompatibility: [
      { platform: 'Workday', score: 98, status: 'optimal', notes: 'Flawless single-column text extraction; all fields mapped to canonical taxonomy.' },
      { platform: 'Greenhouse', score: 96, status: 'optimal', notes: 'High skill frequency match across core engineering criteria.' },
      { platform: 'Lever', score: 95, status: 'optimal', notes: 'Clean date ranges and role titles mapped without parsing collisions.' },
      { platform: 'Taleo', score: 92, status: 'optimal', notes: 'Standard heading conventions bypass legacy Oracle heuristic blockers.' },
      { platform: 'BambooHR', score: 97, status: 'optimal', notes: 'All contact details and experience records parsed in under 200ms.' }
    ]
  },

  'product': {
    id: 'sample-product',
    fileName: 'Samantha_Vance_Product_Leader.docx',
    fileSize: '89 KB',
    uploadedAt: '5 mins ago',
    targetRole: 'Senior Product Manager',
    contact: {
      name: 'Samantha Vance',
      email: 'samantha.vance.pm@outlook.com',
      phone: '+1 (206) 555-0199',
      location: 'Seattle, WA',
      linkedin: 'linkedin.com/in/samanthavance-pm',
    },
    summary: 'Data-driven Product Leader with 6+ years driving B2B SaaS growth, user engagement, and product discovery. Led end-to-end product lifecycles from zero to 1.8M ARR, partnering with engineering, UX research, and enterprise sales.',
    skills: [
      'Product Strategy', 'Roadmapping', 'Agile / Scrum', 'SQL & Amplitude', 
      'A/B Experimentation', 'User Research', 'GTM Strategy', 'Figma', 
      'Customer Discovery', 'Jira', 'Pricing & Packaging'
    ],
    experiences: [
      {
        role: 'Senior Product Manager',
        company: 'PulseMetric SaaS',
        period: '2021 - Present',
        location: 'Seattle, WA',
        highlights: [
          'Defined and executed 18-month product roadmap for core analytics engine, driving 42% YoY expansion revenue ($2.4M ARR).',
          'Spearheaded 24+ multivariate experiments, lifting self-serve onboarding conversion by 28.5%.',
          'Partnered with 14-person engineering squad to deliver automated reporting suite on schedule.',
          'Gathered voice-of-customer insights across 60+ enterprise buyer interviews to refine tier pricing.'
        ],
        impactScore: 82
      },
      {
        role: 'Product Manager',
        company: 'OmniFlow Tech',
        period: '2018 - 2021',
        location: 'Portland, OR',
        highlights: [
          'Managed workflow automation feature set from ideation to launch with 120,000 monthly active users.',
          'Reduced user churn from 4.8% to 2.9% by redesigning customer feedback loop and in-app onboarding guides.'
        ],
        impactScore: 74
      }
    ],
    education: [
      {
        degree: 'B.A. in Economics & Business Administration',
        institution: 'University of Washington',
        year: '2014 - 2018'
      }
    ],
    certifications: [
      'Reforge Growth Series Graduate',
      'Pragmatic Institute Certified (PMC-III)'
    ],
    scoreBreakdown: {
      overallScore: 78,
      grade: 'B+',
      percentile: 22,
      passingProbability: 76,
      categories: {
        keywordMatch: {
          name: 'Tech Stack & Keywords',
          score: 72,
          weight: 30,
          status: 'warning',
          description: 'Missing key technical collaboration metrics (APIs, Technical PRDs, AI/ML integrations).',
          tips: 'Add keywords like PRD ownership, API integrations, and North Star Metric tracking.'
        },
        impactMetrics: {
          name: 'Quantified Impact',
          score: 84,
          weight: 25,
          status: 'good',
          description: 'Good revenue and conversion percentages; could deepen CAC/LTV or retention metrics.',
          tips: 'Highlight CAC reduction and Gross Margin impact if applicable.'
        },
        formatting: {
          name: 'ATS Readability & Layout',
          score: 79,
          weight: 20,
          status: 'warning',
          description: 'Slight header formatting irregularity in Work history section detected by parser.',
          tips: 'Ensure role date formats use consistent standard notation (e.g. "MMM YYYY - MMM YYYY").'
        },
        experienceDepth: {
          name: 'Seniority & Scope',
          score: 80,
          weight: 15,
          status: 'good',
          description: 'Demonstrated ownership of product roadmaps and engineering team synchronization.',
          tips: 'Highlight direct interaction with C-suite and board presentations.'
        },
        actionVerbs: {
          name: 'Power Verbs & Tone',
          score: 77,
          weight: 10,
          status: 'good',
          description: 'Good action verbs; avoid repeated words like "Managed" and "Partnered".',
          tips: 'Swap "Managed" with "Orchestrated", "Catalyzed", or "Spearheaded".'
        }
      }
    },
    keywords: [
      { name: 'Product Strategy & Roadmapping', category: 'management', status: 'matched', relevance: 'high' },
      { name: 'A/B Testing & Amplitude', category: 'core', status: 'matched', relevance: 'high' },
      { name: 'GTM & Enterprise Sales', category: 'management', status: 'matched', relevance: 'high' },
      { name: 'Agile & Jira', category: 'core', status: 'matched', relevance: 'high' },
      { name: 'API Integrations & Technical PRD', category: 'architecture', status: 'missing', relevance: 'high' },
      { name: 'Customer Lifetime Value (LTV/CAC)', category: 'management', status: 'missing', relevance: 'high' },
      { name: 'AI Product Strategy', category: 'core', status: 'recommended', relevance: 'medium' }
    ],
    warnings: [
      {
        id: 'warn-p1',
        severity: 'critical',
        title: 'Missing Technical PRD & Architecture Collaboration Keywords',
        description: 'Top enterprise ATS algorithms for Senior PM roles screen for technical depth (e.g., API specifications, backend integrations).',
        recommendation: 'Mention collaborating with architects on API contracts and data models.',
        affectedSection: 'Experience - PulseMetric SaaS'
      },
      {
        id: 'warn-p2',
        severity: 'warning',
        title: 'Action Verb Repetition ("Partnered", "Managed")',
        description: 'Using the same passive verb reduces parser semantic richness score.',
        recommendation: 'Replace "Partnered with 14-person engineering squad" with "Led cross-functional synchronization across 14 engineers and designers".',
        affectedSection: 'Experience - PulseMetric SaaS'
      }
    ],
    atsCompatibility: [
      { platform: 'Workday', score: 81, status: 'acceptable', notes: 'Text parsed cleanly; keyword density score slightly below tier-1 cutoff.' },
      { platform: 'Greenhouse', score: 79, status: 'acceptable', notes: 'Standard role hierarchy recognized with minor title variance warning.' },
      { platform: 'Lever', score: 82, status: 'acceptable', notes: 'Skills extracted accurately from bullet text.' },
      { platform: 'Taleo', score: 71, status: 'risk', notes: 'Non-standard bullet indentation might cause line grouping delays.' },
      { platform: 'BambooHR', score: 85, status: 'optimal', notes: 'Fast parse; all experience blocks mapped cleanly.' }
    ]
  },

  'datascience': {
    id: 'sample-datascience',
    fileName: 'Dr_David_Miller_AI_Scientist.pdf',
    fileSize: '168 KB',
    uploadedAt: '12 mins ago',
    targetRole: 'Data & ML Scientist',
    contact: {
      name: 'David Miller, Ph.D.',
      email: 'd.miller.ai@research.io',
      phone: '+1 (617) 401-9231',
      location: 'Boston, MA (Remote Eligible)',
      github: 'github.com/davidmiller-ml',
      portfolio: 'scholar.google.com/citations?user=davidmiller',
    },
    summary: 'Lead Data & Machine Learning Scientist with Ph.D. in Computer Science and 6+ years deploying LLM fine-tuning, retrieval-augmented generation (RAG), and predictive models into production. Author of 7 peer-reviewed papers with 450+ citations.',
    skills: [
      'Python', 'PyTorch', 'TensorFlow', 'LLMs / Transformers', 'LangChain', 
      'RAG Architecture', 'Vector Databases (Pinecone, Qdrant)', 'MLOps', 
      'Kubeflow', 'Spark', 'SQL', 'Hugging Face', 'Docker', 'AWS SageMaker'
    ],
    experiences: [
      {
        role: 'Lead ML Scientist',
        company: 'NeuroCognitive AI',
        period: '2021 - Present',
        location: 'Boston, MA',
        highlights: [
          'Engineered enterprise RAG platform with hybrid sparse-dense embeddings, improving retrieval precision by 38% and reducing LLM hallucinations by 64%.',
          'Fine-tuned domain-specific 70B parameter models using LoRA/QLoRA on GPU clusters, cutting inference serving costs by $240K/year.',
          'Designed automated model evaluation pipeline with LangSmith and continuous regression testing across 50,000 benchmark queries.'
        ],
        impactScore: 92
      },
      {
        role: 'Senior Machine Learning Engineer',
        company: 'QuantData Analytics',
        period: '2018 - 2021',
        location: 'Cambridge, MA',
        highlights: [
          'Deployed real-time fraud detection gradient boosted tree models on Kubernetes serving 12,000 QPS with sub-15ms latency.',
          'Built scalable data preprocessing pipeline on Apache Spark, shrinking training data preparation from 18 hours to 2.5 hours.'
        ],
        impactScore: 87
      }
    ],
    education: [
      {
        degree: 'Ph.D. in Computer Science (Machine Learning Focus)',
        institution: 'Massachusetts Institute of Technology (MIT)',
        year: '2014 - 2018',
        honors: 'Dissertation on Efficient Attention Mechanisms for Sparse Transformers'
      }
    ],
    certifications: [
      'NVIDIA Deep Learning Institute Certified Instructor',
      'AWS Certified Machine Learning – Specialty'
    ],
    scoreBreakdown: {
      overallScore: 89,
      grade: 'A',
      percentile: 7,
      passingProbability: 92,
      categories: {
        keywordMatch: {
          name: 'Tech Stack & Keywords',
          score: 93,
          weight: 30,
          status: 'excellent',
          description: 'Cutting-edge AI/ML keywords (LoRA, RAG, Transformers, Vector DBs, PyTorch).',
          tips: 'Add ONNX, TensorRT, or vLLM to demonstrate high-throughput inference optimization.'
        },
        impactMetrics: {
          name: 'Quantified Impact',
          score: 89,
          weight: 25,
          status: 'excellent',
          description: 'Solid performance statistics (64% hallucination reduction, 12,000 QPS, $240K savings).',
          tips: 'Add business revenue outcome linked to the fraud detection model.'
        },
        formatting: {
          name: 'ATS Readability & Layout',
          score: 88,
          weight: 20,
          status: 'excellent',
          description: 'Academic and professional hybrid layout parsed without entity misclassification.',
          tips: 'Clean publication section formatting.'
        },
        experienceDepth: {
          name: 'Seniority & Scope',
          score: 87,
          weight: 15,
          status: 'excellent',
          description: 'High research-to-production execution capability evidenced across startups and enterprise.',
          tips: 'Demonstrate cross-functional leadership with product teams.'
        },
        actionVerbs: {
          name: 'Power Verbs & Tone',
          score: 86,
          weight: 10,
          status: 'good',
          description: 'Rigorous engineering verbs (Engineered, Fine-tuned, Designed, Deployed).',
          tips: 'Strong technical authority.'
        }
      }
    },
    keywords: [
      { name: 'PyTorch & Transformers', category: 'core', status: 'matched', relevance: 'high' },
      { name: 'RAG & Vector Databases', category: 'architecture', status: 'matched', relevance: 'high' },
      { name: 'LoRA / Model Fine-Tuning', category: 'core', status: 'matched', relevance: 'high' },
      { name: 'MLOps & SageMaker', category: 'cloud', status: 'matched', relevance: 'high' },
      { name: 'vLLM / TensorRT Inference', category: 'frameworks', status: 'recommended', relevance: 'medium' },
      { name: 'CUDA Optimization', category: 'core', status: 'missing', relevance: 'medium' }
    ],
    warnings: [
      {
        id: 'warn-d1',
        severity: 'warning',
        title: 'Include Inference Engine Optimizers (vLLM / TensorRT)',
        description: 'Enterprise AI roles heavily prioritize production serving speed and throughput economics.',
        recommendation: 'Mention vLLM, TensorRT-LLM, or Triton Inference Server in your serving stack.',
        affectedSection: 'Skills - MLOps'
      }
    ],
    atsCompatibility: [
      { platform: 'Workday', score: 94, status: 'optimal', notes: 'Ph.D. credential and publications indexed with canonical university tags.' },
      { platform: 'Greenhouse', score: 92, status: 'optimal', notes: 'High skill intersection on PyTorch, Python, and Vector Databases.' },
      { platform: 'Lever', score: 90, status: 'optimal', notes: 'All job tenures properly aligned.' },
      { platform: 'Taleo', score: 84, status: 'acceptable', notes: 'Mathematical symbol in dissertation title normalized cleanly.' },
      { platform: 'BambooHR', score: 91, status: 'optimal', notes: 'Rapid parse with complete skills extraction.' }
    ]
  }
};

export function simulateCustomUpload(fileName: string, fileSize: number, targetRole: TargetRole): ParsedResume {
  const baseName = fileName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
  const cleanName = baseName.length > 3 ? baseName : "Morgan Taylor";

  return {
    id: `custom-${Date.now()}`,
    fileName: fileName,
    fileSize: `${(fileSize / 1024).toFixed(1)} KB`,
    uploadedAt: 'Just now',
    targetRole: targetRole,
    contact: {
      name: cleanName,
      email: `${cleanName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      phone: '+1 (555) 349-8201',
      location: 'San Francisco, CA',
      linkedin: `linkedin.com/in/${cleanName.toLowerCase().replace(/\s+/g, '')}`,
      github: `github.com/${cleanName.toLowerCase().replace(/\s+/g, '')}`,
    },
    summary: `Results-oriented ${targetRole} with hands-on experience driving modern web systems, architecture scalability, and user-centric features. Skilled in leading cross-functional initiatives and optimizing engineering velocity.`,
    skills: [
      'TypeScript', 'React.js', 'Node.js', 'System Architecture', 
      'Cloud Infrastructure', 'REST / GraphQL APIs', 'Performance Optimization', 
      'Agile / Scrum', 'CI/CD Pipelines', 'SQL / NoSQL Databases'
    ],
    experiences: [
      {
        role: `Lead ${targetRole}`,
        company: 'Vanguard Tech Solutions',
        period: '2021 - Present',
        location: 'San Francisco, CA',
        highlights: [
          'Engineered resilient core architecture supporting 350,000 monthly active users with 99.95% uptime.',
          'Reduced continuous deployment pipeline build times by 40% through intelligent caching and test parallelization.',
          'Collaborated closely with product and design leads to ship 14 major feature releases ahead of deadlines.'
        ],
        impactScore: 88
      },
      {
        role: `Senior ${targetRole}`,
        company: 'Apex Digital Labs',
        period: '2019 - 2021',
        location: 'Austin, TX',
        highlights: [
          'Refactored legacy codebases into modular, testable components, reducing customer-reported bug tickets by 32%.',
          'Authored comprehensive documentation and onboarding guides, shrinking new engineer onboarding from 3 weeks to 5 days.'
        ],
        impactScore: 84
      }
    ],
    education: [
      {
        degree: 'B.S. in Computer Science / Information Systems',
        institution: 'University of Texas at Austin',
        year: '2015 - 2019'
      }
    ],
    certifications: [
      'AWS Certified Developer Associate',
      'Agile Professional Certified (ACP)'
    ],
    scoreBreakdown: {
      overallScore: 86,
      grade: 'A',
      percentile: 9,
      passingProbability: 91,
      categories: {
        keywordMatch: {
          name: 'Tech Stack & Keywords',
          score: 87,
          weight: 30,
          status: 'good',
          description: `Strong core competency keywords matched for ${targetRole}.`,
          tips: 'Add 2-3 niche domain tools relevant to your target industry.'
        },
        impactMetrics: {
          name: 'Quantified Impact',
          score: 85,
          weight: 25,
          status: 'good',
          description: 'Strong quantified results with percentages and user volume.',
          tips: 'Try to attach dollar impact or team time savings where possible.'
        },
        formatting: {
          name: 'ATS Readability & Layout',
          score: 92,
          weight: 20,
          status: 'excellent',
          description: 'Valid single-column layout structure parsed cleanly without dropped text tokens.',
          tips: 'Section titles follow canonical naming conventions.'
        },
        experienceDepth: {
          name: 'Seniority & Scope',
          score: 84,
          weight: 15,
          status: 'good',
          description: 'Solid tenure and increasing scope of architectural responsibility.',
          tips: 'Specify team size led or influenced directly.'
        },
        actionVerbs: {
          name: 'Power Verbs & Tone',
          score: 86,
          weight: 10,
          status: 'good',
          description: 'Clean active voice with impactful verbs (Engineered, Refactored, Authored).',
          tips: 'Maintain variety in starting verbs.'
        }
      }
    },
    keywords: [
      { name: 'React & TypeScript', category: 'frameworks', status: 'matched', relevance: 'high' },
      { name: 'System Architecture', category: 'architecture', status: 'matched', relevance: 'high' },
      { name: 'Cloud Infrastructure', category: 'cloud', status: 'matched', relevance: 'high' },
      { name: 'CI/CD Pipelines', category: 'cloud', status: 'matched', relevance: 'high' },
      { name: 'Microservices & Distributed Systems', category: 'architecture', status: 'recommended', relevance: 'high' },
      { name: 'Observability & Monitoring', category: 'cloud', status: 'recommended', relevance: 'medium' }
    ],
    warnings: [
      {
        id: 'warn-custom-1',
        severity: 'tip',
        title: 'Specify Team Size and Cross-Functional Mentorship',
        description: 'Leadership positions expect explicit counts of engineers or product peers mentored.',
        recommendation: 'Change "Collaborated closely with product" to "Guided 6 engineers while collaborating with product leadership".',
        affectedSection: 'Experience - Vanguard Tech Solutions'
      }
    ],
    atsCompatibility: [
      { platform: 'Workday', score: 92, status: 'optimal', notes: 'Headers recognized with 100% confidence.' },
      { platform: 'Greenhouse', score: 88, status: 'optimal', notes: 'Direct keyword match across candidate taxonomy.' },
      { platform: 'Lever', score: 89, status: 'optimal', notes: 'Chronological timeline sequenced without conflicts.' },
      { platform: 'Taleo', score: 81, status: 'acceptable', notes: 'Safe text encoding validated.' },
      { platform: 'BambooHR', score: 90, status: 'optimal', notes: 'Clear contact details and skills extracted.' }
    ]
  };
}
