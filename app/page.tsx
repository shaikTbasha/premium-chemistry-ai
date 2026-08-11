'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ChemAILogo from '@/components/ChemAILogo';
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

function AuthButtons() {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-sm transition shadow-lg shadow-cyan-500/25">
          Dashboard →
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
        <button className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition cursor-pointer" type="button">
          Sign In
        </button>
      </SignInButton>

      <SignUpButton mode="modal" fallbackRedirectUrl="/dashboard">
        <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm transition shadow-lg shadow-cyan-500/25 cursor-pointer" type="button">
          Get Started 🚀
        </button>
      </SignUpButton>
    </div>
  );
}

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark") || 
                   localStorage.getItem("theme") !== "light";
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How does the AI Handwritten Notes generator work?",
      a: "Our advanced AI engine compiles comprehensive revision sheets, formulas, and mind maps, formatting them instantly into authentic multi-page handwritten notebook layouts that you can review or print."
    },
    {
      q: "Can I view any molecule in 3D?",
      a: "Yes! Powered by PubChem's chemical database, you can search any chemical compound to inspect and rotate high-definition 2D structures and interactive 3D models."
    },
    {
      q: "Is Amma AI Academy suitable for competitive exams like JEE and NEET?",
      a: "Absolutely. Our tools, reaction mechanisms, NCERT solvers, and test generators are specifically optimized for high school and competitive chemistry exams."
    },
    {
      q: "What is included in the Free vs Pro plan?",
      a: "The Free plan gives you access to core tools like the Periodic Table and basic solvers. The Pro plan unlocks unlimited AI handwritten notes, 3D interactive models, and custom test generators."
    }
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans relative overflow-x-hidden transition-colors duration-200">
      
      {/* NIGHT SKY & ANIMATED DIAMOND MOLECULE BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-12 left-1/6 w-1 h-1 bg-slate-400 dark:bg-white rounded-full animate-ping"></div>
        <div className="absolute top-24 right-1/4 w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-200 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 left-1/10 w-1 h-1 bg-sky-500 dark:bg-sky-300 rounded-full animate-ping"></div>
        <div className="absolute top-2/3 right-1/5 w-1.5 h-1.5 bg-yellow-500 dark:bg-yellow-100 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-slate-400 dark:bg-white rounded-full animate-ping"></div>
        <div className="absolute bottom-12 right-1/3 w-1.5 h-1.5 bg-indigo-400 dark:bg-indigo-300 rounded-full animate-pulse"></div>

        <div className="absolute top-1/4 right-1/10 animate-bounce duration-1000 opacity-60">
          <div className="relative w-36 h-36">
            <div className="absolute top-0 left-16 w-4 h-4 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/80 animate-pulse"></div>
            <div className="absolute top-16 left-0 w-4 h-4 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/80"></div>
            <div className="absolute top-16 right-0 w-4 h-4 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/80"></div>
            <div className="absolute bottom-0 left-16 w-4 h-4 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/80"></div>
            <div className="absolute top-16 left-16 w-6 h-6 rounded-full bg-indigo-500 shadow-2xl shadow-indigo-500/90 animate-pulse"></div>
            <div className="absolute top-4 left-8 w-20 h-0.5 bg-cyan-300/80 rotate-45"></div>
            <div className="absolute top-4 right-8 w-20 h-0.5 bg-cyan-300/80 -rotate-45"></div>
            <div className="absolute bottom-4 left-8 w-20 h-0.5 bg-cyan-300/80 -rotate-45"></div>
            <div className="absolute bottom-4 right-8 w-20 h-0.5 bg-cyan-300/80 rotate-45"></div>
          </div>
        </div>

        <div className="absolute bottom-1/3 left-1/12 animate-pulse duration-1000 opacity-50">
          <div className="relative w-28 h-28">
            <div className="absolute top-0 left-12 w-3.5 h-3.5 rounded-full bg-yellow-300 shadow-md shadow-yellow-300/80"></div>
            <div className="absolute top-12 left-0 w-3.5 h-3.5 rounded-full bg-yellow-300 shadow-md"></div>
            <div className="absolute top-12 right-0 w-3.5 h-3.5 rounded-full bg-yellow-300 shadow-md"></div>
            <div className="absolute bottom-0 left-12 w-3.5 h-3.5 rounded-full bg-yellow-300 shadow-md"></div>
            <div className="absolute top-12 left-12 w-5 h-5 rounded-full bg-amber-500 shadow-xl"></div>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <header className="relative z-20 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <ChemAILogo size="large" />
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <a href="#about" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">About</a>
          <a href="#courses" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">Courses</a>
          <a href="#features" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">Why Us</a>
          <a href="#pricing" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">Pricing</a>
          <a href="#testimonials" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">Testimonials</a>
          <a href="#faq" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">FAQ</a>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition shadow-sm cursor-pointer"
            title="Toggle Theme"
            type="button"
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>

          <AuthButtons />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 max-w-5xl mx-auto text-center px-6 pt-16 pb-24 space-y-8">
        <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 px-4 py-1.5 rounded-full text-xs font-bold text-cyan-600 dark:text-cyan-300 shadow-sm">
          <span>✨</span> Night Sky Workspace • Powered by Advanced Chemistry AI &amp; Crystal Models
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight drop-shadow-md">
          Master Chemistry with <span className="text-cyan-600 dark:text-cyan-400">AMMA AI ACADEMY</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-medium">
          Explore interactive 3D molecule visualizers, generate multi-page handwritten revision notes, solve complex equations, and ace your exams effortlessly.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/dashboard" className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold px-8 py-4 rounded-2xl text-base transition shadow-xl shadow-cyan-500/25">
            Launch Student Workspace →
          </Link>
          <Link href="#pricing" className="w-full sm:w-auto bg-slate-100 dark:bg-slate-900/80 hover:bg-slate-200 dark:hover:bg-slate-800 backdrop-blur-md text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 font-bold px-8 py-4 rounded-2xl text-base transition">
            View Pricing Plans 💎
          </Link>
        </div>
      </section>

      {/* PUBLICITY / SOCIAL PROOF */}
      <section className="relative z-10 bg-slate-100/60 dark:bg-slate-900/40 backdrop-blur-md border-y border-slate-200 dark:border-slate-800/80 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <p className="text-xs uppercase tracking-widest font-bold text-cyan-600 dark:text-cyan-400">
            Trusted by top-performing students preparing for JEE, NEET, and university exams
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-90 text-slate-700 dark:text-slate-200 font-bold text-lg">
            <span>🏛️ MIT Aspire</span>
            <span>⚡ IIT/NEET Achievers</span>
            <span>🔬 PubChem Integrated</span>
            <span>🌟 50,000+ Active Learners</span>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="bg-slate-100 dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-slate-200 dark:border-slate-800">
            About Amma AI Academy
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Bridging the gap between complex chemistry and intuitive learning.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            Amma AI Academy was built by expert educators and AI engineers to solve the biggest bottleneck in chemistry education: visualization and structured revision. We combine real-time chemical data with generative AI to give you custom study tools instantly.
          </p>
          <ul className="space-y-3 text-slate-800 dark:text-white font-semibold text-sm">
            <li className="flex items-center gap-3">✅ Real-time 2D &amp; 3D molecule inspection</li>
            <li className="flex items-center gap-3">✅ Instant AI handwritten notes with structured mind maps</li>
            <li className="flex items-center gap-3">✅ Automated stoichiometry and equation balancers</li>
          </ul>
        </div>
        <div className="bg-slate-100 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6 text-slate-900 dark:text-white">
          <div className="text-4xl">💡</div>
          <h3 className="text-2xl font-bold">Why Chemistry Needs AI</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Traditional textbooks are static. Chemical bonding, stereoisomerism, and thermodynamic pathways require dynamic interaction. Amma AI Academy turns any chemical topic into an immersive visual experience.
          </p>
        </div>
      </section>

      {/* COURSES OFFERED SECTION */}
      <section id="courses" className="relative z-10 max-w-7xl mx-auto px-6 py-20 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="bg-slate-100 dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-slate-200 dark:border-slate-800">
            Curriculum &amp; Modules
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Comprehensive Courses Offered</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Tailored learning modules spanning foundational sciences to advanced competitive exam prep.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-100 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-lg space-y-4 text-slate-900 dark:text-white hover:border-cyan-500/50 transition">
            <div className="text-3xl">🌱</div>
            <h3 className="text-xl font-bold">Foundation (6th - 10th)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">Core introduction to atoms, molecules, the periodic table, and basic chemical reactions for young minds.</p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-lg space-y-4 text-slate-900 dark:text-white hover:border-cyan-500/50 transition">
            <div className="text-3xl">⚡</div>
            <h3 className="text-xl font-bold">JEE &amp; NEET Mastery</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">High-yield organic, inorganic, and physical chemistry problem-solving shortcuts, past papers, and test generators.</p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-lg space-y-4 text-slate-900 dark:text-white hover:border-cyan-500/50 transition">
            <div className="text-3xl">🎓</div>
            <h3 className="text-xl font-bold">Advanced University Chemistry</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">Complex molecular spectroscopy, quantum chemistry fundamentals, reaction mechanisms, and thermodynamics.</p>
          </div>
        </div>
      </section>

      {/* WHY TO CHOOSE US */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-20 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="bg-slate-100 dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-slate-200 dark:border-slate-800">
            Advantages
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Why Choose Amma AI Academy?</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Designed specifically to give students an unfair advantage in chemistry exams.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-100 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-3 text-slate-900 dark:text-white">
            <div className="text-2xl">🧪</div>
            <h4 className="font-bold">2D &amp; 3D Viewer</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">Instantly search any molecule and explore bonds in 3D with download options.</p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-3 text-slate-900 dark:text-white">
            <div className="text-2xl">📝</div>
            <h4 className="font-bold">AI Handwritten Notes</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">Multi-page notebook layouts with mind maps and revision mnemonics.</p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-3 text-slate-900 dark:text-white">
            <div className="text-2xl">⚖️</div>
            <h4 className="font-bold">Stoichiometry Solver</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">Balance complex equations and compute yields in seconds.</p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-3 text-slate-900 dark:text-white">
            <div className="text-2xl">🎯</div>
            <h4 className="font-bold">Test Generator</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">Create custom practice exams tailored to your specific weak spots.</p>
          </div>
        </div>
      </section>

      {/* PRICE COMPARISON SECTION */}
      <section id="pricing" className="relative z-10 max-w-7xl mx-auto px-6 py-20 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="bg-slate-100 dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-slate-200 dark:border-slate-800">
            Transparent Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Choose Your Plan</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Start free and upgrade when you are ready to master your exams.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-slate-100 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl space-y-6 text-slate-900 dark:text-white flex flex-col justify-between">
            <div className="space-y-4">
              <span className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-lg text-xs font-bold">FREE STUDENT</span>
              <h3 className="text-3xl font-extrabold">$0 <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/ forever</span></h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">Essential chemistry tools for casual learners and practice.</p>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 pt-2">
                <li>✅ Interactive Periodic Table</li>
                <li>✅ Basic Molecule Search</li>
                <li>✅ Stoichiometry Solver</li>
                <li>❌ Unlimited AI Handwritten Notes</li>
                <li>❌ Advanced 3D Interactive Models</li>
              </ul>
            </div>
            <Link href="/dashboard" className="block text-center bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold py-3 rounded-xl text-sm hover:bg-slate-300 dark:hover:bg-slate-700 transition">
              Get Started Free
            </Link>
          </div>
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-8 rounded-3xl shadow-2xl space-y-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-slate-950 text-cyan-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Most Popular
            </div>
            <div className="space-y-4">
              <span className="bg-slate-950/20 text-white px-3 py-1 rounded-lg text-xs font-bold">PRO CHEMIST</span>
              <h3 className="text-3xl font-extrabold">$9.99 <span className="text-xs font-normal text-slate-100">/ month</span></h3>
              <p className="text-xs text-slate-100">Full access to all AI tools, handwritten notes, and test generators.</p>
              <ul className="space-y-2 text-sm text-slate-100 font-medium pt-2">
                <li>✅ Unlimited AI Handwritten Notes</li>
                <li>✅ Full 3D Interactive Molecule Viewer</li>
                <li>✅ Custom Test &amp; Quiz Generator</li>
                <li>✅ Priority AI Tutor Support</li>
                <li>✅ PDF Export &amp; Print Ready Sheets</li>
              </ul>
            </div>
            <Link href="/dashboard" className="block text-center bg-slate-950 text-cyan-300 font-extrabold py-3 rounded-xl text-sm hover:bg-slate-900 transition shadow-lg">
              Upgrade to Pro 🚀
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="relative z-10 max-w-7xl mx-auto px-6 py-20 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="bg-slate-100 dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-slate-200 dark:border-slate-800">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">What Students Say</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Hear from students who transformed their chemistry grades with Amma AI Academy.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-100 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-lg space-y-4 text-slate-900 dark:text-white">
            <div className="text-yellow-500 dark:text-yellow-400 text-lg">★★★★★</div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
              &quot;The AI Handwritten Notes feature is a game-changer! It saved me hours of note-taking and the mind maps make organic mechanisms super easy to remember.&quot;
            </p>
            <div className="text-xs font-bold">— Rahul S., JEE Aspirant</div>
          </div>
          <div className="bg-slate-100 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-lg space-y-4 text-slate-900 dark:text-white">
            <div className="text-yellow-500 dark:text-yellow-400 text-lg">★★★★★</div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
              &quot;Being able to search any molecule and view its 3D structure instantly helped me ace my university stereochemistry exams. Incredible app!&quot;
            </p>
            <div className="text-xs font-bold">— Emily R., Pre-Med Student</div>
          </div>
          <div className="bg-slate-100 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-lg space-y-4 text-slate-900 dark:text-white">
            <div className="text-yellow-500 dark:text-yellow-400 text-lg">★★★★★</div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
              &quot;The test generator and stoichiometry solver make practicing effortless. My confidence in chemistry has skyrocketed.&quot;
            </p>
            <div className="text-xs font-bold">— David K., High School Senior</div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="relative z-10 max-w-4xl mx-auto px-6 py-20 space-y-8">
        <div className="text-center space-y-3">
          <span className="bg-slate-100 dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-slate-200 dark:border-slate-800">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-slate-100 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-6 font-bold text-slate-900 dark:text-white flex justify-between items-center cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className="text-cyan-600 dark:text-cyan-400 text-xl">{activeFaq === idx ? '−' : '+'}</span>
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-6 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative z-10 max-w-4xl mx-auto px-6 py-20 space-y-8">
        <div className="bg-slate-100 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl space-y-6 text-slate-900 dark:text-white text-center">
          <span className="bg-slate-200 dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-slate-200 dark:border-slate-800">
            Get in Touch
          </span>
          <h2 className="text-3xl font-extrabold">Have Questions or Need Support?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Our support team and chemistry experts are available 24/7 to help you with any questions about our workspace tools.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully! We will get back to you soon.'); }} className="max-w-md mx-auto space-y-4 text-left pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Your Email</label>
              <input type="email" required placeholder="student@example.com" className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Your Message</label>
              <textarea rows={3} required placeholder="How can we help you?" className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500"></textarea>
            </div>
            <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3.5 rounded-xl text-sm transition shadow-lg cursor-pointer">
              Send Message ✉️
            </button>
          </form>

          {/* Social Media Contact Quick Connect */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <p className="text-xs uppercase tracking-widest font-bold text-cyan-600 dark:text-cyan-400">Or connect with us instantly on</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
              <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 px-4 py-2 rounded-xl transition flex items-center gap-2 text-slate-800 dark:text-white">
                💬 WhatsApp
              </a>
              <a href="https://telegram.org" target="_blank" rel="noreferrer" className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 px-4 py-2 rounded-xl transition flex items-center gap-2 text-slate-800 dark:text-white">
                ✈️ Telegram
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 px-4 py-2 rounded-xl transition flex items-center gap-2 text-slate-800 dark:text-white">
                💼 LinkedIn
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION (CTA) SECTION */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-10 md:p-14 rounded-3xl shadow-2xl space-y-6">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Ready to Master Chemistry?</h2>
          <p className="text-slate-100 font-medium max-w-xl mx-auto text-sm md:text-base">
            Join thousands of students using Amma AI Academy workspace to boost their exam scores and explore molecules interactively.
          </p>
          <div>
            <Link href="/dashboard" className="inline-block bg-slate-950 hover:bg-slate-900 text-cyan-300 font-extrabold px-8 py-4 rounded-2xl text-base transition shadow-xl">
              Get Started Now — It&apos;s Free 🚀
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER WITH SOCIAL MEDIA LINKS */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-12 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex justify-center gap-6 font-semibold">
          <a href="#about" className="hover:text-cyan-600 dark:hover:text-cyan-400">About</a>
          <a href="#courses" className="hover:text-cyan-600 dark:hover:text-cyan-400">Courses</a>
          <a href="#pricing" className="hover:text-cyan-600 dark:hover:text-cyan-400">Pricing</a>
          <a href="#contact" className="hover:text-cyan-600 dark:hover:text-cyan-400">Contact</a>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
          <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            💬 WhatsApp
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            📘 Facebook
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            💼 LinkedIn
          </a>
          <a href="https://telegram.org" target="_blank" rel="noreferrer" className="bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            ✈️ Telegram
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            🐦 Twitter/X
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-1.5 rounded-lg transition font-medium flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            📸 Instagram
          </a>
        </div>

        <p>© 2026 Amma AI Academy. All rights reserved.</p>
      </footer>

    </div>
  );
}