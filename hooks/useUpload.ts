// hooks/useUpload.ts
import { useState } from 'react';

export function useUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const uploadAndSolvePdf = async (file: File) => {
    setUploading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // 1. Send file to backend for processing
      const response = await fetch('/api/pdf-solver', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process PDF');
      }

      // The backend route (which we assume you have updated to be secured and save to DB)
      // should now return the saved analysis record ID along with the result.
      
      setResult(data);
      return data;
    } catch (err: any) {
      setError(err.message);
      console.error('PDF Upload Error:', err);
    } finally {
      setUploading(false);
    }
  };

  return { uploadAndSolvePdf, uploading, error, result };
}