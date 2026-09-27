import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'What is a "good" ATS score, and what score guarantees recruiter review?',
      answer: 'Generally, an ATS score of 85+ places your resume in the top 10% of applicants, virtually guaranteeing it passes automated keyword and ranking thresholds into human review. Scores between 70–84 often pass basic filters but may be deprioritized if the applicant pool is large. Scores under 70 usually mean critical keywords or quantified metrics are missing.'
    },
    {
      question: 'Is PDF or Word (.docx) better for passing Applicant Tracking Systems?',
      answer: 'Standard single-column PDFs are modern industry standard for Greenhouse, Lever, and modern Workday instances because they preserve formatting across devices. However, older legacy systems (like older Oracle Taleo installations) occasionally stumble on complex PDF vector layers. ResuMetric tests both formats and will flag any non-standard font or character encodings.'
    },
    {
      question: 'Why do two-column and graphic resumes fail ATS parsers?',
      answer: 'ATS parsers read documents horizontally in a stream (left-to-right). With two columns, primitive parsers read Line 1 of Column 1 directly into Line 1 of Column 2, splicing your job titles into your hobbies or technical skills. This jumbles employment dates and results in an automatic zero or discard.'
    },
    {
      question: 'Is my resume data stored or used to train AI models?',
      answer: 'Never. ResuMetric AI adheres to strict zero-data-retention principles. Your document is processed in real time in memory, evaluated against heuristic and semantic models, and discarded immediately after session results are rendered. We do not sell data to recruiters or train public LLMs on your CV.'
    },
    {
      question: 'How does the Google X-Y-Z formula work in the Impact Score?',
      answer: 'Popularized by Laszlo Bock (former VP of People Operations at Google), the formula states: "Accomplished [X], as measured by [Y], by doing [Z]". ResuMetric analyzes each bullet for an action verb, a quantified outcome (percentage, revenue, latency, users), and the method or technical architecture used.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 relative bg-surface-darker/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Everything you need to know about ATS algorithms and parsing accuracy.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl glass-panel border border-surface-border overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 hover:bg-surface-card/40 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-surface-border/50 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
