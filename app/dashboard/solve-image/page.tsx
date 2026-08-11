"use client";
import ChemAILogo from "@/components/ChemAILogo";
import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import BackButton from "@/components/BackButton";

export default function SolveImagePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null); // Store raw file object
  const [customPrompt, setCustomPrompt] = useState("");
  const [solution, setSolution] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); // Save raw file for FormData
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setSolution("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSolve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || isLoading) return;

    setIsLoading(true);
    setSolution("");

    try {
      const formData = new FormData();
      formData.append("file", imageFile); // Matches backend `formData.get('file')`

      const response = await fetch("/api/solve-image", {
        method: "POST",
        body: formData, // ⚠️ NO headers object here! Browser sets multipart/form-data boundary automatically.
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to solve image");

      setSolution(data.analysis || "No solution generated.");
    } catch (error: any) {
      console.error(error);
      setSolution(`Sorry, I encountered an error processing your image: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="flex h-screen bg-slate-950 text-slate-400 items-center justify-center">
        Loading Snap & Solve Workspace...
      </div>
    );
  }

  const navLinks = [
    { name: 'Dashboard', icon: '📊', href: '/dashboard' },
    { name: 'AI Tutor', icon: '🤖', href: '/dashboard/ai-tutor' },
    { name: 'Snap & Solve', icon: '📷', href: '/dashboard/solve-image', active: true },
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
            <BackButton />
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/50 border border-slate-700/50"
            >
              ☰
            </button>
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              📷 Snap & Solve Chemistry OCR
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
          
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">Upload Homework or Reaction Image</h2>
              <p className="text-slate-400 text-sm">Snap a photo or upload an image of a handwritten reaction, equation, or textbook question for instant AI analysis.</p>
            </div>

            <form onSubmit={handleSolve} className="space-y-4">
              
              <div className="border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-2xl p-8 text-center transition-colors bg-slate-950/50 relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {selectedImage ? (
                  <div className="space-y-4">
                    <img src={selectedImage} alt="Preview" className="max-h-48 mx-auto rounded-lg border border-slate-800 object-contain" />
                    <p className="text-xs text-indigo-400 font-medium">Click or drag another image to replace</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <span className="text-4xl">📁</span>
                    <div className="text-sm font-semibold text-white">Drag & drop your question image here</div>
                    <p className="text-xs text-slate-500">Supports PNG, JPG, WEBP</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Optional Instructions or Specific Question</label>
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g., Explain the mechanism of this reaction step by step"
                  className="w-full bg-slate-950 text-white rounded-xl px-4 py-3.5 text-sm border border-slate-800 focus:outline-none focus:border-indigo-500 shadow-inner"
                />
              </div>

              <button
                type="submit"
                disabled={!imageFile || isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3.5 rounded-xl text-sm transition-colors shadow-lg disabled:opacity-50"
              >
                {isLoading ? "Analyzing Image & Solving..." : "Solve Question 🚀"}
              </button>
            </form>
          </div>

          {(solution || isLoading) && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                ✨ OCR Solution & Explanation
              </h3>
              {isLoading ? (
                <div className="py-12 text-center text-slate-400 animate-pulse text-sm">
                  Scanning image text and calculating chemical pathways...
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