export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ 
        reply: "Error: GEMINI_API_KEY is missing in your .env.local file. Please add your Google AI Studio API key." 
      }, { status: 500 });
    }

    const apiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await apiResponse.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated from AI.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ reply: `AI Server Error: ${error.message}` }, { status: 500 });
  }
}