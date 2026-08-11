"use client";
import BackButton from "@/components/BackButton";
import ChemAILogo from "@/components/ChemAILogo";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";

// Complete dataset for all 118 elements
const ELEMENTS = [
  { no: 1, symbol: "H", name: "Hydrogen", mass: "1.008", category: "nonmetal", shells: [1] },
  { no: 2, symbol: "He", name: "Helium", mass: "4.003", category: "noble", shells: [2] },
  { no: 3, symbol: "Li", name: "Lithium", mass: "6.94", category: "alkali", shells: [2, 1] },
  { no: 4, symbol: "Be", name: "Beryllium", mass: "9.012", category: "alkaline", shells: [2, 2] },
  { no: 5, symbol: "B", name: "Boron", mass: "10.81", category: "metalloid", shells: [2, 3] },
  { no: 6, symbol: "C", name: "Carbon", mass: "12.011", category: "nonmetal", shells: [2, 4] },
  { no: 7, symbol: "N", name: "Nitrogen", mass: "14.007", category: "nonmetal", shells: [2, 5] },
  { no: 8, symbol: "O", name: "Oxygen", mass: "15.999", category: "nonmetal", shells: [2, 6] },
  { no: 9, symbol: "F", name: "Fluorine", mass: "18.998", category: "halogen", shells: [2, 7] },
  { no: 10, symbol: "Ne", name: "Neon", mass: "20.180", category: "noble", shells: [2, 8] },
  { no: 11, symbol: "Na", name: "Sodium", mass: "22.990", category: "alkali", shells: [2, 8, 1] },
  { no: 12, symbol: "Mg", name: "Magnesium", mass: "24.305", category: "alkaline", shells: [2, 8, 2] },
  { no: 13, symbol: "Al", name: "Aluminium", mass: "26.982", category: "metal", shells: [2, 8, 3] },
  { no: 14, symbol: "Si", name: "Silicon", mass: "28.085", category: "metalloid", shells: [2, 8, 4] },
  { no: 15, symbol: "P", name: "Phosphorus", mass: "30.974", category: "nonmetal", shells: [2, 8, 5] },
  { no: 16, symbol: "S", name: "Sulfur", mass: "32.06", category: "nonmetal", shells: [2, 8, 6] },
  { no: 17, symbol: "Cl", name: "Chlorine", mass: "35.45", category: "halogen", shells: [2, 8, 7] },
  { no: 18, symbol: "Ar", name: "Argon", mass: "39.95", category: "noble", shells: [2, 8, 8] },
  { no: 19, symbol: "K", name: "Potassium", mass: "39.098", category: "alkali", shells: [2, 8, 8, 1] },
  { no: 20, symbol: "Ca", name: "Calcium", mass: "40.078", category: "alkaline", shells: [2, 8, 8, 2] },
  { no: 21, symbol: "Sc", name: "Scandium", mass: "44.956", category: "transition", shells: [2, 8, 9, 2] },
  { no: 22, symbol: "Ti", name: "Titanium", mass: "47.867", category: "transition", shells: [2, 8, 10, 2] },
  { no: 23, symbol: "V", name: "Vanadium", mass: "50.942", category: "transition", shells: [2, 8, 11, 2] },
  { no: 24, symbol: "Cr", name: "Chromium", mass: "51.996", category: "transition", shells: [2, 8, 13, 1] },
  { no: 25, symbol: "Mn", name: "Manganese", mass: "54.938", category: "transition", shells: [2, 8, 13, 2] },
  { no: 26, symbol: "Fe", name: "Iron", mass: "55.845", category: "transition", shells: [2, 8, 14, 2] },
  { no: 27, symbol: "Co", name: "Cobalt", mass: "58.933", category: "transition", shells: [2, 8, 15, 2] },
  { no: 28, symbol: "Ni", name: "Nickel", mass: "58.693", category: "transition", shells: [2, 8, 16, 2] },
  { no: 29, symbol: "Cu", name: "Copper", mass: "63.546", category: "transition", shells: [2, 8, 18, 1] },
  { no: 30, symbol: "Zn", name: "Zinc", mass: "65.38", category: "transition", shells: [2, 8, 18, 2] },
  { no: 31, symbol: "Ga", name: "Gallium", mass: "69.723", category: "metal", shells: [2, 8, 18, 3] },
  { no: 32, symbol: "Ge", name: "Germanium", mass: "72.630", category: "metalloid", shells: [2, 8, 18, 4] },
  { no: 33, symbol: "As", name: "Arsenic", mass: "74.922", category: "metalloid", shells: [2, 8, 18, 5] },
  { no: 34, symbol: "Se", name: "Selenium", mass: "78.971", category: "nonmetal", shells: [2, 8, 18, 6] },
  { no: 35, symbol: "Br", name: "Bromine", mass: "79.904", category: "halogen", shells: [2, 8, 18, 7] },
  { no: 36, symbol: "Kr", name: "Krypton", mass: "83.798", category: "noble", shells: [2, 8, 18, 8] },
  { no: 37, symbol: "Rb", name: "Rubidium", mass: "85.468", category: "alkali", shells: [2, 8, 18, 8, 1] },
  { no: 38, symbol: "Sr", name: "Strontium", mass: "87.62", category: "alkaline", shells: [2, 8, 18, 8, 2] },
  { no: 39, symbol: "Y", name: "Yttrium", mass: "88.906", category: "transition", shells: [2, 8, 18, 9, 2] },
  { no: 40, symbol: "Zr", name: "Zirconium", mass: "91.224", category: "transition", shells: [2, 8, 18, 10, 2] },
  { no: 41, symbol: "Nb", name: "Niobium", mass: "92.906", category: "transition", shells: [2, 8, 18, 12, 1] },
  { no: 42, symbol: "Mo", name: "Molybdenum", mass: "95.95", category: "transition", shells: [2, 8, 18, 13, 1] },
  { no: 43, symbol: "Tc", name: "Technetium", mass: "98", category: "transition", shells: [2, 8, 18, 13, 2] },
  { no: 44, symbol: "Ru", name: "Ruthenium", mass: "101.07", category: "transition", shells: [2, 8, 18, 15, 1] },
  { no: 45, symbol: "Rh", name: "Rhodium", mass: "102.91", category: "transition", shells: [2, 8, 18, 16, 1] },
  { no: 46, symbol: "Pd", name: "Palladium", mass: "106.42", category: "transition", shells: [2, 8, 18, 18] },
  { no: 47, symbol: "Ag", name: "Silver", mass: "107.87", category: "transition", shells: [2, 8, 18, 18, 1] },
  { no: 48, symbol: "Cd", name: "Cadmium", mass: "112.41", category: "transition", shells: [2, 8, 18, 18, 2] },
  { no: 49, symbol: "In", name: "Indium", mass: "114.82", category: "metal", shells: [2, 8, 18, 18, 3] },
  { no: 50, symbol: "Sn", name: "Tin", mass: "118.71", category: "metal", shells: [2, 8, 18, 18, 4] },
  { no: 51, symbol: "Sb", name: "Antimony", mass: "121.76", category: "metalloid", shells: [2, 8, 18, 18, 5] },
  { no: 52, symbol: "Te", name: "Tellurium", mass: "127.60", category: "metalloid", shells: [2, 8, 18, 18, 6] },
  { no: 53, symbol: "I", name: "Iodine", mass: "126.90", category: "halogen", shells: [2, 8, 18, 18, 7] },
  { no: 54, symbol: "Xe", name: "Xenon", mass: "131.29", category: "noble", shells: [2, 8, 18, 18, 8] },
  { no: 55, symbol: "Cs", name: "Cesium", mass: "132.91", category: "alkali", shells: [2, 8, 18, 18, 8, 1] },
  { no: 56, symbol: "Ba", name: "Barium", mass: "137.33", category: "alkaline", shells: [2, 8, 18, 18, 8, 2] },
  { no: 57, symbol: "La", name: "Lanthanum", mass: "138.91", category: "lanthanide", shells: [2, 8, 18, 18, 9, 2] },
  { no: 58, symbol: "Ce", name: "Cerium", mass: "140.12", category: "lanthanide", shells: [2, 8, 18, 19, 9, 2] },
  { no: 59, symbol: "Pr", name: "Praseodymium", mass: "140.91", category: "lanthanide", shells: [2, 8, 18, 21, 8, 2] },
  { no: 60, symbol: "Nd", name: "Neodymium", mass: "144.24", category: "lanthanide", shells: [2, 8, 18, 22, 8, 2] },
  { no: 61, symbol: "Pm", name: "Promethium", mass: "145", category: "lanthanide", shells: [2, 8, 18, 23, 8, 2] },
  { no: 62, symbol: "Sm", name: "Samarium", mass: "150.36", category: "lanthanide", shells: [2, 8, 18, 24, 8, 2] },
  { no: 63, symbol: "Eu", name: "Europium", mass: "151.96", category: "lanthanide", shells: [2, 8, 18, 25, 8, 2] },
  { no: 64, symbol: "Gd", name: "Gadolinium", mass: "157.25", category: "lanthanide", shells: [2, 8, 18, 25, 9, 2] },
  { no: 65, symbol: "Tb", name: "Terbium", mass: "158.93", category: "lanthanide", shells: [2, 8, 18, 27, 8, 2] },
  { no: 66, symbol: "Dy", name: "Dysprosium", mass: "162.50", category: "lanthanide", shells: [2, 8, 18, 28, 8, 2] },
  { no: 67, symbol: "Ho", name: "Holmium", mass: "164.93", category: "lanthanide", shells: [2, 8, 18, 29, 8, 2] },
  { no: 68, symbol: "Er", name: "Erbium", mass: "167.26", category: "lanthanide", shells: [2, 8, 18, 30, 8, 2] },
  { no: 69, symbol: "Tm", name: "Thulium", mass: "168.93", category: "lanthanide", shells: [2, 8, 18, 31, 8, 2] },
  { no: 70, symbol: "Yb", name: "Ytterbium", mass: "173.05", category: "lanthanide", shells: [2, 8, 18, 32, 8, 2] },
  { no: 71, symbol: "Lu", name: "Lutetium", mass: "174.97", category: "lanthanide", shells: [2, 8, 18, 32, 9, 2] },
  { no: 72, symbol: "Hf", name: "Hafnium", mass: "178.49", category: "transition", shells: [2, 8, 18, 32, 10, 2] },
  { no: 73, symbol: "Ta", name: "Tantalum", mass: "180.95", category: "transition", shells: [2, 8, 18, 32, 11, 2] },
  { no: 74, symbol: "W", name: "Tungsten", mass: "183.84", category: "transition", shells: [2, 8, 18, 32, 12, 2] },
  { no: 75, symbol: "Re", name: "Rhenium", mass: "186.21", category: "transition", shells: [2, 8, 18, 32, 13, 2] },
  { no: 76, symbol: "Os", name: "Osmium", mass: "190.23", category: "transition", shells: [2, 8, 18, 32, 14, 2] },
  { no: 77, symbol: "Ir", name: "Iridium", mass: "192.22", category: "transition", shells: [2, 8, 18, 32, 15, 2] },
  { no: 78, symbol: "Pt", name: "Platinum", mass: "195.08", category: "transition", shells: [2, 8, 18, 32, 17, 1] },
  { no: 79, symbol: "Au", name: "Gold", mass: "196.97", category: "transition", shells: [2, 8, 18, 32, 18, 1] },
  { no: 80, symbol: "Hg", name: "Mercury", mass: "200.59", category: "transition", shells: [2, 8, 18, 32, 18, 2] },
  { no: 81, symbol: "Tl", name: "Thallium", mass: "204.38", category: "metal", shells: [2, 8, 18, 32, 18, 3] },
  { no: 82, symbol: "Pb", name: "Lead", mass: "207.2", category: "metal", shells: [2, 8, 18, 32, 18, 4] },
  { no: 83, symbol: "Bi", name: "Bismuth", mass: "208.98", category: "metal", shells: [2, 8, 18, 32, 18, 5] },
  { no: 84, symbol: "Po", name: "Polonium", mass: "209", category: "metalloid", shells: [2, 8, 18, 32, 18, 6] },
  { no: 85, symbol: "At", name: "Astatine", mass: "210", category: "halogen", shells: [2, 8, 18, 32, 18, 7] },
  { no: 86, symbol: "Rn", name: "Radon", mass: "222", category: "noble", shells: [2, 8, 18, 32, 18, 8] },
  { no: 87, symbol: "Fr", name: "Francium", mass: "223", category: "alkali", shells: [2, 8, 18, 32, 18, 8, 1] },
  { no: 88, symbol: "Ra", name: "Radium", mass: "226", category: "alkaline", shells: [2, 8, 18, 32, 18, 8, 2] },
  { no: 89, symbol: "Ac", name: "Actinium", mass: "227", category: "actinide", shells: [2, 8, 18, 32, 18, 9, 2] },
  { no: 90, symbol: "Th", name: "Thorium", mass: "232.04", category: "actinide", shells: [2, 8, 18, 32, 18, 10, 2] },
  { no: 91, symbol: "Pa", name: "Protactinium", mass: "231.04", category: "actinide", shells: [2, 8, 18, 32, 20, 9, 2] },
  { no: 92, symbol: "U", name: "Uranium", mass: "238.03", category: "actinide", shells: [2, 8, 18, 32, 21, 9, 2] },
  { no: 93, symbol: "Np", name: "Neptunium", mass: "237", category: "actinide", shells: [2, 8, 18, 32, 22, 9, 2] },
  { no: 94, symbol: "Pu", name: "Plutonium", mass: "244", category: "actinide", shells: [2, 8, 18, 32, 24, 8, 2] },
  { no: 95, symbol: "Am", name: "Americium", mass: "243", category: "actinide", shells: [2, 8, 18, 32, 25, 8, 2] },
  { no: 96, symbol: "Cm", name: "Curium", mass: "247", category: "actinide", shells: [2, 8, 18, 32, 25, 9, 2] },
  { no: 97, symbol: "Bk", name: "Berkelium", mass: "247", category: "actinide", shells: [2, 8, 18, 32, 27, 8, 2] },
  { no: 98, symbol: "Cf", name: "Californium", mass: "251", category: "actinide", shells: [2, 8, 18, 32, 28, 8, 2] },
  { no: 99, symbol: "Es", name: "Einsteinium", mass: "252", category: "actinide", shells: [2, 8, 18, 32, 29, 8, 2] },
  { no: 100, symbol: "Fm", name: "Fermium", mass: "257", category: "actinide", shells: [2, 8, 18, 32, 30, 8, 2] },
  { no: 101, symbol: "Md", name: "Mendelevium", mass: "258", category: "actinide", shells: [2, 8, 18, 32, 31, 8, 2] },
  { no: 102, symbol: "No", name: "Nobelium", mass: "259", category: "actinide", shells: [2, 8, 18, 32, 32, 8, 2] },
  { no: 103, symbol: "Lr", name: "Lawrencium", mass: "266", category: "actinide", shells: [2, 8, 18, 32, 32, 9, 2] },
  { no: 104, symbol: "Rf", name: "Rutherfordium", mass: "267", category: "transition", shells: [2, 8, 18, 32, 32, 10, 2] },
  { no: 105, symbol: "Db", name: "Dubnium", mass: "268", category: "transition", shells: [2, 8, 18, 32, 32, 11, 2] },
  { no: 106, symbol: "Sg", name: "Seaborgium", mass: "269", category: "transition", shells: [2, 8, 18, 32, 32, 12, 2] },
  { no: 107, symbol: "Bh", name: "Bohrium", mass: "270", category: "transition", shells: [2, 8, 18, 32, 32, 13, 2] },
  { no: 108, symbol: "Hs", name: "Hassium", mass: "277", category: "transition", shells: [2, 8, 18, 32, 32, 14, 2] },
  { no: 109, symbol: "Mt", name: "Meitnerium", mass: "278", category: "transition", shells: [2, 8, 18, 32, 32, 15, 2] },
  { no: 110, symbol: "Ds", name: "Darmstadtium", mass: "281", category: "transition", shells: [2, 8, 18, 32, 32, 16, 2] },
  { no: 111, symbol: "Rg", name: "Roentgenium", mass: "282", category: "transition", shells: [2, 8, 18, 32, 32, 17, 2] },
  { no: 112, symbol: "Cn", name: "Copernicium", mass: "285", category: "transition", shells: [2, 8, 18, 32, 32, 18, 2] },
  { no: 113, symbol: "Nh", name: "Nihonium", mass: "286", category: "metal", shells: [2, 8, 18, 32, 32, 18, 3] },
  { no: 114, symbol: "Fl", name: "Flerovium", mass: "289", category: "metal", shells: [2, 8, 18, 32, 32, 18, 4] },
  { no: 115, symbol: "Mc", name: "Moscovium", mass: "290", category: "metal", shells: [2, 8, 18, 32, 32, 18, 5] },
  { no: 116, symbol: "Lv", name: "Livermorium", mass: "293", category: "metal", shells: [2, 8, 18, 32, 32, 18, 6] },
  { no: 117, symbol: "Ts", name: "Tennessine", mass: "294", category: "halogen", shells: [2, 8, 18, 32, 32, 18, 7] },
  { no: 118, symbol: "Og", name: "Oganesson", mass: "294", category: "noble", shells: [2, 8, 18, 32, 32, 18, 8] },
];

