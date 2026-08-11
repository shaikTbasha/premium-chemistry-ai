'use client';

import { useState, useEffect } from "react";
import BackButton from "@/components/BackButton";
import { UserButton, useUser, useClerk } from "@clerk/nextjs";

export default function ProfileToolsPage() {
  const { user } = useUser();
  const clerk = useClerk();
  const [isMounted, setIsMounted] = useState(false);
  
  // Refer a friend state
  const [copied, setCopied] = useState(false);
  const referralLink = "https://chem-ai.app/signup?ref=" + (user?.id || "CHEMIST");

  // Report an issue state
  const [issueText, setIssueText] = useState("");
  const [issueSubmitted, setIssueSubmitted] = useState(false);

  // Dark/Light mode state
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReportIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueText.trim()) return;
    setIssueSubmitted(true);
    setIssueText("");
    setTimeout(() => setIssueSubmitted(false), 3000);
  };

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

  if (!isMounted) return null;

  return (
    <div className="flex h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans overflow-hidden transition-colors duration-200">
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-200">
        
        {/* Header */}
        <header className="h-16 flex-shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <BackButton />
            <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              ⚙️ Account & Profile Tools
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        {/* Main Content Container */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 max-w-5xl w-full mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* 1. Password Change */}
            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">Password & Security</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Update your account password securely via Clerk.</p>
                </div>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (clerk && clerk.openUserProfile) {
                      clerk.openUserProfile();
                    }
                  }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-xs font-medium transition-colors shadow-sm cursor-pointer"
                >
                  Change Password &rarr;
                </button>
              </div>
            </div>

            {/* 2. Mode Change (Dark / Light) */}
            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌗</span>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">Appearance Mode</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Toggle between dark laboratory and bright workspace mode.</p>
                </div>
              </div>
              <div className="pt-2 flex items-center justify-between bg-slate-100 dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors">
                <span className="text-xs text-slate-700 dark:text-slate-300">Current Mode: <strong className="text-indigo-600 dark:text-indigo-400">{isDarkMode ? "Dark Lab Mode" : "Light Mode"}</strong></span>
                <button
                  type="button"
                  onClick={toggleDarkMode}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                >
                  {isDarkMode ? "Switch to Light" : "Switch to Dark"}
                </button>
              </div>
            </div>

            {/* 3. Refer a Friend */}
            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎁</span>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">Refer a Friend</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Share your link with fellow students to unlock chemistry tools.</p>
                </div>
              </div>
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 transition-colors">
                  <input
                    type="text"
                    readOnly
                    value={referralLink}
                    className="w-full bg-transparent text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleCopyReferral}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap cursor-pointer"
                  >
                    {copied ? "Copied!" : "Copy Link"}
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Report an Issue */}
            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🐛</span>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">Report an Issue</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Found a bug or incorrect chemical reaction answer? Let us know.</p>
                </div>
              </div>
              <form onSubmit={handleReportIssue} className="space-y-3 pt-1">
                <textarea
                  rows={2}
                  value={issueText}
                  onChange={(e) => setIssueText(e.target.value)}
                  placeholder="Describe the bug or reaction error..."
                  className="w-full bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl p-3 text-xs border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500 resize-none transition-colors"
                  required
                />
                {issueSubmitted && <p className="text-[11px] text-emerald-500 dark:text-emerald-400 font-medium">Issue submitted successfully. Thank you!</p>}
                <button
                  type="submit"
                  className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white px-4 py-2 rounded-xl text-xs font-medium transition border border-slate-300 dark:border-slate-700/60 cursor-pointer"
                >
                  Send Report
                </button>
              </form>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}