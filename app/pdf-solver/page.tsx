'use client';
import { useUpload } from '@/hooks/useUpload';

export default function PdfSolverPage() {
  const { uploadAndSolvePdf, uploading, error, result } = useUpload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      await uploadAndSolvePdf(e.target.files[0]);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Chemistry PDF Solver</h1>
      <p className="text-gray-600 mb-6">Upload a chemistry worksheet, textbook chapter, or exam paper to get AI-powered step-by-step solutions.</p>
      
      <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg bg-white text-center">
        <input 
          type="file" 
          accept="application/pdf" 
          onChange={handleFileChange} 
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 cursor-pointer"
        />
      </div>

      {uploading && <div className="mt-4 text-blue-600 font-medium">Analyzing chemistry document with AI... Please wait.</div>}
      
      {error && <div className="mt-4 p-4 bg-red-50 text-red-500 rounded border border-red-200">{error}</div>}
      
      {result && (
        <div className="mt-6 p-6 border rounded-lg bg-gray-50 shadow-sm">
          <h3 className="font-bold text-lg mb-2 text-gray-800">AI Analysis & Solutions:</h3>
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{result.analysis}</div>
        </div>
      )}
    </div>
  );
}