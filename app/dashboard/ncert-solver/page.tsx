"use client";
import BackButton from "@/components/BackButton";
import ChemAILogo from "@/components/ChemAILogo";
import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function NcertSolverPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("12");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [solution, setSolution] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const chapters = selectedClass === "12" ? [
    "1. Solutions",
    "2. Electrochemistry",
    "3. Chemical Kinetics",
    "4. d- and f-Block Elements",
    "5. Coordination Compounds",
    "6. Haloalkanes and Haloarenes",
    "7. Alcohols, Phenols and Ethers",
    "8. Aldehydes, Ketones and Carboxylic Acids",
    "9. Amines",
    "10. Biomolecules"
  ] : [
    "1. Some Basic Concepts of Chemistry",
    "2. Structure of Atom",
    "3. Classification of Elements & Periodicity",
    "4. Chemical Bonding & Molecular Structure",
    "5. Chemical Thermodynamics",
    "6. Equilibrium",
    "7. Redox Reactions",
    "8. Organic Chemistry: Basic Principles & Techniques",
    "9. Hydrocarbons"
  ];

  const handleSolveNcert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim() || !selectedChapter || isLoading) return;

    setIsLoading(true);
    setSolution("");

    try {
      const prompt = `Provide a step-by-step NCERT textbook solution for Class ${selectedClass} Chemistry, Chapter (${selectedChapter}). Question: ${questionText}`;
      
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });

      if (!response.ok) throw new Error("Failed to fetch solution");

      const data = await response.json();
      setSolution(data.content || data.text || "No solution generated.");
    } catch (error) {
      console.error(error);
      setSolution("Sorry, I encountered an error fetching the NCERT solution.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="flex h-screen bg-slate-950 text-slate-400 items-center justify-center">
        Loading NCERT Solver Workspace...
      </div>
    );
  }

  const navLinks = [
    { name: 'Dashboard', icon: '📊', href: '/dashboard' },
    { name: 'AI Tutor', icon: '🤖', href: '/dashboard/ai-tutor' },
    { name: 'Practice', icon: '✍️', href: '/dashboard/practice' },
    { name: 'Test Generator', icon: '🎯', href: '/dashboard/test-generator' },
    { name: 'NCERT Solver', icon: '📘', href: '/dashboard/ncert-solver', active: true },
    { name: 'Previous Papers', icon: '📄', href: '/dashboard/previous-papers' },
  ];

  const userSpaceLinks = [
    { name: 'Notes', icon: '📓', href: '/dashboard/notes' },
    { name: 'Bookmarks', icon: '🔖', href: '/dashboard/bookmarks' },
    { name: 'Progress', icon: '📈', href: '/dashboard/progress' },
    { name: 'Settings', icon: '⚙️', href: '/dashboard/settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 flex-shrink-0 border-r border-slate-800 bg-slate-900 flex flex-col transition-transform duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <Link href="/" className="transition-opacity hover:opacity-80">
            <ChemAILogo />
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">✕</button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">Menu</div>
          {navLinks.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${item.active ? 'bg-indigo-500/10 text-indigo-400 font-medium' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}

          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-6 mb-2 px-3">Your Space</div>
          {userSpaceLinks.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0B0F19]">
        
        <header className="h-16 flex-shrink-0 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <BackButton/>
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/50 border border-slate-700/50"
            >
              ☰
            </button>
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              📘 NCERT Textbook Solutions Solver
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 flex items-center justify-center">
              <ClerkLoading><div className="h-8 w-8 rounded-full bg-slate-700 animate-pulse" /></ClerkLoading>
              <ClerkLoaded><UserButton afterSignOutUrl="/" /></ClerkLoaded>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 max-w-5xl w-full mx-auto space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-2">Select Class & Chapter</h2>
            <p className="text-slate-400 text-sm mb-6">Choose your grade and specific chapter to get accurate step-by-step textbook solutions.</p>

            <form onSubmit={handleSolveNcert} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Select Class</label>
                  <div className="flex gap-4">
                    {['11', '12'].map((cls) => (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => { setSelectedClass(cls); setSelectedChapter(""); }}
                        className={`flex-1 py-3 rounded-xl font-medium text-sm border transition-all ${selectedClass === cls ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                      >
                        Class {cls}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Select Chapter</label>
                  <select
                    value={selectedChapter}
                    onChange={(e) => setSelectedChapter(e.target.value)}
                    className="w-full bg-slate-950 text-white rounded-xl px-4 py-3 text-sm border border-slate-800 focus:outline-none focus:border-indigo-500"
                    required
                  >
                    <option value="" disabled>-- Choose Chapter --</option>
                    {chapters.map((chap) => (
                      <option key={chap} value={chap}>{chap}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Enter Question or Exercise Number</label>
                <textarea
                  rows={3}
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="e.g., Calculate the boiling point of a solution containing 0.6g of acetic acid in 100g of benzene..."
                  className="w-full bg-slate-950 text-white rounded-xl p-4 text-sm border border-slate-800 focus:outline-none focus:border-indigo-500 placeholder-slate-600 shadow-inner resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3.5 rounded-xl text-sm transition-colors shadow-lg disabled:opacity-50"
              >
                {isLoading ? "Generating Step-by-Step Solution..." : "Get NCERT Solution"}
              </button>
            </form>
          </div>

          {/* SOLUTION DISPLAY AREA */}
          {(solution || isLoading) && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                ✨ Step-by-Step Solution
              </h3>
              {isLoading ? (
                <div className="py-8 text-center text-slate-400 animate-pulse text-sm">
                  Analyzing textbook concepts and formulating solution...
                </div>
              ) : (
                <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap bg-slate-950 p-6 rounded-xl border border-slate-800/80">
                  {solution}
                </div>
              )}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}