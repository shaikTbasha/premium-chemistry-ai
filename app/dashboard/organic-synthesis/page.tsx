"use client";
import ChemAILogo from "@/components/ChemAILogo";
import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function OrganicSynthesisPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [startingMaterial, setStartingMaterial] = useState("");
  const [targetProduct, setTargetProduct] = useState("");
  const [synthesisResult, setSynthesisResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const popularSyntheses = [
    { start: "Propene", target: "Propan-2-ol (via hydration/Markovnikov)", desc: "Direct hydration or oxymercuration-demercuration" },
    { start: "Bromoethane", target: "Butane (Wurtz Reaction)", desc: "Coupling alkyl halides with sodium metal in dry ether" },
    { start: "Benzene", target: "Nitrobenzene", desc: "Electrophilic aromatic substitution using nitrating mixture" },
    { start: "Acetaldehyde", target: "Lactic Acid", desc: "Cyanohydrin formation followed by acidic hydrolysis" },
  ];

  const handleGenerateSynthesis = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!startingMaterial.trim() || !targetProduct.trim()) && isLoading) return;

    setIsLoading(true);
    setSynthesisResult("");

    try {
      const prompt = `Act as an expert Organic Chemistry professor. Provide a detailed step-by-step retrosynthetic pathway and reaction mechanism for converting the starting material "${startingMaterial}" into the target product "${targetProduct}". Include required reagents, specific reaction conditions (temperature, solvents), stereochemistry details (if applicable), and potential side reactions.`;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });

      if (!response.ok) throw new Error("Failed to fetch synthesis pathway");

      const data = await response.json();
      setSynthesisResult(data.content || data.text || "No synthesis pathway generated.");
    } catch (error) {
      console.error(error);
      setSynthesisResult("Sorry, I encountered an error generating the synthesis pathway.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="flex h-screen bg-slate-950 text-slate-400 items-center justify-center">
        Loading Organic Synthesis Workspace...
      </div>
    );
  }

  const navLinks = [
    { name: 'Dashboard', icon: '📊', href: '/dashboard' },
    { name: 'AI Tutor', icon: '🤖', href: '/dashboard/ai-tutor' },
    { name: 'Foundation (6th-10th)', icon: '🌱', href: '/dashboard/foundation' },
    { name: 'Organic Synthesis', icon: '🧬', href: '/dashboard/organic-synthesis', active: true },
    { name: 'Lab Assistant', icon: '🔬', href: '/dashboard/lab-assistant' },
    { name: 'Stoichiometry', icon: '⚖️', href: '/dashboard/stoichiometry' },
    { name: 'Periodic Table', icon: '🧪', href: '/dashboard/periodic-table' },
    { name: 'Practice', icon: '✍️', href: '/dashboard/practice' },
    { name: 'Flashcards', icon: '⚡', href: '/dashboard/flashcards' },
    { name: 'Test Generator', icon: '🎯', href: '/dashboard/test-generator' },
    { name: 'NCERT Solver', icon: '📘', href: '/dashboard/ncert-solver' },
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
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${item.active ? 'bg-indigo-500/10 text-indigo-400 font-medium' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
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
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/50 border border-slate-700/50"
            >
              ☰
            </button>
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              🧬 Organic Synthesis Pathway & Mechanism Builder
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
          
          {/* SYNTHESIS BUILDER CARD */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">Design Synthesis Route</h2>
              <p className="text-slate-400 text-sm">Specify your starting chemical and desired target product to map out step-by-step organic transformations.</p>
            </div>

            {/* QUICK PRESET BUTTONS */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Popular Pathways (Click to load)</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {popularSyntheses.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => { setStartingMaterial(item.start); setTargetProduct(item.target); setSynthesisResult(""); }}
                    className="p-3 bg-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-xl text-left transition-all group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-indigo-400">{item.start} → {item.target}</div>
                    <div className="text-[10px] text-slate-400">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleGenerateSynthesis} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Starting Material</label>
                  <input
                    type="text"
                    value={startingMaterial}
                    onChange={(e) => setStartingMaterial(e.target.value)}
                    placeholder="e.g., Ethene or Acetophenone"
                    className="w-full bg-slate-950 text-white rounded-xl px-4 py-3 text-sm border border-slate-800 focus:outline-none focus:border-indigo-500 shadow-inner"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Target Product</label>
                  <input
                    type="text"
                    value={targetProduct}
                    onChange={(e) => setTargetProduct(e.target.value)}
                    placeholder="e.g., Ethylbenzene or Benzoic Acid"
                    className="w-full bg-slate-950 text-white rounded-xl px-4 py-3 text-sm border border-slate-800 focus:outline-none focus:border-indigo-500 shadow-inner"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3.5 rounded-xl text-sm transition-colors shadow-lg disabled:opacity-50"
              >
                {isLoading ? "Generating Synthesis Pathway..." : "Generate Step-by-Step Mechanism 🧬"}
              </button>
            </form>
          </div>

          {/* RESPONSE DISPLAY */}
          {(synthesisResult || isLoading) && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                ✨ Retrosynthetic Route & Mechanism Breakdown
              </h3>
              {isLoading ? (
                <div className="py-12 text-center text-slate-400 animate-pulse text-sm">
                  Analyzing functional groups, reaction intermediates, and reagents...
                </div>
              ) : (
                <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap bg-slate-950 p-6 rounded-xl border border-slate-800/80">
                  {synthesisResult}
                </div>
              )}
            </div>
          )}

        </main>

      </div>
    </div>
  );
}