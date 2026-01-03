
import { GoogleGenAI } from "@google/genai";

export const getProjectAdvice = async (userQuery: string) => {
  try {
    // Use process.env.API_KEY directly as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userQuery,
      config: {
        systemInstruction: `You are the Amobys Engineering AI Consultant. 
        Amobys is a Ghana-based engineering firm specializing in Civil, Structural, Electrical, Mechanical, and Geotechnical engineering.
        Your goal is to provide professional, concise advice to potential clients. 
        Focus on safety, regulatory standards in Ghana (GSA, EPA), and best engineering practices.
        Be helpful and direct.`,
        temperature: 0.7,
      },
    });
    // Accessing .text property directly
    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please call us directly at +233-XX-XXXXXXX.";
  }
};
