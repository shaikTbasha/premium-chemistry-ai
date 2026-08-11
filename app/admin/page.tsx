import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminPage() {
  const usersCount = await prisma.user?.count?.().catch(() => 0) || 0;
  const moleculesCount = await prisma.molecule?.count?.().catch(() => 0) || 0;

  const adminLinks = [
    { name: 'User Management', href: '/admin/users', icon: '👥', desc: 'Manage registered students & accounts' },
    { name: 'PDF Analytics & Logs', href: '/admin/analytics', icon: '📄', desc: 'Track PDF uploads, user emails & statuses' },
    { name: 'Payments & Subscriptions', href: '/admin/payments', icon: '💳', desc: 'View transactions and revenue' },
    { name: 'Mock Tests', href: '/admin/mock-tests', icon: '📝', desc: 'Create and manage practice tests' },
    { name: 'Courses', href: '/admin/courses', icon: '📚', desc: 'Manage chemistry syllabus and modules' },
    { name: 'Announcements', href: '/admin/announcements', icon: '📢', desc: 'Broadcast updates to students' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">Overview of your chemistry learning platform metrics and management controls.</p>
      
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="p-6 bg-white border rounded-xl shadow-sm">
          <h2 className="text-gray-500 font-medium text-sm">Total Saved Molecules</h2>
          <p className="text-4xl font-bold mt-2 text-violet-600">{moleculesCount}</p>
        </div>
        
        <div className="p-6 bg-white border rounded-xl shadow-sm">
          <h2 className="text-gray-500 font-medium text-sm">Total Registered Users</h2>
          <p className="text-4xl font-bold mt-2 text-indigo-600">{usersCount}</p>
        </div>
      </div>

      {/* Management Modules Grid */}
      <h2 className="text-xl font-semibold mb-4">Management Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {adminLinks.map((link) => (
          <Link 
            key={link.href} 
            href={link.href}
            className="p-6 bg-white border rounded-xl shadow-sm hover:border-violet-500 hover:shadow-md transition-all group"
          >
            <div className="text-3xl mb-3">{link.icon}</div>
            <h3 className="font-bold text-lg text-gray-800 group-hover:text-violet-600 transition-colors">
              {link.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{link.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}