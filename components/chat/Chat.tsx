"use client";

import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // This makes the math look beautiful!

export default function Chat() {
  const { messages, input, handleInputChange, setInput, append, isLoading } = useChat({
    api: '/api/chat',
    onError: (error) => {
      alert("🚨 AI Error: " + error.message);
    }
  });

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input || !input.trim()) return;
    const messageToSend = input;
    setInput('');
    append({
      role: 'user',
      content: messageToSend,
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-700/50 rounded-3xl flex flex-col overflow-hidden min-h-[500px] shadow-xl">
      {/* Chat Header */}
      <div className="bg-slate-800/50 border-b border-slate-700/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-xl">🤖</div>
          <div>
            <h3 className="font-semibold text-slate-200 text-sm">Premium AI Tutor</h3>
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
              Online & Ready
            </p>
          </div>
        </div>
        {isLoading && <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full animate-pulse">Generating response...</span>}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-500">
            <div className="text-5xl mb-4 p-4 bg-slate-800/50 rounded-3xl">✨</div>
            <p className="text-lg font-medium text-slate-300">How can I help you study today?</p>
            <p className="text-sm mt-2 max-w-md">Upload handwritten notes, paste a chemical equation, or ask a complex mechanism question.</p>
          </div>
        ) : (
          messages.map((m) => (
            <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-sm shadow-sm ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-white'}`}>
                {m.role === 'user' ? 'You' : 'AI'}
              </div>
              <div className={`rounded-3xl px-6 py-4 max-w-[85%] shadow-sm overflow-hidden ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-slate-800 text-slate-200 border border-slate-700/50 rounded-tl-sm'}`}>
                
                {/* 🚀 MAGIC HAPPENS HERE: We render Markdown and Math! */}
                {m.role === 'user' ? (
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{m.content}</p>
                ) : (
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm, remarkMath]} 
                      rehypePlugins={[rehypeKatex]}
                    >
                      {m.content}
                    </ReactMarkdown>
                  </div>
                )}

              </div>
            </div>
          ))
        )}
      </div>

      {/* Smart Input Bar */}
      <div className="p-4 bg-slate-900 border-t border-slate-700/50">
        <form onSubmit={handleManualSubmit} className="relative flex flex-col gap-2 max-w-5xl mx-auto bg-slate-800 rounded-3xl border border-slate-700 p-2 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Message ChemAI Tutor... (try asking for a balanced equation!)"
            className="w-full bg-transparent py-3 px-4 text-sm text-white focus:outline-none placeholder:text-slate-500"
          />
          <div className="flex items-center justify-between px-2 pb-1">
            <div className="flex items-center gap-1">
              <button type="button" className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors" title="Attach File">📎</button>
              <button type="button" className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors" title="Upload Image">📷</button>
            </div>
            <button type="submit" disabled={isLoading || !input?.trim()} className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white transition-all hover:bg-indigo-500 hover:scale-105 disabled:opacity-50">
               ➤
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}