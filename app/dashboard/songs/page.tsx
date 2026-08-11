"use client";
import BackButton from "@/components/BackButton";
import ChemAILogo from "@/components/ChemAILogo";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

const CHEMISTRY_TRACKS = [
  {
    title: "The Elements",
    artist: "Tom Lehrer",
    category: "Memorization",
    description: "The legendary song listing all known elements to a fast-paced classical melody.",
    videoId: "zGM-wSKFBpo" // YouTube video ID
  },
  {
    title: "The Periodic Table Song",
    artist: "AsapSCIENCE",
    category: "Modern Rhythm",
    description: "Catchy and quick visual-audio guide to memorizing the table up to 118.",
    videoId: "VgVQKCcfwnU"
  },
  {
    title: "Meet the Elements",
    artist: "They Might Be Giants",
    category: "Foundational",
    description: "Fun rock song explaining chemical bonds, molecules, and compounds.",
    videoId: "Uy0m7ojhrOY"
  }
];

export default function ChemistrySongsPage() {
  const [activeVideo, setActiveVideo] = useState(CHEMISTRY_TRACKS[0].videoId);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0 bg-[#0B0F19]">
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <BackButton/>
            <Link href="/dashboard"><ChemAILogo /></Link>
            <h1 className="text-lg font-bold text-white">🎵 Chemistry Study Songs Hub</h1>
          </div>
          <UserButton afterSignOutUrl="/" />
        </header>

        <main className="flex-1 overflow-y-auto p-6 max-w-7xl w-full mx-auto space-y-6">
          <div className="bg-gradient-to-r from-purple-900/40 via-slate-900/40 to-slate-900/40 border border-purple-500/20 rounded-3xl p-6 md:p-8 shadow-xl space-y-2">
            <h2 className="text-2xl font-bold text-white">Learn Chemistry Through Music 🎶</h2>
            <p className="text-slate-400 text-sm max-w-2xl">
              Select a track below to play it instantly within the integrated player while you study complex chemical mechanisms.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* TRACK LIST */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Playlists</h3>
              {CHEMISTRY_TRACKS.map((track, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setActiveVideo(track.videoId)}
                  className={`border rounded-2xl p-4 transition-all cursor-pointer space-y-2 ${
                    activeVideo === track.videoId 
                      ? 'bg-purple-600/10 border-purple-500 text-white shadow-lg' 
                      : 'bg-slate-900/40 border-slate-800 hover:border-purple-500/40 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-medium">{track.category}</span>
                    <span className="text-xs text-purple-400 font-semibold">▶ Play</span>
                  </div>
                  <h4 className="font-bold text-sm text-white">{track.title}</h4>
                  <p className="text-xs text-slate-400">By {track.artist}</p>
                </div>
              ))}
            </div>

            {/* EMBEDDED PLAYER VIEW */}
            <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 flex flex-col space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                🎧 Now Playing
              </h3>
              
              <div className="relative w-full aspect-video bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${activeVideo}`}
                  title="Chemistry Study Song"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Tip: Keep this track playing in the background while switching to your Periodic Table or Stoichiometry workspace to boost memory retention!
              </p>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}