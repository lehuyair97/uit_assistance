/**
 * AI & Gemini Service Configuration
 */
export const AI_CONFIG = {
  defaultModel: process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite',
  candidateModels: [
    process.env.GEMINI_MODEL,
    'gemini-3.1-flash-lite',
    'gemini-3.5-flash',
    'gemini-3.6-flash',
  ].filter(Boolean) as string[],
  temperature: 0.3,
  maxOutputTokens: 2048,
};
