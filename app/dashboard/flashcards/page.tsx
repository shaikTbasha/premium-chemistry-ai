"use client";
import BackButton from "@/components/BackButton";
import ChemAILogo from "@/components/ChemAILogo";
import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function FlashcardsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Default flashcards deck
  const [cards, setCards] = useState([
    {
      id: 1,
      front: "What is Markovnikov's Rule?",
      back: "In addition of a protic acid HX to an asymmetric alkene, the acidic hydrogen binds to the carbon with more hydrogen substituents, while the halide binds to the more substituted carbon.",
      category: "Organic Chemistry"
    },
    {
      id: 2,
      back: "E_cell = E0_cell - (0.0591 / n) log([Products] / [Reactants]) at 298K",
      front: "State the Nernst Equation for a electrochemical cell at 298K.",
      category: "Physical Chemistry"
    },
    {
      id: 3,
      front: "Why do transition metals exhibit variable oxidation states?",
      back: "Due to the small energy difference between (n-1)d and ns orbitals, electrons from both can be made available for bond formation.",
      category: "Inorganic Chemistry"
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [customTopic, setCustomTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleGenerateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopic.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const prompt = `Generate 3 chemistry flashcards about "${customTopic}". Return ONLY valid JSON format in this exact structure without markdown ticks:
      [
        {
          "id": 1,
          "front": "Question or prompt?",
          "back": "Detailed answer or explanation.",
          "category": "${customTopic}"
        }
      ]`;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });

      if (!response.ok) throw new Error("Failed to generate deck");

      const data = await response.json();
      let rawContent = data.content || data.text || "";
      rawContent = rawContent.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(rawContent);
      
      if (Array.isArray(parsed) && parsed.length > 0) {
        setCards(parsed);
        setCurrentIndex(0);
        setIsFlipped(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setCustomTopic("");
    }
  };

  if (!isMounted) {
    return (
      <div className="flex h-screen bg-slate-950 text-slate-400 items-center justify-center">
        Loading Flashcards Workspace...
      </div>
    );
  }

  const navLinks = [
    { name: 'Dashboard', icon: '📊', href: '/dashboard' },
    { name: 'AI Tutor', icon: '🤖', href: '/dashboard/ai-tutor' },
    { name: 'Practice', icon: '✍️', href: '/dashboard/practice' },
    { name: 'Flashcards', icon: '⚡', href: '/dashboard/flashcards', active: true },
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
              ⚡ Quick Revision Flashcards
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 flex items-center justify-center">
              <ClerkLoading><div className="h-8 w-8 rounded-full bg-slate-700 animate-pulse" /></ClerkLoading>
              <ClerkLoaded><UserButton afterSignOutUrl="/" /></ClerkLoaded>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 max-w-3xl w-full mx-auto space-y-6 flex flex-col justify-center">
          
          {/* GENERATE CUSTOM DECK */}
          <form onSubmit={handleGenerateDeck} className="flex gap-2">
            <input 
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="Generate AI flashcards on any topic (e.g., Coordination Compounds)..."
              className="flex-1 bg-slate-900 text-white rounded-xl px-4 py-3 text-xs border border-slate-800 focus:outline-none focus:border-indigo-500 shadow-inner"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl text-xs font-medium transition-colors shadow-lg disabled:opacity-50 flex-shrink-0"
            >
              {isLoading ? "Generating..." : "Generate Deck 🚀"}
            </button>
          </form>

          {/* FLIP CARD CONTAINER */}
          {cards.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-400 px-2">
                <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full font-medium">
                  {cards[currentIndex].category || "Chemistry"}
                </span>
                <span>Card {currentIndex + 1} of {cards.length}</span>
              </div>

              {/* CARD */}
              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-full h-72 bg-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-2xl flex flex-col justify-between cursor-pointer select-none hover:border-slate-700 transition-all text-center relative group"
              >
                <div className="absolute top-4 right-4 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                  {isFlipped ? "Answer (Click to flip back)" : "Question (Click to reveal answer)"}
                </div>

                <div className="flex-1 flex items-center justify-center">
                  <p className="text-base md:text-lg font-medium text-white leading-relaxed">
                    {isFlipped ? cards[currentIndex].back : cards[currentIndex].front}
                  </p>
                </div>

                <div className="text-[11px] text-indigo-400 font-medium">
                  {isFlipped ? "✨ Tap anywhere to see question" : "💡 Tap anywhere to reveal answer"}
                </div>
              </div>

              {/* CONTROLS */}
              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={handlePrev}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium transition-colors border border-slate-700 shadow"
                >
                  ← Previous Card
                </button>
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium transition-colors shadow-lg"
                >
                  Next Card →
                </button>
              </div>
            </div>
          )}

        </main>

      </div>
    </div>
  );
}