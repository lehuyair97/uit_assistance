import { GroundingContext, KnowledgeDocument } from '@/types/knowledge';
import { UIT_SYSTEM_INSTRUCTION } from '@/lib/gemini/prompts';
import asiinData from '@/data/knowledge/asiin_programs.json';
import academicData from '@/data/knowledge/academic_regulations.json';
import admissionsData from '@/data/knowledge/scholarships_admissions.json';
import facultiesData from '@/data/knowledge/faculties_and_units.json';
import uitOverview2025Data from '@/data/knowledge/uit_overview_handbook_2025.json';

export class KnowledgeService {
  private static instance: KnowledgeService;

  private constructor() {}

  public static getInstance(): KnowledgeService {
    if (!KnowledgeService.instance) {
      KnowledgeService.instance = new KnowledgeService();
    }
    return KnowledgeService.instance;
  }

  /**
   * Tổng hợp Tri thức Đào tạo & Quy chế UIT thành System Grounding Prompt
   */
  public getGroundingContext(): GroundingContext {
    const formattedKnowledge = `
${UIT_SYSTEM_INSTRUCTION}

---
### DỮ LIỆU TRI THỨC ĐƯỢC HUẤN LUYỆN & NẠP SẴN (PRE-LOADED KNOWLEDGE BASE):

1. **CHI TIẾT 12 CHƯƠNG TRÌNH KIỂM ĐỊNH ASIIN (ĐỨC)**:
${JSON.stringify(asiinData)}

2. **QUY CHẾ HỌC VỤ & ĐIỀU KIỆN TỐT NGHIỆP UIT**:
${JSON.stringify(academicData)}

3. **TUYỂN SINH & HỌC BỔNG UIT**:
${JSON.stringify(admissionsData)}

4. **KHOA / NGÀNH & HỆ THỐNG CỔNG DỊCH VỤ SINH VIÊN**:
${JSON.stringify(facultiesData)}

5. **TỔNG QUAN UIT 2025, ĐỊA CHỈ PHÒNG BAN, PHÒNG THÍ NGHIỆM & SỔ TAY SINH VIÊN (Trích xuất từ slide 01 - Tong quan 2025-posted.pdf)**:
${JSON.stringify(uitOverview2025Data)}
`;

    return {
      systemPrompt: formattedKnowledge,
      documents: this.getAvailableDocuments(),
    };
  }

  /**
   * Danh sách tài liệu hiện hữu trong kho tri thức
   */
  public getAvailableDocuments(): KnowledgeDocument[] {
    return [
      {
        id: 'uit-overview-handbook-2025',
        title: 'BÀI 01: Tổng quan Trường ĐH Công nghệ Thông tin & Khoa KH&KTTT (2025)',
        category: 'handbook',
        summary: 'Tổng quan sứ mạng, triết lý giáo dục (Toàn diện - Sáng tạo - Phụng sự), địa chỉ phòng ban (ĐTĐH, CTSV, KHTC phòng A103, VPĐB phòng E2.1), phòng thí nghiệm (E5.1, E8.1, E9.1), liên hệ Khoa KH&KTTT (E10.2), chương trình đào tạo CNTT/KHDL và hướng dẫn xử lý tình huống học vụ.',
        updatedAt: '2026-09-05',
      },
      {
        id: 'uit-asiin-2024-2026',
        title: 'Chương trình đào tạo đạt chuẩn kiểm định quốc tế ASIIN (2024 - 2026)',
        category: 'asiin',
        summary: '12 chương trình Cử nhân & Thạc sĩ đạt chuẩn ASIIN (CHLB Đức) của các khoa HTTT, KHMT, MMT, KTTT, KTMT, CNPM.',
        updatedAt: '2026-09-01',
      },
      {
        id: 'uit-academic-rules',
        title: 'Quy chế đào tạo, Thang điểm GPA & Điều kiện tốt nghiệp UIT',
        category: 'handbook',
        summary: 'Thang điểm 4, chuẩn đầu ra Ngoại ngữ (TOEIC/IELTS/VSTEP), GDQP-AN, Điểm rèn luyện và Cảnh báo học vụ.',
        updatedAt: '2026-08-15',
      },
      {
        id: 'uit-scholarships-admissions',
        title: 'Phương thức Tuyển sinh & Chính sách Học bổng UIT',
        category: 'admissions',
        summary: '5 phương thức xét tuyển đại học và các gói học bổng Khuyến khích học tập, Thủ khoa, Tài năng.',
        updatedAt: '2026-08-10',
      },
      {
        id: 'uit-faculties-portals',
        title: 'Cơ cấu 6 Khoa chuyên ngành và Cổng dịch vụ sinh viên (DAA, CTSV, Moodle, Student Portal)',
        category: 'general',
        summary: 'Thông tin 6 khoa chuyên môn và hướng dẫn sử dụng các cổng thông tin học vụ.',
        updatedAt: '2026-08-01',
      },
    ];
  }
}

export const knowledgeService = KnowledgeService.getInstance();
