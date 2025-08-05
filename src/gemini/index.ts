import { GoogleGenAI } from "@google/genai";
const gemini = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY! })

export default gemini;