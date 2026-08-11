import Link from 'next/link';
import UpgradeButton from '@/components/UpgradeButton';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-4 py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mb-12">
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
          Simple, Transparent <span className="text-blue-500">Pricing</span>
        </h1>
        <p className="text-lg text-slate-400">
          Unlock the full power of AI-driven chemistry tools, advanced exam prep, and interactive labs.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        
        {/* Free Tier */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between shadow-lg">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Free Plan</h3>
            <p className="text-slate-400 text-sm mb-6">Essential tools for basic school science learning.</p>
            <div className="text-3xl font-extrabold text-white mb-6">
              $0 <span className="text-sm font-normal text-slate-400">/ forever</span>
            </div>

            <ul className="space-y-3 text-sm text-slate-300 mb-8">
              <li className="flex items-center gap-2">✅ Access to Basic Periodic Table</li>
              <li className="flex items-center gap-2">✅ Foundation School Science (6th-10th)</li>
              <li className="flex items-center gap-2">✅ Limited Molecular Canvas drawing</li>
              <li className="flex items-center gap-2 text-slate-500">❌ Advanced AI Tutor mechanisms</li>
              <li className="flex items-center gap-2 text-slate-500">❌ Unlimited Saved Molecule Library</li>
            </ul>
          </div>

          <Link
            href="/dashboard"
            className="w-full py-3 px-4 rounded-xl border border-slate-700 hover:bg-slate-800 text-center font-medium transition text-white"
          >
            Get Started Free
          </Link>
        </div>

        {/* Pro Tier */}
        <div className="bg-gradient-to-b from-blue-950/40 to-slate-900/60 border-2 border-blue-500 rounded-2xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            Most Popular
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-2">Pro Chemist</h3>
            <p className="text-slate-400 text-sm mb-6">Designed for serious competitive exam aspirants (JEE/NEET/EMCET).</p>
            <div className="text-3xl font-extrabold text-white mb-6">
              $19 <span className="text-sm font-normal text-slate-400">/ month</span>
            </div>

            <ul className="space-y-3 text-sm text-slate-300 mb-8">
              <li className="flex items-center gap-2">✨ Everything in Free, plus:</li>
              <li className="flex items-center gap-2">✨ Unlimited AI Tutor step-by-step breakdowns</li>
              <li className="flex items-center gap-2">✨ Snap & Solve image analysis tool</li>
              <li className="flex items-center gap-2">✨ Save & Export unlimited organic structures</li>
              <li className="flex items-center gap-2">✨ Custom Test Generator & NCERT Solvers</li>
            </ul>
          </div>

          <div className="w-full">
            <UpgradeButton />
          </div>
        </div>

      </div>
    </div>
  );
}