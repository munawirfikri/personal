import { GoogleGenAI } from "@google/genai";
import { PROFILE_EN as PROFILE, EXPERIENCES_EN as EXPERIENCES, PROJECTS_EN as PROJECTS, SKILLS, EDUCATION_EN as EDUCATION } from '../constants';

// This service is used to power the "Ask about Munawir" feature.

const SYSTEM_INSTRUCTION = `
You are an AI assistant for the portfolio website of Munawir Fikri.
Your name is "Mun's Assistant".
Your goal is to answer questions about Munawir Fikri based STRICTLY on the context provided below.

Context about Munawir Fikri:
- Name: ${PROFILE.name}
- Title: ${PROFILE.title}
- Location: ${PROFILE.location}
- About: ${PROFILE.about}
- Contact Email: ${PROFILE.email}
- Experience: ${JSON.stringify(EXPERIENCES)}
- Education: ${JSON.stringify(EDUCATION)}
- Projects: ${JSON.stringify(PROJECTS)}
- Skills: ${JSON.stringify(SKILLS)}

Tone and Style:
- Be professional, polite, and concise.
- Act as if you are representing Munawir.
- If the answer is not in the context, politely say you don't have that information and suggest contacting Munawir directly via email.
- Keep answers relatively short (under 100 words) unless asked for details.
- Use "he" or "Munawir" when referring to him.
`;

let ai: GoogleGenAI | null = null;

const getAIClient = (): GoogleGenAI => {
  if (!ai) {
    if (!process.env.API_KEY) {
      console.warn("Gemini API Key is missing. Chat features will not work.");
      throw new Error("API Key missing");
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const client = getAIClient();
    
    // Using flash model for speed and efficiency in a chat widget context
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "I'm currently having trouble connecting to my brain. Please try again later or email Munawir directly.";
  }
};