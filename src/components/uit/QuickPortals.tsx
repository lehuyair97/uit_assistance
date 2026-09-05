'use client';

import React from 'react';
import { GraduationCap, BookOpen, Layers, UserCheck, ShieldCheck, HelpCircle } from 'lucide-react';
import { useChatStore } from '@/store/useChatStore';

export const QuickPortals: React.FC = () => {
  const { openDrawer, setActivePrompt } = useChatStore();

  const handleQuickQuestion = (prompt: string) => {
    setActivePrompt(prompt);
    openDrawer();
  };

  return (
    <section className="quick-portal-bar">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#003b73' }}>
              CỔNG THÔNG TIN & TIỆN ÍCH SINH VIÊN UIT
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Truy cập nhanh hệ thống dịch vụ học vụ hoặc yêu cầu Trợ lý AI hỗ trợ giải đáp
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleQuickQuestion('Hướng dẫn sử dụng các cổng thông tin và dịch vụ sinh viên UIT?')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#005baa',
              background: '#e6f1fb',
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
            }}
          >
            <HelpCircle size={15} />
            <span>Hỏi AI về thủ tục</span>
          </button>
        </div>

        <div className="portal-grid">
          {/* Portal DAA */}
          <a href="https://daa.uit.edu.vn" target="_blank" rel="noreferrer" className="portal-card">
            <div className="portal-icon-box" style={{ background: '#0284c7' }}>
              <GraduationCap size={22} />
            </div>
            <div>
              <div className="portal-title">Phòng Đào tạo (DAA)</div>
              <div className="portal-desc">Thời khóa biểu, lịch thi, điểm số</div>
            </div>
          </a>

          {/* Student Portal */}
          <a href="https://student.uit.edu.vn" target="_blank" rel="noreferrer" className="portal-card">
            <div className="portal-icon-box" style={{ background: '#059669' }}>
              <UserCheck size={22} />
            </div>
            <div>
              <div className="portal-title">Cổng Quản Lý Sinh Viên</div>
              <div className="portal-desc">ĐRL, giấy tờ trực tuyến, học bổng</div>
            </div>
          </a>

          {/* Courses Moodle */}
          <a href="https://courses.uit.edu.vn" target="_blank" rel="noreferrer" className="portal-card">
            <div className="portal-icon-box" style={{ background: '#d97706' }}>
              <BookOpen size={22} />
            </div>
            <div>
              <div className="portal-title">Khóa học Trực tuyến</div>
              <div className="portal-desc">Moodle LMS, nộp bài tập, slide</div>
            </div>
          </a>

          {/* Quy chế ASIIN & ĐBCL */}
          <a href="https://www.uit.edu.vn/bai-viet/dam-bao-chat-luong" target="_blank" rel="noreferrer" className="portal-card">
            <div className="portal-icon-box" style={{ background: '#7c3aed' }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="portal-title">Kiểm định & ĐBCL</div>
              <div className="portal-desc">Chuẩn ASIIN, AUN-QA, ABET</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
