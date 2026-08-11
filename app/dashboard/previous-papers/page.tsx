"use client";
import BackButton from "@/components/BackButton";
import ChemAILogo from "@/components/ChemAILogo";
import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function PreviousPapersPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [examName, setExamName] = useState("JEE Main / IIT-JEE");
  const [examYear, setExamYear] = useState("2026");
  const [customQuery, setCustomQuery] = useState("");
  const [solution, setSolution] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate years array for 35+ years (from 1990 to 2026)
  const years = Array.from({ length: 2026 - 1990 + 1 }, (_, i) => (2026 - i).toString());

  const handleFetchPaperSolution = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim() || isLoading) return;

    setIsLoading(true);
    setSolution("");

    try {
      const prompt = `You have access to 35+ years of historical exam archives (1990-2026). Provide a detailed question breakdown and step-by-step solution for the following query from the ${examName} ${examYear} Chemistry archive: ${customQuery}`;

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
      setSolution("Sorry, I encountered an error fetching the historical archive solution.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="flex h-screen bg-slate-950 text-slate-400 items-center justify-center">
        Loading 35+ Years Archive Workspace...
      </div>
    );
  }

  const navLinks = [
    { name: 'Dashboard', icon: '📊', href: '/dashboard' },
    { name: 'AI Tutor', icon: '🤖', href: '/dashboard/ai-tutor' },
    { name: 'Practice', icon: '✍️', href: '/dashboard/practice' },
    { name: 'Test Generator', icon: '🎯', href: '/dashboard/test-generator' },
    { name: 'NCERT Solver', icon: '📘', href: '/dashboard/ncert-solver' },
    { name: 'Previous Papers', icon: '📄', href: '/dashboard/previous-papers', active: true },
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
              📄 35+ Years Archive Solver (1990 - 2026)
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 flex items-center justify-center">
              <ClerkLoading><div className="h-8 w-8 rounded-full bg-slate-700 animate-pulse" /></ClerkLoading>
              <ClerkLoaded><UserButton afterSignOutUrl="/" /></ClerkLoaded>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 max-w-4xl w-full mx-auto space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-2">Explore 35+ Years of Exam Questions</h2>
            <p className="text-slate-400 text-sm mb-6">Access question papers and solutions from 1990 onwards for JEE Main, IIT-JEE, and NEET.</p>

            <form onSubmit={handleFetchPaperSolution} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Exam Category</label>
                  <select
                    value={examName}
                    onChange={(e) => setExamName(e.target.value)}
                    className="w-full bg-slate-950 text-white rounded-xl px-4 py-3 text-sm border border-slate-800 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="JEE Main / IIT-JEE">JEE Main / IIT-JEE (1990-Present)</option>
                    <option value="NEET UG / AIPMT">NEET UG / AIPMT (1990-Present)</option>
                    <option value="BITSAT">BITSAT Archive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Select Year (1990 - 2026)</label>
                  <select
                    value={examYear}
                    onChange={(e) => setExamYear(e.target.value)}
                    className="w-full bg-slate-950 text-white rounded-xl px-4 py-3 text-sm border border-slate-800 focus:outline-none focus:border-indigo-500"
                  >
                    {years.map((yr) => (
                      <option key={yr} value={yr}>{yr}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Question Details or Topic</label>
                <textarea
                  rows={3}
                  value={customQuery}
                  onChange={(e) => setCustomQuery(e.target.value)}
                  placeholder="e.g., Give me questions and solutions on chemical kinetics from this year's archive..."
                  className="w-full bg-slate-950 text-white rounded-xl p-4 text-sm border border-slate-800 focus:outline-none focus:border-indigo-500 placeholder-slate-600 shadow-inner resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3.5 rounded-xl text-sm transition-colors shadow-lg disabled:opacity-50"
              >
                {isLoading ? "Searching 35+ Year Archives..." : "Fetch Historical Solution 📚"}
              </button>
            </form>
          </div>

          {(solution || isLoading) && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                ✨ Historical Paper Solution ({examYear})
              </h3>
              {isLoading ? (
                <div className="py-8 text-center text-slate-400 animate-pulse text-sm">
                  Querying 35+ years database for exact question matching...
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