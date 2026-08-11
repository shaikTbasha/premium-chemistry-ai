import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-900 pt-24 pb-32 text-white sm:pt-32 sm:pb-40">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300 mb-8">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2"></span>
          Now trained on advanced organic synthesis
        </div>
        
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight sm:text-7xl">
          Master Complex Chemistry with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            Intelligent AI
          </span>
        </h1>
        
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-300">
          Stop struggling with reaction mechanisms and thermodynamics. Our premium AI tutor provides step-by-step guidance, visualizes molecular structures, and adapts to your university syllabus.
        </p>
        
        <div className="mt-10 flex justify-center gap-4">
          <Link 
            href="/signup" 
            className="rounded-full bg-indigo-500 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 transition-colors"
          >
            Start Free Trial
          </Link>
          <Link 
            href="#demo" 
            className="rounded-full border border-slate-700 bg-slate-800/50 px-8 py-3.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            Watch Demo
          </Link>
        </div>
      </div>
    </section>
  );
}