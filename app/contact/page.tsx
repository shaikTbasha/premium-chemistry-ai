"use client";
import ChemAILogo from "@/components/ChemAILogo";
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/* NAVBAR */}
      <header className="h-20 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 max-w-7xl mx-auto">
        <ChemAILogo />
        <Link href="/" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
          ← Back to Home
        </Link>
      </header>

      {/* CONTENT */}
      <main className="py-20 px-6 max-w-3xl mx-auto space-y-10">
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            Get in Touch
          </div>
          <h1 className="text-4xl font-extrabold text-white">Contact Our Support Team</h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Have questions about subscriptions, features, or academic content? Fill out the form below and our team will get back to you shortly.
          </p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-xl">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="text-4xl">🎉</div>
              <h3 className="text-xl font-bold text-white">Message Sent Successfully!</h3>
              <p className="text-slate-400 text-sm">Thank you for reaching out. We will review your inquiry and respond via email.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Your Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    required
                    className="w-full bg-slate-950 text-white rounded-xl px-4 py-3.5 text-sm border border-slate-800 focus:outline-none focus:border-indigo-500 shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="w-full bg-slate-950 text-white rounded-xl px-4 py-3.5 text-sm border border-slate-800 focus:outline-none focus:border-indigo-500 shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="How can we help you?"
                  required
                  className="w-full bg-slate-950 text-white rounded-xl px-4 py-3.5 text-sm border border-slate-800 focus:outline-none focus:border-indigo-500 shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Message</label>
                <textarea
                  rows={5}
                  placeholder="Type your message here..."
                  required
                  className="w-full bg-slate-950 text-white rounded-xl px-4 py-3.5 text-sm border border-slate-800 focus:outline-none focus:border-indigo-500 shadow-inner resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-4 rounded-xl text-sm transition-colors shadow-lg shadow-indigo-600/30"
              >
                Send Message 🚀
              </button>
            </form>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-900 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} ChemAI Platform. Empowering students worldwide.</p>
      </footer>

    </div>
  );
}