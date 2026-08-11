"use client";
import UserDropdown from "@/components/UserDropdown";
import ChemAILogo from "@/components/ChemAILogo";
import Link from "next/link";

const navigationGroups = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', icon: '📊', href: '/dashboard' },
      { name: 'Library', icon: '📚', href: '/library' },
    ],
  },
  {
    title: 'AI & Lab Tools',
    items: [
      { name: 'AI Tutor', icon: '🤖', href: '/dashboard/ai-tutor' },
      { name: 'Snap & Solve', icon: '📷', href: '/dashboard/solve-image' },
      { name: 'Draw Molecule', icon: '✏️', href: '/dashboard/draw-molecule' },
      { name: 'Molecule Viewer', icon: '🧪', href: '/dashboard/molecule-viewer' },
      { name: 'Lab Assistant', icon: '🔬', href: '/dashboard/lab-assistant' },
    ],
  },
  {
    title: 'Study & Chemistry',
    items: [
      { name: 'AI Handwritten Notes', icon: '📝', href: '/dashboard/ai-notes' },
      { name: 'Stoichiometry', icon: '⚖️', href: '/dashboard/stoichiometry' },
      { name: 'Periodic Table', icon: '🧪', href: '/dashboard/periodic-table' },
      { name: 'Study Songs', icon: '🎵', href: '/dashboard/songs' },
      { name: 'Foundation (6th-10th)', icon: '🌱', href: '/dashboard/foundation' },
    ],
  },
  {
    title: 'Practice & Exams',
    items: [
      { name: 'Practice', icon: '✍️', href: '/dashboard/practice' },
      { name: 'Flashcards', icon: '⚡', href: '/dashboard/flashcards' },
      { name: 'Test Generator', icon: '🎯', href: '/dashboard/test-generator' },
      { name: 'NCERT Solver', icon: '📖', href: '/dashboard/ncert-solver' },
      { name: 'Previous Papers', icon: '📄', href: '/dashboard/previous-papers' },
    ],
  },
];

const quickTools = [
  { name: 'Molecular Canvas', description: 'Draw and export organic structures.', icon: '✏️', href: '/dashboard/draw-molecule', color: 'from-blue-500/10 to-indigo-500/10 border-blue-500/20' },
  { name: '2D & 3D Molecule Viewer', description: 'Search any chemical compound, view interactive 3D models and download structures.', icon: '🧪', href: '/dashboard/molecule-viewer', color: 'from-cyan-500/10 to-blue-500/10 border-cyan-500/20' },
  { name: 'AI Handwritten Notes', description: 'Generate realistic multi-page handwritten chemistry notes and mind maps.', icon: '📝', href: '/dashboard/ai-notes', color: 'from-amber-500/10 to-orange-500/10 border-amber-500/20' },
  { name: 'AI Tutor', description: 'Get instant mechanism breakdowns and answers.', icon: '🤖', href: '/dashboard/ai-tutor', color: 'from-purple-500/10 to-pink-500/10 border-purple-500/20' },
  { name: 'Stoichiometry Solver', description: 'Balance equations and compute reaction yields.', icon: '⚖️', href: '/dashboard/stoichiometry', color: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20' },
  { name: 'Periodic Table', description: 'Explore element properties and trends.', icon: '🧪', href: '/dashboard/periodic-table', color: 'from-amber-500/10 to-orange-500/10 border-amber-500/20' },
  { name: 'Saved Library', description: 'Review your stored chemical structures and notes.', icon: '📚', href: '/library', color: 'from-indigo-500/10 to-purple-500/10 border-indigo-500/20' },
  { name: 'Test Generator', description: 'Create custom chemistry practice tests instantly.', icon: '🎯', href: '/dashboard/test-generator', color: 'from-rose-500/10 to-red-500/10 border-rose-500/20' },
];

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/40 hidden md:flex flex-col">
        <div className="h-16 border-b border-slate-800 flex items-center px-6">
          <Link href="/dashboard"><ChemAILogo /></Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {navigationGroups.map((group, groupIdx) => (
            <div key={groupIdx}>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition"
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 border-b border-slate-800 bg-slate-900/40 flex items-center justify-between px-8">
          <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <span>📊</span> ChemAI Control Center
          </h1>
          <UserDropdown/>
        </header>

        <main className="p-8 space-y-8 max-w-7xl">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-2 text-white">Welcome back, Chemist!</h2>
            <p className="text-slate-400">Select a tool from the sidebar or choose a quick shortcut below to begin your analysis.</p>
          </div>

          {/* Quick Access Grid */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Access Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickTools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className={`bg-gradient-to-br ${tool.color} border rounded-xl p-6 hover:scale-[1.02] transition shadow-sm flex flex-col justify-between group`}
                >
                  <div>
                    <div className="text-3xl mb-3">{tool.icon}</div>
                    <h4 className="text-lg font-semibold text-white group-hover:text-blue-400 transition mb-1">
                      {tool.name}
                    </h4>
                    <p className="text-sm text-slate-400">{tool.description}</p>
                  </div>
                  <div className="mt-4 flex items-center text-xs font-medium text-blue-400 group-hover:translate-x-1 transition-transform">
                    Launch tool &rarr;
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}