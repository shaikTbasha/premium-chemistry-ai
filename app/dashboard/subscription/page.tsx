"use client";
import ChemAILogo from "@/components/ChemAILogo";
import { UserButton, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function SubscriptionPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleUpgrade = () => {
    setIsLoading(true);
    // Simulate redirect to Stripe checkout or payment gateway
    setTimeout(() => {
      setIsPro(true);
      setIsLoading(false);
      alert("Successfully upgraded to ChemAI Aspirant Pro! 🎉");
    }, 1500);
  };

  if (!isMounted) {
    return (
      <div className="flex h-screen bg-slate-950 text-slate-400 items-center justify-center">
        Loading Subscription Workspace...
      </div>
    );
  }

  const navLinks = [
    { name: 'Dashboard', icon: '📊', href: '/dashboard' },
    { name: 'AI Tutor', icon: '🤖', href: '/dashboard/ai-tutor' },
    { name: 'Snap & Solve', icon: '📷', href: '/dashboard/solve-image' },
    { name: 'Foundation (6th-10th)', icon: '🌱', href: '/dashboard/foundation' },
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
    { name: 'Subscription', icon: '💳', href: '/dashboard/subscription', active: true },
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
          {navLinks.map((item, index) => (
            <Link 
              key={`nav-${index}`}
              href={item.href} 
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}

          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-6 mb-2 px-3">Your Space</div>
          {userSpaceLinks.map((item, index) => (
            <Link 
              key={`user-${index}`}
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
              💳 Membership & Subscription Management
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 flex items-center justify-center">
              <ClerkLoading><div className="h-8 w-8 rounded-full bg-slate-700 animate-pulse" /></ClerkLoading>
              <ClerkLoaded><UserButton afterSignOutUrl="/" /></ClerkLoaded>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 max-w-4xl w-full mx-auto space-y-8">
          
          {/* CURRENT PLAN STATUS CARD */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 uppercase tracking-wider">
                  Current Status
                </span>
                <span className="text-sm text-slate-400">Active Plan</span>
              </div>
              <h2 className="text-2xl font-bold text-white">
                {isPro ? "Aspirant Pro Tier 🚀" : "Starter Foundation (Free Tier)"}
              </h2>
              <p className="text-slate-400 text-xs max-w-lg">
                {isPro ? "You have unlimited access to AI tutor models, advanced organic synthesis pathways, and past exam archives." : "Upgrade to Pro to unlock unlimited AI queries, past paper archives, and high-speed multi-step reaction engines."}
              </p>
            </div>

            {!isPro && (
              <button
                onClick={handleUpgrade}
                disabled={isLoading}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-3.5 rounded-2xl text-sm transition-all shadow-lg shadow-indigo-600/30 flex-shrink-0 disabled:opacity-50"
              >
                {isLoading ? "Processing Checkout..." : "Upgrade to Pro ($12/mo) ⚡"}
              </button>
            )}
          </div>

          {/* PLAN COMPARISON CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">Starter Foundation</h3>
              <div className="text-3xl font-extrabold text-white">$0 <span className="text-xs text-slate-400 font-normal">/ forever free</span></div>
              <ul className="space-y-2.5 text-sm text-slate-300 pt-2">
                <li className="flex items-center gap-2"><span className="text-indigo-400">✓</span> Standard AI Tutor limits</li>
                <li className="flex items-center gap-2"><span className="text-indigo-400">✓</span> Stoichiometry Calculator</li>
                <li className="flex items-center gap-2"><span className="text-indigo-400">✓</span> Animated Periodic Table</li>
              </ul>
            </div>

            <div className={`border rounded-3xl p-6 space-y-4 ${isPro ? 'bg-emerald-950/20 border-emerald-500/50' : 'bg-indigo-950/30 border-indigo-500/50'}`}>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Aspirant Pro</h3>
                {isPro && <span className="text-xs bg-emerald-500/20 text-emerald-400 font-semibold px-2.5 py-1 rounded-full">Active</span>}
              </div>
              <div className="text-3xl font-extrabold text-white">$12 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
              <ul className="space-y-2.5 text-sm text-slate-300 pt-2">
                <li className="flex items-center gap-2"><span className="text-indigo-400">✓</span> Unlimited AI Tutor & OCR Scanning</li>
                <li className="flex items-center gap-2"><span className="text-indigo-400">✓</span> Organic Synthesis & Mechanism Builder</li>
                <li className="flex items-center gap-2"><span className="text-indigo-400">✓</span> 35+ Years Past Exam Archives</li>
                <li className="flex items-center gap-2"><span className="text-indigo-400">✓</span> Priority High-Speed Response Servers</li>
              </ul>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}