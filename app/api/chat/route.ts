export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const contents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // Updated reliable fallback list with current stable models
    const modelsToTry = [ "gemini-3.6-flash", "gemini-2.5-flash"];
    let response: any = null;
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      try {
        response = await ai.models.generateContent({
          model: modelName,
          contents: contents,
        });
        if (response && response.text) break;
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} failed or busy, trying next...`);
      }
    }

    if (!response || !response.text) {
      throw lastError || new Error("All fallback models are currently busy.");
    }

    return NextResponse.json({
      role: "assistant",
      content: response.text,
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}