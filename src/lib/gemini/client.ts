import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('[Gemini Client] Warning: GEMINI_API_KEY is not set in environment variables.');
  }

  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey || 'dummy-key-for-initialization',
    });
  }

  return aiClient;
}

export const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.7-flash';
