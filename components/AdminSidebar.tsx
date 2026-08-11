'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  CreditCard, 
  DollarSign, 
  HelpCircle, 
  Cpu, 
  BookOpen, 
  FileText, 
  UploadCloud, 
  Bell, 
  Tag, 
  LogOut 
} from 'lucide-react';

const adminNavItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Students', href: '/admin/users', icon: Users },
  { name: 'Subscriptions', href: '/admin/payments', icon: CreditCard },
  { name: 'Revenue', href: '/admin/payments', icon: DollarSign },
  { name: 'Questions Asked', href: '/admin/questions-asked', icon: HelpCircle },
  { name: 'AI Usage', href: '/admin/ai-usage', icon: Cpu },
  { name: 'Manage Courses', href: '/admin/courses', icon: BookOpen },
  { name: 'Manage Mock Tests', href: '/admin/mock-tests', icon: FileText },
  { name: 'Upload Notes', href: '/admin/notes', icon: UploadCloud },
  { name: 'Announcements', href: '/admin/announcements', icon: Bell },
  { name: 'Coupons', href: '/admin/coupons', icon: Tag },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center space-x-2">
        <span className="text-xl font-bold text-white tracking-wide">Admin Panel</span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
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

      {/* Logout Section */}
      <div className="p-4 border-t border-slate-800">
        <Link
          href="/"
          className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-slate-800 hover:text-red-300 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}