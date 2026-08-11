"use client";
import BackButton from "@/components/BackButton";
import ChemAILogo from "@/components/ChemAILogo";
import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function FoundationPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Selection states
  const [curriculum, setCurriculum] = useState("indian"); // indian, international, emcet
  const [grade, setGrade] = useState("10"); // 6, 7, 8, 9, 10
  const [topic, setTopic] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const topicsMap: { [key: string]: string[] } = {
    indian: [
      "Matter in Our Surroundings",
      "Is Matter Around Us Pure",
      "Atoms and Molecules",
      "Structure of the Atom",
      "Chemical Reactions and Equations",
      "Acids, Bases and Salts",
      "Metals and Non-metals",
      "Carbon and its Compounds",
      "Periodic Classification of Elements"
    ],
    international: [
      "States of Matter & Particle Theory",
      "Atomic Structure & Isotopes",
      "Bonding: Ionic, Covalent & Metallic",
      "Stoichiometry & Mole Calculations",
      "Chemical Energetics & Calorimetry",
      "Rates of Reaction & Collision Theory",
      "Reversible Reactions & Equilibrium",
      "Organic Chemistry: Hydrocarbons & Polymers",
      "The Periodic Table & Transition Metals"
    ],
    emcet: [
      "Foundation: Basic Concepts & Stoichiometry",
      "Foundation: Atomic Structure & Quantum Numbers",
      "Foundation: Classification & Periodic Properties",
      "Foundation: Chemical Bonding & Molecular Geometry",
      "Foundation: States of Matter: Gases & Liquids",
      "Foundation: Chemical Thermodynamics Basics",
      "Foundation: Basic Organic Chemistry & Nomenclature"
    ]
  };

  const handleGenerateFoundation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || isLoading) return;

    setIsLoading(true);
    setGeneratedContent("");

    try {
      let curriculumTitle = "Indian CBSE/ICSE Foundation";
      if (curriculum === "international") curriculumTitle = "International (GCSE / IGCSE / IB MYP)";
      if (curriculum === "emcet") curriculumTitle = "EMCET Early Engineering/Medical Foundation";

      const prompt = `Act as an expert chemistry mentor. Create a comprehensive, easy-to-understand foundational study guide and practice quiz for Class ${grade} students under the "${curriculumTitle}" curriculum focusing on the topic: "${topic}". Include key definitions, conceptual explanations, real-world examples, and 2 practice questions with answers.`;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });

      if (!response.ok) throw new Error("Failed to generate content");

      const data = await response.json();
      setGeneratedContent(data.content || data.text || "No content generated.");
    } catch (error) {
      console.error(error);
      setGeneratedContent("Sorry, I encountered an error generating the foundation study material.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="flex h-screen bg-slate-950 text-slate-400 items-center justify-center">
        Loading Foundation Workspace...
      </div>
    );
  }

  const navLinks = [
    { name: 'Dashboard', icon: '📊', href: '/dashboard' },
    { name: 'AI Tutor', icon: '🤖', href: '/dashboard/ai-tutor' },
    { name: 'Foundation (6th-10th)', icon: '🌱', href: '/dashboard/foundation', active: true },
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
            <BackButton />
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/50 border border-slate-700/50"
            >
              ☰
            </button>
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              🌱 6th-10th Foundation & EMCET Prep Hub
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
          
          {/* CONFIGURATION CARD */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">Select Curriculum & Grade Level</h2>
              <p className="text-slate-400 text-sm">Tailored chemistry foundation modules for Indian school boards, International curricula, and EMCET early prep.</p>
            </div>

            <form onSubmit={handleGenerateFoundation} className="space-y-4">
              
              {/* CURRICULUM SELECTOR */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { id: 'indian', title: '🇮🇳 Indian Boards (CBSE/ICSE)', desc: 'Classes 6-10 Core Science' },
                  { id: 'international', title: '🌍 International (GCSE/IB)', desc: 'IGCSE, GCSE & IB MYP' },
                  { id: 'emcet', title: '🚀 EMCET Foundation', desc: 'Early Engineering & Medical Prep' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { setCurriculum(item.id); setTopic(""); }}
                    className={`p-4 rounded-xl border text-left transition-all ${curriculum === item.id ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg' : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'}`}
                  >
                    <div className="font-semibold text-xs text-white mb-1">{item.title}</div>
                    <div className="text-[10px] text-slate-400">{item.desc}</div>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* GRADE SELECTOR */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Grade Level</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full bg-slate-950 text-white rounded-xl px-4 py-3 text-sm border border-slate-800 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="6">Grade 6 / Year 7</option>
                    <option value="7">Grade 7 / Year 8</option>
                    <option value="8">Grade 8 / Year 9 (EMCET Foundation Start)</option>
                    <option value="9">Grade 9 / Year 10 (High School Foundation)</option>
                    <option value="10">Grade 10 / Year 11 (Board & Entrance Prep)</option>
                  </select>
                </div>

                {/* TOPIC SELECTOR */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Select Topic</label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-slate-950 text-white rounded-xl px-4 py-3 text-sm border border-slate-800 focus:outline-none focus:border-indigo-500"
                    required
                  >
                    <option value="" disabled>-- Choose Topic --</option>
                    {topicsMap[curriculum].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3.5 rounded-xl text-sm transition-colors shadow-lg disabled:opacity-50"
              >
                {isLoading ? "Generating Foundation Module..." : "Generate Study Guide & Practice ✨"}
              </button>
            </form>
          </div>

          {/* AI CONTENT DISPLAY */}
          {(generatedContent || isLoading) && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                📖 Foundational Lesson & Quiz Guide
              </h3>
              {isLoading ? (
                <div className="py-12 text-center text-slate-400 animate-pulse text-sm">
                  Formulating curriculum-aligned notes and practice questions...
                </div>
              ) : (
                <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap bg-slate-950 p-6 rounded-xl border border-slate-800/80">
                  {generatedContent}
                </div>
              )}
            </div>
          )}

        </main>

      </div>
    </div>
  );
}