export default function TrustBar() {
  return (
    <div className="border-y border-slate-800 bg-slate-900/50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-slate-400 mb-6">
          Trusted by top chemistry students at
        </p>
        <div className="flex flex-wrap justify-center gap-10 opacity-70 grayscale transition-all hover:grayscale-0 sm:gap-16">
          {/* Placeholder logos for universities */}
          <div className="flex items-center gap-2 text-xl font-bold text-slate-300">
            <span className="h-8 w-8 rounded-full bg-slate-700 block"></span>
            Stanford
          </div>
          <div className="flex items-center gap-2 text-xl font-bold text-slate-300">
            <span className="h-8 w-8 rounded-full bg-slate-700 block"></span>
            MIT
          </div>
          <div className="flex items-center gap-2 text-xl font-bold text-slate-300">
            <span className="h-8 w-8 rounded-full bg-slate-700 block"></span>
            Oxford
          </div>
          <div className="flex items-center gap-2 text-xl font-bold text-slate-300">
            <span className="h-8 w-8 rounded-full bg-slate-700 block"></span>
            Cambridge
          </div>
        </div>
      </div>
    </div>
  );
}