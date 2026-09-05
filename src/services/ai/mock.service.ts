export class MockAiService {
  public static createMockStream(userPrompt: string): ReadableStream {
    const encoder = new TextEncoder();
    const lower = userPrompt.toLowerCase();
    let responseText = '';

    if (lower.includes('asiin') || lower.includes('kiểm định') || lower.includes('chuẩn')) {
      responseText = `Chào bạn! Dưới đây là thông tin chi tiết về **Các chương trình đào tạo của UIT đạt chuẩn kiểm định quốc tế ASIIN** (Cộng hòa Liên bang Đức):

### 🏅 Lộ Trình Đạt Chuẩn ASIIN Của UIT:
* **Năm 2024**:
  - 🎓 **Cử nhân Hệ thống Thông tin**
  - 🎓 **Cử nhân Thương mại Điện tử**
  - 🎓 **Thạc sĩ Hệ thống Thông tin**
* **Năm 2025**:
  - 🎓 **Cử nhân Khoa học Máy tính**
  - 🎓 **Thạc sĩ Khoa học Máy tính**
  - 🎓 **Cử nhân Mạng máy tính & Truyền thông Dữ liệu**
  - 🎓 **Thạc sĩ An toàn Thông tin**
* **Năm 2026**:
  - 🎓 **Cử nhân Khoa học Dữ liệu**
  - 🎓 **Cử nhân Công nghệ Thông tin**
  - 🎓 **Cử nhân Kỹ thuật Phần mềm**
  - 🎓 **Cử nhân Kỹ thuật Máy tính**
  - 🎓 **Thạc sĩ Công nghệ Thông tin**

> 💡 *Kiểm định quốc tế ASIIN khẳng định chất lượng đào tạo hàng đầu của UIT, bằng cấp được công nhận rộng rãi tại châu Âu và quốc tế.*`;
    } else if (lower.includes('tốt nghiệp') || lower.includes('điều kiện')) {
      responseText = `### 🎓 Điều Kiện Tốt Nghiệp Tại Trường ĐH Công Nghệ Thông Tin (UIT):

1. **Tích lũy đủ số tín chỉ**: Hoàn thành đầy đủ các học phần theo khung chương trình đào tạo của ngành.
2. **Điểm trung bình tích lũy (GPA)**: Đạt từ **2.0/4.0** (hoặc 5.0/10) trở lên.
3. **Chuẩn ngoại ngữ đầu ra**: Đạt chứng chỉ quốc tế (TOEIC, IELTS, TOEFL, VSTEP) theo quy định của từng khóa.
4. **Chuẩn tin học & Kỹ năng mềm**: Hoàn thành các chứng chỉ kỹ năng mềm và kỹ năng bổ trợ do trường tổ chức.
5. **Giáo dục thể chất & Giáo dục quốc phòng**: Có chứng chỉ GDTC và GDQP-AN.
6. **Không bị kỷ luật** từ mức đình chỉ học tập trở lên tại thời điểm xét tốt nghiệp.`;
    } else {
      responseText = `Chào bạn! Mình là **UIT AI Assistant** — Trợ lý ảo sinh viên của Trường Đại học Công nghệ Thông tin (ĐHQG-HCM).

Mình có thể hỗ trợ bạn giải đáp các vấn đề:
- 🏛️ **Kiểm định chất lượng ASIIN & AUN-QA**
- 📚 **Chương trình đào tạo, môn học & đề cương**
- 📝 **Quy chế học vụ, đăng ký môn học, điều kiện tốt nghiệp**
- 📅 **Lịch học, lịch thi và thủ tục hành chính trực tuyến**

Bạn có câu hỏi cụ thể nào cần mình trợ giúp không?`;
    }

    const words = responseText.split(' ');
    return new ReadableStream({
      async start(controller) {
        for (let i = 0; i < words.length; i++) {
          const chunk = (i === 0 ? '' : ' ') + words[i];
          const sseData = `data: ${JSON.stringify({ text: chunk })}\n\n`;
          controller.enqueue(encoder.encode(sseData));
          await new Promise((r) => setTimeout(r, 15));
        }
        controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
        controller.close();
      },
    });
  }
}
