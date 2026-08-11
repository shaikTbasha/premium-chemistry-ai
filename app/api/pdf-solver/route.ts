import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = buffer.toString('base64');

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [
        {
          inlineData: {
            data: base64Data,
            mimeType: file.type || 'application/pdf',
          },
        },
        {
          text: 'Analyze this chemistry document. Extract the questions, solve them step-by-step, and explain them clearly as if you are a friendly chemistry tutor teaching a student. Use clean plain text for chemical formulas (like C8H9Br or standard text) instead of complex LaTeX math codes or dollar signs ($). Use clean Markdown headings and bullet points.',
        },
      ],
    });

    return NextResponse.json({ success: true, analysis: response.text });
  } catch (error: any) {
    console.error('PDF Solver Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}