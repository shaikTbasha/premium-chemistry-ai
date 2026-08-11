import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    // Accept both 'file' or 'image' field names to avoid mismatches
    const file = (formData.get('file') || formData.get('image')) as File;

    if (!file) {
      return NextResponse.json({ error: 'No image uploaded' }, { status: 400 });
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
            mimeType: file.type || 'image/jpeg',
          },
        },
        {
          text: 'Analyze this chemistry question image. Extract the question and options, determine the correct answer, and provide a clear, step-by-step solution as a friendly chemistry tutor. Use plain text formatting for chemical formulas instead of raw LaTeX dollar signs ($).',
        },
      ],
    });

    return NextResponse.json({ success: true, analysis: response.text });
  } catch (error: any) {
    console.error('Image Solver Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}