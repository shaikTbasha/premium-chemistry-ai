export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-slate-900 py-24 sm:py-32 border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-400">
            Student Success
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Trusted by future scientists
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            
            {/* Testimonial 1 */}
            <div className="rounded-2xl bg-slate-800/50 p-6 border border-slate-700/50 shadow-sm">
              <p className="text-slate-300">
                "ChemAI completely changed how I study organic chemistry. The step-by-step mechanism visualizations helped me finally understand what was happening in my reactions, taking me from a C to an A-."
              </p>
              <div className="mt-6 flex items-center gap-x-4">
                <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/50">
                  S
                </div>
                <div>
                  <div className="font-semibold text-white">Sarah Jenkins</div>
                  <div className="text-sm text-slate-400">Pre-Med Student</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="rounded-2xl bg-slate-800/50 p-6 border border-slate-700/50 shadow-sm">
              <p className="text-slate-300">
                "The LaTeX report generation feature saves me hours every week. I just input my lab data, and ChemAI formats everything perfectly with all the thermodynamic equations correctly aligned."
              </p>
              <div className="mt-6 flex items-center gap-x-4">
                <div className="h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold border border-cyan-500/50">
                  M
                </div>
                <div>
                  <div className="font-semibold text-white">Marcus Chen</div>
                  <div className="text-sm text-slate-400">Chemistry Major</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="rounded-2xl bg-slate-800/50 p-6 border border-slate-700/50 shadow-sm">
              <p className="text-slate-300">
                "Having a 24/7 AI tutor that actually understands post-graduate physical chemistry is mind-blowing. It's like having a professor on call whenever I get stuck on complex kinetics problems."
              </p>
              <div className="mt-6 flex items-center gap-x-4">
                <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold border border-purple-500/50">
                  A
                </div>
                <div>
                  <div className="font-semibold text-white">Dr. Amina Patel</div>
                  <div className="text-sm text-slate-400">Research Assistant</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}