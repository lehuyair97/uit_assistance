import { ChatHistoryItem } from '@/types/api';
import { geminiService } from './ai/gemini.service';
import { MockAiService } from './ai/mock.service';
import { knowledgeService } from './knowledge/knowledge.service';

export class ChatService {
  private static instance: ChatService;

  private constructor() {}

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  /**
   * Xử lý câu hỏi và trả về SSE ReadableStream
   */
  public async streamChat(
    message: string,
    history: ChatHistoryItem[] = []
  ): Promise<ReadableStream> {
    const apiKey = process.env.GEMINI_API_KEY;

    // 1. Fallback sang mock nếu chưa có API Key
    if (!apiKey || apiKey === 'your_gemini_api_key_here' || apiKey.trim() === '') {
      return MockAiService.createMockStream(message);
    }

    // 2. Lấy Context Grounding từ KnowledgeService
    const { systemPrompt } = knowledgeService.getGroundingContext();

    // 3. Format hội thoại thành cấu trúc Gemini contents
    const formattedContents = history
      .filter((m) => m.role === 'user' || m.role === 'model')
      .map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

    formattedContents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    try {
      // 4. Gọi Gemini Service
      const responseStream = await geminiService.createStream(
        formattedContents,
        systemPrompt
      );

      // 5. Đóng gói thành Web Streams API chuẩn SSE
      const encoder = new TextEncoder();
      return new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of responseStream) {
              const text = chunk.text || '';
              if (text) {
                const sseData = `data: ${JSON.stringify({ text })}\n\n`;
                controller.enqueue(encoder.encode(sseData));
              }
            }
            controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
            controller.close();
          } catch (err: unknown) {
            console.error('[ChatService SSE Error during stream]', err);
            // Nếu stream gặp lỗi giữa chừng, fallback sang mock stream
            const fallbackStream = MockAiService.createMockStream(message);
            const reader = fallbackStream.getReader();
            while (true) {
              const { value, done } = await reader.read();
              if (done) break;
              controller.enqueue(value);
            }
            controller.close();
          }
        },
      });
    } catch (err) {
      console.warn('[ChatService] Gemini initiation failed, using fallback mock stream:', err);
      return MockAiService.createMockStream(message);
    }
  }
}

export const chatService = ChatService.getInstance();
