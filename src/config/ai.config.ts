/**
 * AI & Gemini Service Configuration
 */
export const AI_CONFIG = {
  defaultModel: process.env.GEMINI_MODEL || 'gemini-3.6-flash',
  candidateModels: [
    process.env.GEMINI_MODEL,
    'gemini-3.6-flash',
    'gemini-3.8-flash',
    'gemini-3.5-flash',
    'gemini-3.1-flash-lite',
  ].filter(Boolean) as string[],
  temperature: 0.3,
  maxOutputTokens: 2048,
};
