'use client';
import BackButton from "@/components/BackButton";
import { useEffect, useState } from 'react';

export default function LibraryPage() {
  const [molecules, setMolecules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure this fetches from '/api/molecules', not '/api/molecules/save'
    fetch('/api/molecules')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMolecules(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch saved molecules:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading your library...</div>;

  return (
    <div className="p-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <BackButton />
        <h1 className="text-2xl font-bold">Saved Molecules</h1>
      </div>

      {molecules.length === 0 ? (
        <p>No saved molecules found.</p>
      ) : (
        <ul>
          {molecules.map((mol: any) => (
            <li key={mol.id} className="border p-4 mb-2 rounded">
              <h2 className="font-semibold">{mol.name}</h2>
              <p>Formula: {mol.formula}</p>
              <p>SMILES: {mol.smiles}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}