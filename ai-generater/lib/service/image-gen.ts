import { GoogleGenAI } from "@google/genai";

export const imageGen = async (text: string) => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey });

  const prompt = text;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: prompt,
  });
  for (const part of response?.candidates?.[0]?.content?.parts || []) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      return `data:image/png;base64,${imageData}`;
    }
  }

  return null;
};
