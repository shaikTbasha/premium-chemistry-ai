export default function Founder() {
  return (
    <section className="bg-slate-900 py-24 sm:py-32 border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built by Chemists, for Chemists
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            "I started ChemAI after spending hundreds of hours tutoring organic chemistry students who were struggling to visualize complex 3D mechanisms. Standard textbooks weren't enough. We needed an AI that actually understood the science."
          </p>
          <div className="mt-8 flex items-center gap-x-6">
            <div className="h-14 w-14 flex items-center justify-center rounded-full bg-indigo-500/20 border border-indigo-500/50 text-indigo-400 font-bold text-xl">
              JD
            </div>
            <div>
              <h3 className="text-base font-semibold leading-7 text-white">Dr. Jane Doe</h3>
              <p className="text-sm leading-6 text-indigo-400">Founder & Lead Scientist</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}