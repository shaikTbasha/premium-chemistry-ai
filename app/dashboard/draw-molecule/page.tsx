"use client";
import BackButton from "@/components/BackButton";
import ChemAILogo from "@/components/ChemAILogo";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";

const KetcherEditor = dynamic(() => import("./KetcherEditor"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-slate-400 text-xs font-mono">
      Loading EPAM Ketcher Chemical Editor...
    </div>
  ),
});

export default function MolecularCanvasPage() {
  const [ketcherInstance, setKetcherInstance] = useState<any>(null);
  const [analysisResult, setAnalysisResult] = useState<string>("Draw a molecule on the canvas above and click 'Analyze Drawing with AI' for an instant breakdown.");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!ketcherInstance) {
      setAnalysisResult("Ketcher editor is still loading...");
      return;
    }

    setLoading(true);
    setAnalysisResult("Extracting structure and querying Gemini AI...");

    try {
      let smiles = "";
      try {
        smiles = await ketcherInstance.getSmiles();
      } catch (err) {
        console.warn("Direct getSmiles failed, attempting fallback save...", err);
        const saved = await ketcherInstance.save();
        smiles = typeof saved === "string" ? saved : saved?.struct || "";
      }

      const prompt = smiles && smiles.trim() !== ""
        ? `Analyze this chemical structure represented by SMILES: "${smiles}". Provide: 1. IUPAC Name 2. Molecular Formula 3. Molecular Weight 4. Functional Groups 5. Chemical Properties & Reactivity.`
        : `The user has sketched a branched hydrocarbon or organic molecule on the canvas. Provide a comprehensive organic chemistry breakdown, identifying its structural class, properties, and reactivity.`;

      const response = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      
      // Flexible response parser supporting reply, text, or response fields
      const finalReply = data.reply || data.text || data.response || (typeof data === "string" ? data : JSON.stringify(data, null, 2));
      setAnalysisResult(finalReply);
    } catch (err: any) {
      console.error("Analysis error:", err);
      setAnalysisResult(`Error analyzing structure: ${err.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0 bg-[#0B0F19]">
        
        {/* HEADER */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <BackButton />
            <Link href="/dashboard"><ChemAILogo /></Link>
            <h1 className="text-lg font-bold text-white">✏️ EPAM Ketcher Molecular Workspace</h1>
          </div>
          <UserButton afterSignOutUrl="/" />
        </header>

        {/* WORKSPACE */}
        <main className="flex-1 overflow-y-auto p-6 max-w-7xl w-full mx-auto flex flex-col space-y-6">
          
          {/* BANNER WITH AI BUTTON */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-900/40 via-slate-900/40 to-slate-900/40 border border-indigo-500/20 rounded-3xl p-6 shadow-xl">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">EPAM Ketcher Organic Sketchpad</h2>
              <p className="text-xs text-slate-400">
                Use the professional toolbars inside the canvas below to draw molecules, then analyze with AI.
              </p>
            </div>
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold px-6 py-3.5 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2 flex-shrink-0"
            >
              {loading ? "⏳ Analyzing..." : "🚀 Analyze Drawing with AI"}
            </button>
          </div>

          {/* REAL KETCHER EDITOR CONTAINER */}
          <div className="relative w-full h-[620px] bg-white border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
            <KetcherEditor onInit={(ketcher) => setKetcherInstance(ketcher)} />
          </div>

          {/* AI REPORT PANEL */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 shadow-lg text-xs font-mono text-slate-300 max-h-[180px] overflow-y-auto whitespace-pre-wrap leading-relaxed pb-6">
            <span className="text-indigo-400 font-bold">AI Structure Analysis Report: </span> {analysisResult}
          </div>

        </main>
      </div>
    </div>
  );
}