'use client';

import { useState } from 'react';
import BackButton from "@/components/BackButton";

export default function AINotesPage() {
  const [topic, setTopic] = useState('Chemical Bonding');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [notebook, setNotebook] = useState<any>({
    title: "CHEMICAL BONDING",
    subject: "JEE / NEET Inorganic Chemistry",
    pages: [
      {
        pageNo: 1,
        intro: "Chemical Bonding is the force of attraction which holds the atoms together in a molecule or an ionic compound.",
        reasons: [
          "To attain stability (noble gas configuration).",
          "To have minimum possible energy.",
          "To get maximum possible attraction.",
          "To have maximum possible overlap between atomic orbitals."
        ],
        keyPoints: [
          "Atoms combine because the resulting system is more stable than the individual atoms.",
          "Stability is achieved by complete octet / duplet in the valence shell."
        ],
        sections: [
          {
            heading: "1. IONIC BOND (Electrovalent Bond)",
            bullets: [
              "Formed by complete transfer of electron(s) from one atom (metal) to another (non-metal).",
              "Electrostatic attraction between oppositely charged ions holds them together.",
              "Generally formed between metal and non-metal."
            ],
            characteristics: [
              "High melting & boiling points",
              "Hard but brittle",
              "Soluble in polar solvents (like water)",
              "Conduct electricity in molten state or in aqueous solution but not in solid state."
            ]
          }
        ]
      },
      {
        pageNo: 2,
        intro: "Continuation of Chemical Bonding: Covalent & Coordinate Bond characteristics.",
        sections: [
          {
            heading: "2. COVALENT BOND",
            bullets: [
              "Formed by mutual sharing of one or more pairs of electrons between two atoms.",
              "Generally formed between non-metal atoms.",
              "Directional in nature."
            ],
            subtypes: [
              { name: "(i) Single Bond", desc: "One pair of electrons is shared. (Ex: H₂)" },
              { name: "(ii) Double Bond", desc: "Two pairs of electrons are shared. (Ex: O₂)" },
              { name: "(iii) Triple Bond", desc: "Three pairs of electrons are shared. (Ex: N₂)" }
            ]
          },
          {
            heading: "3. COORDINATE (DATIVE) BOND",
            bullets: [
              "A covalent bond in which the shared pair of electrons is donated by one atom only.",
              "The donor atom acts as a Lewis base and the acceptor atom acts as a Lewis acid."
            ]
          }
        ]
      },
      {
        pageNo: 3,
        intro: "Advanced Concepts, Hybridization & VSEPR Theory Summary",
        sections: [
          {
            heading: "4. VSEPR THEORY & HYBRIDIZATION",
            bullets: [
              "Valence Shell Electron Pair Repulsion theory predicts molecular geometry based on lone pair and bond pair repulsions.",
              "Hybridization involves mixing of atomic orbitals of comparable energies to form new hybrid orbitals."
            ],
            characteristics: [
              "Linear: sp (180°)",
              "Trigonal Planar: sp² (120°)",
              "Tetrahedral: sp³ (109.5°)",
              "Octahedral: sp³d² (90°)"
            ]
          }
        ]
      }
    ]
  });

  const generateNotes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    setCurrentPage(1);

    setTimeout(() => {
      const formattedTitle = topic.toUpperCase();
      setNotebook({
        title: formattedTitle,
        subject: "JEE / NEET Chemistry Master Sheet",
        pages: [
          {
            pageNo: 1,
            intro: `${formattedTitle} is a core fundamental concept involving high-yield principles, structural behaviors, and reaction pathways essential for competitive exams.`,
            reasons: [
              `To understand the core theoretical foundation of ${topic}.`,
              `To master standard equations and exception cases.`,
              `To solve numerical and conceptual questions rapidly under 30 seconds.`,
              `To clear all high-weightage previous years' questions (PYQs).`
            ],
            keyPoints: [
              `Mastering ${topic} requires clear visualization of structures and formulas.`,
              `Pay close attention to standard conditions and exception rules.`
            ],
            sections: [
              {
                heading: `1. FUNDAMENTAL PRINCIPLES OF ${formattedTitle}`,
                bullets: [
                  `Primary definitions, laws, and foundational rules governing ${topic}.`,
                  `Direct relationships between variables, energy states, and structural configurations.`,
                  `Standard nomenclature and classification criteria.`
                ],
                characteristics: [
                  "High conceptual weightage in exams",
                  "Direct formula-based applications",
                  "Frequent trick questions involving edge cases"
                ]
              }
            ]
          },
          {
            pageNo: 2,
            intro: `Advanced Mechanisms, Equations & Reaction Dynamics for ${formattedTitle}`,
            sections: [
              {
                heading: `2. ADVANCED MECHANISMS & DERIVATIONS`,
                bullets: [
                  `Step-by-step breakdown of complex reactions and numerical derivations.`,
                  `Ratio analysis and fast-track calculation shortcuts.`
                ],
                subtypes: [
                  { name: "(i) Direct Formula Rule", desc: "Apply standard proportionality constants for rapid calculation." },
                  { name: "(ii) Exception Analysis", desc: "Identify anomalous behaviors and structural constraints instantly." }
                ]
              }
            ]
          },
          {
            pageNo: 3,
            intro: `Summary Sheet & Exam Shortcuts for ${formattedTitle}`,
            sections: [
              {
                heading: `3. EXAM SHORTCUTS & TRICK QUESTIONS`,
                bullets: [
                  `Memorization mnemonics for rapid recall during exams.`,
                  `Common examiner traps to avoid.`
                ],
                characteristics: [
                  "High yield for last-minute revision",
                  "Focus on direct formula applications",
                  "Exception-handling check-list"
                ]
              }
            ]
          }
        ]
      });
      setLoading(false);
    }, 600);
  };

  const activePageData = notebook.pages.find((p: any) => p.pageNo === currentPage) || notebook.pages[0];

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header Controls */}
        <header className="h-16 flex-shrink-0 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <BackButton />
            <h1 className="text-lg font-bold flex items-center gap-2">
              📝 AI Handwritten Multi-Page Notebook
            </h1>
          </div>
          <button
            onClick={() => window.print()}
            className="bg-indigo-600 hover:bg-indigo-500 text-xs text-white px-4 py-2 rounded-xl font-medium transition shadow-lg"
          >
            Print / Save as PDF 📥
          </button>
        </header>

        {/* Workspace */}
        <main className="flex-1 overflow-y-auto p-6 max-w-4xl w-full mx-auto space-y-6">
          
          {/* Search Box */}
          <form onSubmit={generateNotes} className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl shadow-xl flex gap-3">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter any topic (e.g., Chemical Bonding, Thermodynamics, Isomerism)..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition disabled:opacity-50"
            >
              {loading ? 'Writing...' : 'Generate Notes ✍️'}
            </button>
          </form>

          {/* MULTI-PAGE NAVIGATION CONTROLS */}
          <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold uppercase">Notebook Pages:</span>
              {notebook.pages.map((p: any) => (
                <button
                  key={p.pageNo}
                  onClick={() => setCurrentPage(p.pageNo)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${currentPage === p.pageNo ? 'bg-amber-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  Page {p.pageNo}
                </button>
              ))}
            </div>
            <span className="text-xs text-amber-400 font-medium">
              Viewing Page {currentPage} of {notebook.pages.length}
            </span>
          </div>

          {/* REAL HANDWRITTEN NOTEBOOK SHEET (SINGLE PAGE VIEW WITH FLIPPER) */}
          <div className="bg-[#fdfbf7] text-[#1e293b] p-8 md:p-12 rounded-xl shadow-2xl relative border border-amber-200 font-serif overflow-hidden"
               style={{
                 backgroundImage: `linear-gradient(#e2e8f0 1px, transparent 1px)`,
                 backgroundSize: '100% 32px'
               }}>
            
            {/* Red Margin Line */}
            <div className="absolute top-0 bottom-0 left-12 md:left-16 w-[2px] bg-red-400/60 pointer-events-none" />

            <div className="pl-6 md:pl-10 space-y-6">

              {/* Top Meta Bar */}
              <div className="flex justify-between items-start border-b-2 border-slate-700 pb-3">
                <div>
                  <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">{notebook.subject}</span>
                  <span className="text-xs font-semibold text-slate-700">Chemistry Revision Module</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-wider text-center underline decoration-slate-400 decoration-2">
                  {notebook.title}
                </h1>
                <div className="border border-slate-400 bg-white/60 p-2 rounded text-[11px] space-y-1 w-32 shadow-sm">
                  <div>Date : 10/08/2026</div>
                  <div>Page No. : {currentPage}</div>
                </div>
              </div>

              {/* Introduction */}
              <div className="space-y-2">
                <p className="text-sm md:text-base text-slate-900 leading-8">
                  <span className="text-red-600 font-bold mr-1">* Introduction (Page {currentPage}) :</span> 
                  {activePageData.intro}
                </p>
              </div>

              {/* Page 1 Specific Content: Reasons & Key Points */}
              {currentPage === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="md:col-span-2 space-y-2">
                    <p className="text-sm md:text-base font-bold text-red-600">
                      * Reasons for {notebook.title} :
                    </p>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-slate-900 leading-8 pl-2">
                      {activePageData.reasons.map((r: string, idx: number) => (
                        <li key={idx} className="font-medium">{r}</li>
                      ))}
                    </ol>
                  </div>

                  {/* Key Points Box */}
                  <div className="border border-emerald-700 bg-emerald-50/70 p-4 rounded-lg space-y-2 shadow-sm self-start">
                    <h3 className="font-bold text-emerald-900 text-sm border-b border-emerald-300 pb-1">Key Points</h3>
                    <ul className="space-y-2 text-xs text-emerald-950">
                      {activePageData.keyPoints.map((kp: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-700 font-bold">•</span>
                          <span>{kp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Sections for Current Page */}
              {activePageData.sections && activePageData.sections.map((sec: any, index: number) => (
                <div key={index} className="space-y-3 pt-4 border-t border-slate-300/60">
                  <h2 className="text-base md:text-lg font-bold text-blue-950 underline decoration-blue-500 underline-offset-4">
                    {sec.heading}
                  </h2>
                  
                  <ul className="space-y-1.5 text-sm text-slate-900 leading-8">
                    {sec.bullets.map((b: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-700 font-bold">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {sec.subtypes && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                      {sec.subtypes.map((sub: any, sIdx: number) => (
                        <div key={sIdx} className="bg-white/80 border border-slate-300 p-3 rounded-lg shadow-sm space-y-1">
                          <span className="text-xs font-bold text-slate-900 block">{sub.name}</span>
                          <p className="text-xs text-slate-700 leading-6">{sub.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {sec.characteristics && (
                    <div className="border border-red-400 bg-red-50/50 p-4 rounded-lg space-y-1.5 mt-3 max-w-md ml-auto shadow-sm">
                      <h4 className="text-xs font-bold text-red-900 uppercase tracking-wider border-b border-red-200 pb-1">Characteristics</h4>
                      <ul className="space-y-1 text-xs text-red-950">
                        {sec.characteristics.map((c: string, cIdx: number) => (
                          <li key={cIdx} className="flex items-start gap-1.5">
                            <span className="text-red-600 font-bold">•</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}

            </div>

          </div>

          {/* Bottom Pagination Buttons */}
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2.5 rounded-xl text-xs font-medium transition disabled:opacity-30 border border-slate-700"
            >
              ← Previous Page
            </button>
            <span className="text-xs text-slate-400">
              Page {currentPage} of {notebook.pages.length}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, notebook.pages.length))}
              disabled={currentPage === notebook.pages.length}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-xs font-medium transition disabled:opacity-30 shadow-lg"
            >
              Next Page →
            </button>
          </div>

        </main>

      </div>
    </div>
  );
}