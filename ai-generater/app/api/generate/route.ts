import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY is not set");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 },
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const { prompt } = await request.json();

    console.log("Calling Gemini with prompt:", prompt);

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-image-preview",
      contents: prompt,
      config: {
        responseModalities: ["Text", "Image"],
      },
    });

    console.log("Gemini response received");

    const parts = response.candidates?.[0]?.content?.parts ?? [];

    const result: { text?: string; image?: string; mimeType?: string } = {};

    for (const part of parts) {
      if (part.text) {
        result.text = part.text;
      } else if (part.inlineData) {
        result.image = part.inlineData.data;
        result.mimeType = part.inlineData.mimeType ?? "image/png";
      }
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("Route error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
