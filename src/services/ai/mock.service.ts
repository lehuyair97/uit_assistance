/**
 * Mock AI Service
 * Sử dụng cho mục đích kiểm thử tĩnh cục bộ khi không có kết nối internet/API.
 */
export class MockAiService {
  public static createMockStream(userPrompt: string): ReadableStream {
    const encoder = new TextEncoder();
    const responseText = `⚙️ **Chế độ Giả lập (Offline Simulation)**

Hệ thống AI hiện đang chạy ở chế độ kiểm thử cục bộ. Để kích hoạt mô hình Gemini đầy đủ với tri thức thực tế của UIT, vui lòng cấu hình \`GEMINI_API_KEY\` hợp lệ trong \`.env.local\`.

- Câu hỏi nhận được: "${userPrompt}"
- Thông tin chính thức của trường có thể tra cứu tại: [uit.edu.vn](https://www.uit.edu.vn)`;

    return new ReadableStream({
      async start(controller) {
        const words = responseText.split(' ');
        for (const word of words) {
          const sseData = `data: ${JSON.stringify({ text: word + ' ' })}\n\n`;
          controller.enqueue(encoder.encode(sseData));
          await new Promise((resolve) => setTimeout(resolve, 20));
        }
        controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
        controller.close();
      },
    });
  }
}
