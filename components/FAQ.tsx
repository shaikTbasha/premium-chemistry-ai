"use client";

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How is this different from standard ChatGPT?",
      answer: "Standard language models are trained on general text and often struggle with spatial reasoning, complex math, and specific chemical nomenclature. Our Premium Chemistry AI is fine-tuned specifically on peer-reviewed chemistry literature, textbook problem sets, and molecular databases, ensuring accurate reaction mechanisms without hallucinations."
    },
    {
      question: "Can it draw and interpret 3D molecular structures?",
      answer: "Yes. Our platform includes a built-in molecular viewer. You can ask the AI to generate a structure from an IUPAC name, SMILES string, or common name, and it will render a fully interactive 3D model that you can rotate and zoom."
    },
    {
      question: "Does it help with lab reports and LaTeX?",
      answer: "Absolutely. You can paste your raw data, and the AI will help you process it, balance the equations, format tables, and export the entire solution in clean LaTeX code ready to be pasted into your lab report editor."
    },
    {
      question: "Is my university syllabus supported?",
      answer: "We cover all standard topics from AP/IB Chemistry up through advanced undergraduate Organic, Inorganic, and Physical Chemistry. For specialized grad courses, you can upload your syllabus PDF and the AI will tailor its explanations to match your professor's specific focus."
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer: "Yes, there are no long-term contracts. You can cancel your monthly or annual subscription at any time directly from your account dashboard. You will retain access until the end of your current billing cycle."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-slate-900 py-24 sm:py-32" id="faq">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold uppercase tracking-wider text-indigo-400">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to know
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${
                  isOpen ? 'border-indigo-500/30 bg-slate-800/50' : 'border-slate-800 bg-slate-900'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-white">
                    {faq.question}
                  </span>
                  <span className="ml-6 flex h-7 items-center">
                    <svg
                      className={`h-5 w-5 text-indigo-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </button>
                
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden px-6 text-base text-slate-400">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center text-sm text-slate-400">
          Still have questions?{' '}
          <a href="mailto:support@chemistryai.com" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
            Contact our support team
          </a>
        </div>
      </div>
    </section>
  );
}