import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-800 bg-slate-900 flex-col hidden md:flex h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <Link href="/" className="text-2xl font-bold tracking-tight text-white transition-opacity hover:opacity-80">
          Chem<span className="text-indigo-500">AI</span>
        </Link>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">Menu</div>
        {[
          { name: 'Dashboard', icon: '📊', active: true },
          { name: 'AI Tutor', icon: '🤖' },
          { name: 'Practice', icon: '✍️' },
          { name: 'Test Generator', icon: '🎯' },
          { name: 'NCERT Solver', icon: '📘' },
          { name: 'Previous Papers', icon: '📄' },
        ].map((item) => (
          <Link key={item.name} href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${item.active ? 'bg-indigo-500/10 text-indigo-400 font-medium' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm">{item.name}</span>
          </Link>
        ))}

        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-6 mb-2 px-3">Your Space</div>
        {[
          { name: 'Notes', icon: '📓' },
          { name: 'Bookmarks', icon: '🔖' },
          { name: 'Progress', icon: '📈' },
          { name: 'Settings', icon: '⚙️' },
        ].map((item) => (
          <Link key={item.name} href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-slate-400 hover:bg-slate-800 hover:text-slate-200">
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm">{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}