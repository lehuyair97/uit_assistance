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
    } else if (lower.includes('ngoại ngữ') || lower.includes('tiếng anh') || lower.includes('toeic') || lower.includes('ielts')) {
      responseText = `### 🌐 Chuẩn Ngoại Ngữ & Miễn Môn Tiếng Anh Tại UIT:

Theo quy định đào tạo ngoại ngữ hệ đại học chính quy (cập nhật mới nhất theo QĐ 828, QĐ 364 và QĐ 560/QĐ-ĐHCNTT):
* **TOEIC 4 kỹ năng**: Đạt từ **Nghe - Đọc 675+** và **Nói - Viết 225+**.
* **IELTS Academic**: Đạt từ **5.5 – 6.0+** (tùy ngành và chương trình Chuẩn / Đặc biệt).
* **VSTEP**: Đạt từ **Bậc 3 (B1)** đến **Bậc 4 (B2)** theo khung 6 bậc Việt Nam.

> 📅 **Thời hạn nộp chứng chỉ xét miễn Anh văn 1, 2, 3**:
> - **Học kỳ 1**: 2 tuần cuối tháng 7 hàng năm.
> - **Học kỳ 2**: 2 tuần cuối tháng 11 hàng năm.

📌 **Link văn bản quy định & bảng tra cứu chi tiết**:  
👉 [Xem bài đăng: Hướng dẫn thực hiện quy định về chuẩn ngoại ngữ - Phòng ĐTĐH UIT](https://daa.uit.edu.vn/content/huong-dan-sinh-vien-dai-hoc-he-chinh-quy-thuc-hien-cac-quy-dinh-ve-chuan-qua-trinh-va-chuan)`;
    } else if (lower.includes('tốt nghiệp') || lower.includes('điều kiện')) {
      responseText = `### 🎓 Điều Kiện Tốt Nghiệp Tại Trường ĐH Công Nghệ Thông Tin (UIT):

1. **Tích lũy đủ số tín chỉ**: Hoàn thành từ 120 đến 135 tín chỉ theo khung chương trình đào tạo của từng ngành.
2. **Điểm trung bình tích lũy (GPA)**: Đạt từ **2.00 / 4.00** trở lên (tương đương 5.0/10).
3. **Chuẩn ngoại ngữ đầu ra**: Đạt chứng chỉ quốc tế (TOEIC 550+, IELTS 5.5+, TOEFL hoặc VSTEP) theo quy định.
4. **Chuẩn tin học & Kỹ năng mềm**: Hoàn thành tối thiểu 02 chuyên đề kỹ năng mềm và kỹ năng bổ trợ do trường tổ chức.
5. **Giáo dục thể chất & Giáo dục quốc phòng**: Có chứng chỉ GDTC và chứng chỉ GDQP-AN.
6. **Không bị kỷ luật** từ mức đình chỉ học tập trở lên tại thời điểm xét tốt nghiệp.

📌 **Nguồn văn bản & tra cứu chính thức**:
- Tra cứu tại: [Cổng Thông tin Đào tạo UIT (student.uit.edu.vn)](https://student.uit.edu.vn)  
  *(Vào menu **Quy định - Hướng dẫn** ➔ chọn mục **"Quy chế, Quy định đào tạo đại học của Trường ĐHCNTT"**)*`;
    } else if (
      lower.includes('phòng ban') ||
      lower.includes('liên hệ') ||
      lower.includes('đào tạo') ||
      lower.includes('công tác sinh viên') ||
      lower.includes('kế hoạch tài chính') ||
      lower.includes('khoa') ||
      lower.includes('thí nghiệm') ||
      lower.includes('học phí')
    ) {
      responseText = `### 🏢 Danh Sách Các Đơn Vị & Phòng Ban Sinh Viên Thường Liên Hệ (Trích Sổ tay UIT 2025):

1. **Phòng Đào tạo Đại học**:
   - **Nhiệm vụ**: Đăng ký học phần, thời khóa biểu, lịch thi, điểm số, phúc khảo, bảo lưu, chuyển ngành.
   - **Email**: \`phongdaotaodh@uit.edu.vn\` | **Website**: [student.uit.edu.vn](https://student.uit.edu.vn)
2. **Phòng Công tác Sinh viên (CTSV)**:
   - **Nhiệm vụ**: Thẻ sinh viên, giấy xác nhận sinh viên (vay vốn, hoãn NVQS), học bổng, điểm rèn luyện, bảo hiểm y tế.
   - **Email**: \`ctsv@uit.edu.vn\` | **Website**: [ctsv.uit.edu.vn](https://ctsv.uit.edu.vn)
3. **Phòng Kế hoạch - Tài chính**:
   - **Vị trí**: **Phòng A103**
   - **Nhiệm vụ**: Học phí, thủ tục đóng học phí, tra cứu học phí còn nợ.
   - **Email**: \`khtc@uit.edu.vn\` | **Website**: [khtc.uit.edu.vn](https://khtc.uit.edu.vn)
4. **Khoa Khoa học và Kỹ thuật Thông tin (KHTT)**:
   - **Văn phòng Khoa**: **Phòng E10.2** (Tầng 10, Tòa nhà E) - Gặp Cô Thảo, Cô Hoài (Sáng: 7h30-11h30, Chiều: 13h30-16h30).
   - **Giải quyết**: Nhận chứng chỉ GDQP-AN, đơn chuyển ngành, đơn xin miễn học phần ngoại ngữ.
5. **Các Phòng Thí Nghiệm Trọng Điểm**:
   - PTN Truyền thông Đa phương tiện: **Phòng E5.1** (Khoa KHMT quản lý)
   - PTN An toàn Thông tin: **Phòng E8.1** (Khoa MMT quản lý)
   - PTN Hệ thống Thông tin: **Phòng E9.1** (Khoa HTTT quản lý)

📌 **Kênh hỗ trợ trực tuyến chính thức**:
- Tra cứu học vụ: [student.uit.edu.vn](https://student.uit.edu.vn)
- Biểu mẫu sinh viên: [ctsv.uit.edu.vn](https://ctsv.uit.edu.vn)
- Cổng tài chính - học phí: [khtc.uit.edu.vn](https://khtc.uit.edu.vn)`;
    } else {
      responseText = `Chào bạn! Mình là **UIT AI Assistant** — Trợ lý ảo sinh viên của Trường Đại học Công nghệ Thông tin (ĐHQG-HCM).

Mình có thể hỗ trợ bạn giải đáp các vấn đề:
- 🏛️ **Địa chỉ phòng ban, phòng thí nghiệm & liên hệ các Khoa**
- 🏅 **Kiểm định chất lượng ASIIN & AUN-QA**
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
