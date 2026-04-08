import { GoogleGenAI } from "@google/genai";

export const analysisGen = async (
  base64ImageData: string,
  mimeType: string,
) => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey });

  const result = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        inlineData: {
          mimeType,
          data: base64ImageData,
        },
      },
      { text: "Caption this image." },
    ],
  });

  return result.text;
};
