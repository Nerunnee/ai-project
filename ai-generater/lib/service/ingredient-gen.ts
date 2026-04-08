import { GoogleGenAI } from "@google/genai";

export const ingredientGen = async (text: string) => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey });

  const prompt = text;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response?.text;
};
