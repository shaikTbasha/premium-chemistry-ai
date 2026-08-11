'use client';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 px-3.5 py-2 rounded-xl text-sm font-medium transition-all shadow-sm group"
    >
      <span className="group-hover:-translate-x-0.5 transition-transform">←</span> 
      <span>Back</span>
    </button>
  );
}