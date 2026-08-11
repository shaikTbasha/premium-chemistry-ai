"use client";
import ChemAILogo from "@/components/ChemAILogo";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/* NAVBAR */}
      <header className="h-20 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 max-w-7xl mx-auto">
        <ChemAILogo />
        <Link href="/" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
          ← Back to Home
        </Link>
      </header>

      {/* CONTENT */}
      <main className="py-20 px-6 max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            About ChemAI
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Revolutionizing Chemistry Education Through Artificial Intelligence
          </h1>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            ChemAI was built to bridge the gap between complex chemical theories and students striving to master them, from middle school science foundations to advanced entrance exams like JEE, NEET, and EMCET.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 space-y-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">🎯 Our Mission</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              To provide personalized, instant, and accurate academic guidance to every chemistry learner worldwide, making interactive atomic exploration, lab experiments, and complex calculations accessible to all.
            </p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 space-y-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">⚡ What Drives Us</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Traditional rote learning falls short when tackling multi-step organic reaction pathways or tricky stoichiometry problems. Our AI-driven platform breaks down concepts into intuitive, digestible steps.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-950/40 to-slate-900/40 border border-indigo-500/20 rounded-3xl p-8 md:p-12 text-center space-y-6">
          <h3 className="text-2xl font-bold text-white">Ready to transform how you study chemistry?</h3>
          <Link
            href="/"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/30"
          >
            Get Started Free 🚀
          </Link>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-900 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} ChemAI Platform. Empowering students worldwide.</p>
      </footer>

    </div>
  );
}