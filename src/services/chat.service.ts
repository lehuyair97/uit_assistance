import { ChatHistoryItem } from '@/types/api';
import { geminiService } from './ai/gemini.service';
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

    // 1. Kiểm tra API Key
    if (!apiKey || apiKey === 'your_gemini_api_key_here' || apiKey.trim() === '') {
      return this.createNoticeStream(
        `⚙️ **Chưa cấu hình API Key cho hệ thống AI.**\n\nVui lòng thiết lập biến môi trường \`GEMINI_API_KEY\` trong file \`.env.local\` để kích hoạt Trợ lý AI UIT.`
      );
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

    const encoder = new TextEncoder();

    try {
      // 4. Gọi Gemini Service
      const responseStream = await geminiService.createStream(
        formattedContents,
        systemPrompt
      );

      // 5. Trả về stream thời gian thực
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
          } catch (streamErr: unknown) {
            console.error('[ChatService SSE Error during stream]', streamErr);
            const errNotice = ChatService.getOverloadMessage(streamErr);
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: errNotice })}\n\n`));
            controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
            controller.close();
          }
        },
      });
    } catch (err: unknown) {
      console.error('[ChatService] Gemini call failed:', err);
      const overloadMessage = ChatService.getOverloadMessage(err);
      return this.createNoticeStream(overloadMessage);
    }
  }

  private static getOverloadMessage(error?: unknown): string {
    const msg = error instanceof Error ? error.message : String(error || '');
    const isQuotaOrRate =
      msg.includes('429') ||
      msg.includes('RESOURCE_EXHAUSTED') ||
      msg.includes('quota') ||
      msg.includes('rate') ||
      msg.includes('Too Many Requests');

    if (isQuotaOrRate) {
      return `⚠️ **Hệ thống AI hiện đang quá tải do vượt quá hạn mức truy cập (Quota Exceeded).**\n\nYêu cầu của bạn tạm thời chưa thể xử lý. Vui lòng:\n- Thử lại sau ít phút.\n- Hoặc tra cứu thông tin chính thức tại: [Cổng đào tạo UIT (student.uit.edu.vn)](https://student.uit.edu.vn) | [Website trường (uit.edu.vn)](https://www.uit.edu.vn).`;
    }

    return `⚠️ **Hệ thống tạm thời gián đoạn kết nối với mô hình AI.**\n\nKhông thể hoàn tất phản hồi lúc này. Vui lòng thử lại sau giây lát hoặc truy cập các kênh thông tin chính thức của trường tại [student.uit.edu.vn](https://student.uit.edu.vn).`;
  }

  private createNoticeStream(content: string): ReadableStream {
    const encoder = new TextEncoder();
    return new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: content })}\n\n`));
        controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
        controller.close();
      },
    });
  }
}

export const chatService = ChatService.getInstance();
