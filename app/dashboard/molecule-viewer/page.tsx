'use client';

import { useState } from 'react';
import BackButton from "@/components/BackButton";

export default function MoleculeViewerPage() {
  const [query, setQuery] = useState('Aspirin');
  const [moleculeData, setMoleculeData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<'2D' | '3D'>('2D');

  const searchMolecule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(query)}/property/IUPACName,CanonicalSMILES,MolecularFormula,MolecularWeight/JSON`);
      if (!res.ok) throw new Error('Molecule not found. Try another name like Caffeine, Glucose, Benzene, or Paracetamol.');
      const data = await res.json();
      const props = data.PropertyTable.Properties[0];
      setMoleculeData(props);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch molecule data.');
      setMoleculeData(null);
    } finally {
      setLoading(false);
    }
  };

  const encodedName = encodeURIComponent(query);
  const imageUrl2D = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodedName}/PNG?image_size=large`;
  const downloadSdfUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodedName}/SDF?record_type=3d`;
  const downloadPngUrl = imageUrl2D;

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0">
        
        <header className="h-16 flex-shrink-0 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <BackButton />
            <h1 className="text-lg font-bold flex items-center gap-2">
              🧪 2D & 3D Interactive Molecule Viewer
            </h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 max-w-5xl w-full mx-auto space-y-6">
          
          {/* Search Bar */}
          <form onSubmit={searchMolecule} className="flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search any molecule (e.g., Caffeine, Glucose, Benzene)..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 shadow-inner"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors shadow-lg disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search 🔍'}
            </button>
          </form>

          {error && (
            <div className="p-4 bg-red-950/50 border border-red-800 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Results Area */}
          {moleculeData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Properties Box */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4 md:col-span-1 shadow-xl">
                <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Properties</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-slate-400 block text-xs uppercase tracking-wider">Formula</span>
                    <span className="font-semibold text-indigo-400 text-base">{moleculeData.MolecularFormula}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs uppercase tracking-wider">Molecular Weight</span>
                    <span className="font-medium text-slate-200">{moleculeData.MolecularWeight} g/mol</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs uppercase tracking-wider">IUPAC Name</span>
                    <span className="font-medium text-slate-300 text-xs break-words">{moleculeData.IUPACName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-xs uppercase tracking-wider">SMILES Notation</span>
                    <span className="font-mono text-xs text-slate-400 bg-slate-950 p-2 rounded block overflow-x-auto border border-slate-800">{moleculeData.CanonicalSMILES}</span>
                  </div>
                </div>

                {/* Download Options */}
                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Downloads</span>
                  <div className="flex gap-2">
                    <a
                      href={downloadPngUrl}
                      download={`${query}-2D.png`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-center py-2.5 px-3 rounded-xl text-xs font-medium text-slate-200 transition-colors border border-slate-700"
                    >
                      2D Image 📥
                    </a>
                    <a
                      href={downloadSdfUrl}
                      download={`${query}-3D.sdf`}
                      className="flex-1 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-center py-2.5 px-3 rounded-xl text-xs font-medium text-indigo-300 transition-colors"
                    >
                      3D File 📦
                    </a>
                  </div>
                </div>
              </div>

              {/* Viewer Window */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex flex-col md:col-span-2 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h2 className="text-lg font-bold text-white">Visualizer Canvas</h2>
                  <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setViewMode('2D')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${viewMode === '2D' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                      2D View
                    </button>
                    <button
                      onClick={() => setViewMode('3D')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${viewMode === '3D' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                      3D Interactive View
                    </button>
                  </div>
                </div>

                <div className="flex-1 min-h-[380px] bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
                  {viewMode === '2D' ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <img
                        src={imageUrl2D}
                        alt={`${query} 2D Structure`}
                        className="max-h-72 object-contain filter invert hue-rotate-180 brightness-125"
                      />
                      <span className="text-xs text-slate-500 mt-4">2D Chemical Structure Render</span>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
                      <iframe
                        src={`https://pubchem.ncbi.nlm.nih.gov/compound/${encodeURIComponent(query)}#section=3D-Conformer&embed=true`}
                        className="w-full h-80 rounded-lg border-0 bg-white"
                        title={`${query} 3D Structure`}
                      />
                      <p className="text-[11px] text-slate-400 text-center">
                        Interactive 3D model. You can rotate, zoom, and inspect chemical bonds dynamically.
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

        </main>

      </div>
    </div>
  );
}