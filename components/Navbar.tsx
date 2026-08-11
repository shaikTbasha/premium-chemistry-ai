'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Left: App Brand & Links */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold text-blue-600">
            ChemAI
          </Link>
          <div className="flex space-x-4 text-sm font-medium text-gray-600">
            <Link href="/library" className="hover:text-blue-600 transition">
              Library
            </Link>
          </div>
        </div>

        {/* Right: Authentication Status & Actions */}
        <div className="flex items-center space-x-4">
          {status === 'loading' ? (
            <span className="text-sm text-gray-400">Loading...</span>
          ) : session ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700 hidden sm:inline">
                Hello, <strong className="text-gray-900">{session.user?.name || session.user?.email}</strong>
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                href="/login"
                className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}