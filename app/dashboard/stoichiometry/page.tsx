"use client";
import BackButton from "@/components/BackButton";
import ChemAILogo from "@/components/ChemAILogo";
import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function StoichiometryPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [queryType, setQueryType] = useState("molar-mass");
  const [inputData, setInputData] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputData.trim() || isLoading) return;

    setIsLoading(true);
    setResult("");

    try {
      let prompt = "";
      if (queryType === "molar-mass") {
        prompt = `Calculate the exact molar mass and percentage composition of elements for the chemical formula or compound: "${inputData}". Show atomic weights and step-by-step calculation.`;
      } else if (queryType === "balance-equation") {
        prompt = `Balance the following chemical equation and provide a step-by-step stoichiometric explanation: "${inputData}".`;
      } else {
        prompt = `Solve the following stoichiometry or mole-concept problem with detailed unit conversion steps: "${inputData}".`;
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });

      if (!response.ok) throw new Error("Failed to fetch calculation results");

      const data = await response.json();
      setResult(data.content || data.text || "No calculation generated.");
    } catch (error) {
      console.error(error);
      setResult("Sorry, I encountered an error processing your stoichiometry request.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="flex h-screen bg-slate-950 text-slate-400 items-center justify-center">
        Loading Stoichiometry Workspace...
      </div>
    );
  }

  const navLinks = [
    { name: 'Dashboard', icon: '📊', href: '/dashboard' },
    { name: 'AI Tutor', icon: '🤖', href: '/dashboard/ai-tutor' },
    { name: 'Foundation (6th-10th)', icon: '🌱', href: '/dashboard/foundation' },
    { name: 'Stoichiometry Calculator', icon: '⚖️', href: '/dashboard/stoichiometry', active: true },
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
            <BackButton/>
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/50 border border-slate-700/50"
            >
              ☰
            </button>
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              ⚖️ Stoichiometry & Molecular Mass Calculator
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
          
          {/* CALCULATOR INPUT CARD */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">Compound Analysis & Calculations</h2>
              <p className="text-slate-400 text-sm">Calculate molar masses, balance chemical reactions, or solve mole-concept numericals instantly.</p>
            </div>

            <form onSubmit={handleCalculate} className="space-y-4">
              
              {/* QUERY TYPE SELECTOR */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { id: 'molar-mass', title: '🧪 Molar Mass & Composition', desc: 'Find molecular weight & elements' },
                  { id: 'balance-equation', title: '⚖️ Equation Balancer', desc: 'Balance chemical reactions' },
                  { id: 'mole-problem', title: '🔢 Stoichiometry & Moles', desc: 'Solve limiting reagents & yields' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { setQueryType(item.id); setResult(""); }}
                    className={`p-4 rounded-xl border text-left transition-all ${queryType === item.id ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg' : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'}`}
                  >
                    <div className="font-semibold text-xs text-white mb-1">{item.title}</div>
                    <div className="text-[10px] text-slate-400">{item.desc}</div>
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  {queryType === 'molar-mass' && 'Enter Chemical Formula (e.g., H2SO4, C6H12O6)'}
                  {queryType === 'balance-equation' && 'Enter Unbalanced Equation (e.g., H2 + O2 -> H2O)'}
                  {queryType === 'mole-problem' && 'Enter Word Problem or Numerical Expression'}
                </label>
                <input
                  type="text"
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                  placeholder={
                    queryType === 'molar-mass' ? 'e.g., CaCO3 or CuSO4.5H2O' :
                    queryType === 'balance-equation' ? 'e.g., Fe + O2 -> Fe2O3' :
                    'e.g., Calculate moles in 44g of CO2'
                  }
                  className="w-full bg-slate-950 text-white rounded-xl px-4 py-3.5 text-sm border border-slate-800 focus:outline-none focus:border-indigo-500 shadow-inner"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3.5 rounded-xl text-sm transition-colors shadow-lg disabled:opacity-50"
              >
                {isLoading ? "Calculating Molar Mass & Stoichiometry..." : "Calculate & Analyze 🚀"}
              </button>
            </form>
          </div>

          {/* RESULT DISPLAY */}
          {(result || isLoading) && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                ✨ Calculation & Breakdown Results
              </h3>
              {isLoading ? (
                <div className="py-12 text-center text-slate-400 animate-pulse text-sm">
                  Computing atomic masses and stoichiometric coefficients...
                </div>
              ) : (
                <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap bg-slate-950 p-6 rounded-xl border border-slate-800/80">
                  {result}
                </div>
              )}
            </div>
          )}

        </main>

      </div>
    </div>
  );
}