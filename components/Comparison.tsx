export default function Comparison() {
  const features = [
    {
      name: '24/7 Availability & Instant Answers',
      traditional: false,
      standardAI: true,
      premiumAI: true,
      note: 'Traditional tutors require scheduling; AI is always available.',
    },
    {
      name: 'Accurate Reaction Mechanisms',
      traditional: true,
      standardAI: false,
      premiumAI: true,
      note: 'Standard LLMs often hallucinate electron pushing & stereochemistry.',
    },
    {
      name: '3D Molecular Visualization',
      traditional: false,
      standardAI: false,
      premiumAI: true,
      note: 'Interactive 3D rendering for complex spatial orientations.',
    },
    {
      name: 'Syllabus & Textbook Alignment',
      traditional: 'Varies',
      standardAI: false,
      premiumAI: true,
      note: 'Upload your course syllabus for tailored problem sets.',
    },
    {
      name: 'Step-by-Step Problem Solving',
      traditional: true,
      standardAI: 'Basic',
      premiumAI: true,
      note: 'Full LaTeX equations, balanced equations, and unit conversions.',
    },
    {
      name: 'Cost Efficiency',
      traditional: '$50–$120 / hr',
      standardAI: 'Free – $20 / mo',
      premiumAI: 'Fraction of Tutor Cost',
      note: 'Unlimited questions for one flat monthly price.',
    },
  ];

  return (
    <section className="bg-slate-900 py-24 text-white sm:py-32" id="comparison">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-base font-semibold uppercase tracking-wider text-indigo-400">
            Why We Are Different
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built specifically for chemistry, not general chat
          </p>
          <p className="mt-4 text-lg text-slate-300">
            See how custom chemical intelligence compares to human tutoring and generic AI models.
          </p>
        </div>

        {/* Desktop Comparison Table */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/50 shadow-2xl backdrop-blur-sm">
          <div className="grid grid-cols-12 border-b border-slate-800 bg-slate-900/80 p-6 text-sm font-semibold">
            <div className="col-span-4 text-slate-400">Features & Capabilities</div>
            <div className="col-span-2 text-center text-slate-300">Human Tutor</div>
            <div className="col-span-3 text-center text-slate-300">Standard AI (ChatGPT)</div>
            <div className="col-span-3 text-center text-indigo-400 font-bold flex items-center justify-center gap-1.5">
              <span>Chemistry AI</span>
              <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-xs text-indigo-300 border border-indigo-500/30">
                Recommended
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-800/60">
            {features.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 items-center p-6 text-sm transition-colors hover:bg-slate-900/40"
              >
                {/* Feature Description */}
                <div className="col-span-4 pr-4">
                  <div className="font-medium text-white">{item.name}</div>
                  <div className="mt-1 text-xs text-slate-400">{item.note}</div>
                </div>

                {/* Traditional Tutor */}
                <div className="col-span-2 text-center text-slate-300">
                  <RenderStatus value={item.traditional} />
                </div>

                {/* Standard AI */}
                <div className="col-span-3 text-center text-slate-300">
                  <RenderStatus value={item.standardAI} />
                </div>

                {/* Premium Chemistry AI */}
                <div className="col-span-3 rounded-lg bg-indigo-950/30 py-3 text-center font-semibold text-white border border-indigo-500/20">
                  <RenderStatus value={item.premiumAI} isPremium />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper component for clean status indicators
function RenderStatus({ value, isPremium = false }: { value: boolean | string; isPremium?: boolean }) {
  if (typeof value === 'string') {
    return (
      <span className={isPremium ? 'text-indigo-300 font-semibold' : 'text-slate-400'}>
        {value}
      </span>
    );
  }

  if (value === true) {
    return (
      <div className="flex justify-center">
        <div className={`rounded-full p-1 ${isPremium ? 'bg-indigo-500/20 text-indigo-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="rounded-full bg-slate-800 p-1 text-slate-500">
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </div>
    </div>
  );
}