export default function PeriodicTablePage() {
  const [selectedElement, setSelectedElement] = useState(ELEMENTS[0]);
  const [elementDetails, setElementDetails] = useState("Select any element from the 118 elements grid to explore its properties and animated atomic Bohr structure.");
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectElement = async (el: typeof ELEMENTS[0]) => {
    setSelectedElement(el);
    setIsLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: `Provide atomic properties, electron configuration, and exam trends for element ${el.name} (${el.symbol}), atomic number ${el.no}.` }]
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error("Failed");

      setElementDetails(data.content || data.text || "Details loaded successfully.");
    } catch (error) {
      setElementDetails(`Properties for ${el.name}: Standard atomic weight ${el.mass}, Category: ${el.category}. Electron Shells: ${el.shells.join(", ")}.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0 bg-[#0B0F19]">
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <BackButton />
            <Link href="/dashboard"><ChemAILogo /></Link>
            <h1 className="text-lg font-bold text-white">🧪 Interactive Periodic Table (118 Elements)</h1>
          </div>
          <UserButton afterSignOutUrl="/" />
        </header>
        <main className="flex-1 overflow-y-auto p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* PERIODIC TABLE GRID (ALL 118 ELEMENTS) */}
          <div className="xl:col-span-2 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 overflow-x-auto shadow-xl">
            <div className="grid grid-cols-18 gap-1.5 min-w-[850px]">
              {ELEMENTS.map((el) => (
                <button
                  key={el.no}
                  onClick={() => handleSelectElement(el)}
                  className={`p-1.5 rounded-lg border text-left transition-all flex flex-col justify-between h-14 ${
                    selectedElement.no === el.no 
                      ? 'bg-indigo-600 border-indigo-300 text-white shadow-lg ring-2 ring-indigo-400' 
                      : 'bg-slate-900/80 border-slate-800 hover:border-indigo-500/50 text-slate-300'
                  }`}
                >
                  <span className="text-[9px] font-mono text-slate-400 leading-none">{el.no}</span>
                  <span className="text-xs font-bold tracking-tight text-center">{el.symbol}</span>
                  <span className="text-[8px] truncate text-slate-400 text-center">{el.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL: ANIMATED BOHR MODEL & DETAILS */}
          <div className="xl:col-span-1 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 space-y-6 flex flex-col shadow-xl">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  {selectedElement.name} <span className="text-indigo-400">({selectedElement.symbol})</span>
                </h2>
                <p className="text-xs text-slate-400">Atomic Number: {selectedElement.no} | Mass: {selectedElement.mass}</p>
              </div>
            </div>

            {/* ANIMATED BOHR MODEL VIEWER */}
            <div className="relative w-full h-56 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-center overflow-hidden shadow-inner">
              <div className="absolute inset-0 flex items-center justify-center opacity-10 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Nucleus Center */}
              <div className="absolute z-10 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-lg animate-pulse">
                {selectedElement.no}p+
              </div>

              {/* Animated Electron Shells */}
              {selectedElement.shells.pxmap ? null : selectedElement.shells.map((electronCount, index) => {
                const radius = 35 + index * 24;
                return (
                  <div
                    key={`shell-${index}`}
                    className="absolute rounded-full border border-indigo-500/30 animate-spin"
                    style={{
                      width: `${radius * 2}px`,
                      height: `${radius * 2}px`,
                      animationDuration: `${10 + index * 5}s`,
                    }}
                  >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
                  </div>
                );
              })}
            </div>

            {/* AI PROPERTIES & DETAILS */}
            <div className="flex-1 overflow-y-auto text-xs text-slate-300 space-y-2 leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-800/80 max-h-48">
              <h3 className="font-semibold text-indigo-400 text-sm mb-1">Atomic Properties & AI Analysis:</h3>
              {isLoading ? (
                <div className="animate-pulse text-slate-500">Querying quantum configuration and exam trends...</div>
              ) : (
                <p>{elementDetails}</p>
              )}
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}