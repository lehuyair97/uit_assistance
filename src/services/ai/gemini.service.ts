import { GoogleGenAI } from '@google/genai';
import { AI_CONFIG } from '@/config/ai.config';

export class GeminiService {
  private static instance: GeminiService;
  private client: GoogleGenAI | null = null;

  private constructor() {}

  public static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  public getClient(): GoogleGenAI {
    if (!this.client) {
      const apiKey = process.env.GEMINI_API_KEY;
      this.client = new GoogleGenAI({
        apiKey: apiKey || 'dummy-key-for-init',
      });
    }
    return this.client;
  }

  public async createStream(
    formattedContents: Array<{ role: string; parts: Array<{ text: string }> }>,
    systemInstruction: string
  ): Promise<any> {
    const ai = this.getClient();
    const candidateModels = Array.from(new Set(AI_CONFIG.candidateModels));

    let lastError: unknown = null;

    for (const model of candidateModels) {
      try {
        const stream = await ai.models.generateContentStream({
          model,
          contents: formattedContents,
          config: {
            systemInstruction,
            temperature: AI_CONFIG.temperature,
          },
        });
        return stream;
      } catch (err) {
        lastError = err;
        console.warn(`[GeminiService] Model ${model} failed, trying next candidate...`, err);
      }
    }

    throw lastError || new Error('All Gemini candidate models failed.');
  }
}

export const geminiService = GeminiService.getInstance();
