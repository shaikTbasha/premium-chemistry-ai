'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  Bot, 
  Camera, 
  PenTool, 
  Music, 
  GraduationCap, 
  FlaskConical, 
  Scale, 
  Grid, 
  CheckCircle, 
  Copy, 
  FileText, 
  Book, 
  Archive 
} from 'lucide-react';

const navigationGroups = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Library', href: '/library', icon: BookOpen },
    ],
  },
  {
    title: 'AI & Lab Tools',
    items: [
      { name: 'AI Tutor', href: '/ai-tutor', icon: Bot },
      { name: 'Snap & Solve', href: '/snap-solve', icon: Camera },
      { name: 'Draw Molecule', href: '/draw', icon: PenTool },
      { name: 'Lab Assistant', href: '/lab-assistant', icon: FlaskConical },
    ],
  },
  {
    title: 'Study & Chemistry',
    items: [
      { name: 'Stoichiometry', href: '/stoichiometry', icon: Scale },
      { name: 'Periodic Table', href: '/periodic-table', icon: Grid },
      { name: 'Study Songs', href: '/study-songs', icon: Music },
      { name: 'Foundation (6th-10th)', href: '/foundation', icon: GraduationCap },
    ],
  },
  {
    title: 'Practice & Exams',
    items: [
      { name: 'Practice', href: '/practice', icon: CheckCircle },
      { name: 'Flashcards', href: '/flashcards', icon: Copy },
      { name: 'Test Generator', href: '/test-generator', icon: FileText },
      { name: 'NCERT Solver', href: '/ncert-solver', icon: Book },
      { name: 'Previous Papers', href: '/previous-papers', icon: Archive },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center space-x-2">
        <span className="text-xl font-bold text-white tracking-wide">ChemAI</span>
      </div>

      {/* Navigation Links with Scrollbar */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {navigationGroups.map((group, groupIdx) => (
          <div key={groupIdx}>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}