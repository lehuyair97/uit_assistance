'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Award, ExternalLink, Sparkles, Target, Compass, Heart, GraduationCap, Users, Briefcase, TrendingUp } from 'lucide-react';
import { useChatStore } from '@/store/useChatStore';

interface Slide {
  id: string;
  type: 'asiin' | 'vision' | 'admissions';
  url: string;
}

const SLIDES: Slide[] = [
  {
    id: 'asiin-accreditation',
    type: 'asiin',
    url: 'https://www.uit.edu.vn/bai-viet/dam-bao-chat-luong',
  },
  {
    id: 'vision-mission',
    type: 'vision',
    url: 'https://www.uit.edu.vn/bai-viet/tam-nhin-su-mang-va-gia-tri-cot-loi',
  },
  {
    id: 'admissions-2025',
    type: 'admissions',
    url: 'https://tuyensinh.uit.edu.vn/',
  },
];

export const HeroBannerSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { openDrawer, setActivePrompt } = useChatStore();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  // Auto-play slider
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handleAskAI = (prompt: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActivePrompt(prompt);
    openDrawer();
  };

  return (
    <section 
      className="hero-slider-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="slider-wrapper">
        {/* HORIZONTAL CAROUSEL TRACK */}
        <div 
          className="slider-track" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {/* SLIDE 1: ASIIN ACCREDITATION (BANNER GỐC TRÊN ẢNH) */}
          <div className="banner-slide asiin-banner">
            <div className="asiin-watermark" />
            
            <div className="container slide-content-container">
              {/* Header logos inside banner */}
              <div className="asiin-header">
                <div className="asiin-logo-box">
                  <Award size={20} color="#38bdf8" />
                  <span style={{ fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.05em' }}>
                    UIT • TRƯỜNG ĐH CÔNG NGHỆ THÔNG TIN
                  </span>
                </div>
                <div className="asiin-logo-box">
                  <span style={{ fontWeight: 900, fontSize: '1rem', letterSpacing: '0.1em', color: '#f59e0b' }}>
                    ASIIN
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                    ĐỨC / CHÂU ÂU
                  </span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="asiin-title-main">
                CÁC CHƯƠNG TRÌNH ĐÀO TẠO CỦA UIT ĐẠT CHUẨN KIỂM ĐỊNH QUỐC TẾ ASIIN
              </h1>

              {/* 3 Columns Grid (2024, 2025, 2026) */}
              <div className="asiin-grid">
                {/* Column 2024 */}
                <div className="asiin-card">
                  <div className="asiin-year-badge">2024</div>
                  <ul className="asiin-programs-list">
                    <li className="asiin-program-item">
                      <span className="asiin-bullet">•</span>
                      <span>Cử nhân Hệ thống Thông tin</span>
                    </li>
                    <li className="asiin-program-item">
                      <span className="asiin-bullet">•</span>
                      <span>Cử nhân Thương mại Điện tử</span>
                    </li>
                    <li className="asiin-program-item">
                      <span className="asiin-bullet">•</span>
                      <span>Thạc sĩ Hệ thống Thông tin</span>
                    </li>
                  </ul>
                </div>

                {/* Column 2025 */}
                <div className="asiin-card" style={{ borderColor: 'rgba(56, 189, 248, 0.4)' }}>
                  <div className="asiin-year-badge" style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    2025
                  </div>
                  <ul className="asiin-programs-list">
                    <li className="asiin-program-item">
                      <span className="asiin-bullet">•</span>
                      <span>Cử nhân Khoa học Máy tính</span>
                    </li>
                    <li className="asiin-program-item">
                      <span className="asiin-bullet">•</span>
                      <span>Thạc sĩ Khoa học Máy tính</span>
                    </li>
                    <li className="asiin-program-item">
                      <span className="asiin-bullet">•</span>
                      <span>Cử nhân Mạng máy tính & TTDL</span>
                    </li>
                    <li className="asiin-program-item">
                      <span className="asiin-bullet">•</span>
                      <span>Thạc sĩ An toàn Thông tin</span>
                    </li>
                  </ul>
                </div>

                {/* Column 2026 */}
                <div className="asiin-card">
                  <div className="asiin-year-badge">2026</div>
                  <ul className="asiin-programs-list">
                    <li className="asiin-program-item">
                      <span className="asiin-bullet">•</span>
                      <span>Cử nhân Khoa học Dữ liệu</span>
                    </li>
                    <li className="asiin-program-item">
                      <span className="asiin-bullet">•</span>
                      <span>Cử nhân Công nghệ Thông tin</span>
                    </li>
                    <li className="asiin-program-item">
                      <span className="asiin-bullet">•</span>
                      <span>Cử nhân Kỹ thuật Phần mềm</span>
                    </li>
                    <li className="asiin-program-item">
                      <span className="asiin-bullet">•</span>
                      <span>Cử nhân Kỹ thuật Máy tính</span>
                    </li>
                    <li className="asiin-program-item">
                      <span className="asiin-bullet">•</span>
                      <span>Thạc sĩ Công nghệ Thông tin</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Actions & Skyline footer */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <a 
                  href="https://www.uit.edu.vn/bai-viet/dam-bao-chat-luong" 
                  target="_blank" 
                  rel="noreferrer"
                  className="slide-action-btn-outline"
                >
                  <span>Xem chi tiết tại uit.edu.vn</span>
                  <ExternalLink size={14} />
                </a>

                <button
                  type="button"
                  onClick={(e) => handleAskAI('Cho mình hỏi chi tiết về các chương trình đạt chuẩn kiểm định ASIIN của UIT?', e)}
                  className="slide-action-btn-primary"
                >
                  <Sparkles size={15} color="#fde047" />
                  <span>Hỏi AI về kiểm định ASIIN</span>
                </button>
              </div>

              <div className="building-skyline">
                <span>🏛️ TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN</span>
                <span>📍 KHU ĐÔ THỊ ĐHQG-HCM, TP. THỦ ĐỨC</span>
                <span>🇻🇳 CHUẨN MỰC QUỐC TẾ - VƯƠN TẦM KHU VỰC</span>
              </div>
            </div>
          </div>

          {/* SLIDE 2: TẦM NHÌN, SỨ MẠNG & GIÁ TRỊ CỐT LÕI (CRAWLED TỪ UIT) */}
          <div className="banner-slide vision-banner">
            <div className="vision-bg-overlay" />
            
            <div className="container slide-content-container">
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  padding: '0.35rem 1.25rem', 
                  background: 'rgba(245, 158, 11, 0.15)', 
                  border: '1px solid #f59e0b', 
                  borderRadius: '9999px', 
                  color: '#fde68a', 
                  fontWeight: 700, 
                  fontSize: '0.85rem',
                  marginBottom: '0.75rem' 
                }}>
                  🌟 ĐẠI HỌC QUỐC GIA TP. HỒ CHÍ MINH • UIT 2006 - 2026
                </div>

                <h2 style={{ 
                  fontSize: 'clamp(1.5rem, 2.8vw, 2.3rem)', 
                  fontWeight: 800, 
                  color: '#ffffff', 
                  textTransform: 'uppercase',
                  background: 'linear-gradient(180deg, #ffffff 20%, #fde68a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.5rem'
                }}>
                  TẦM NHÌN, SỨ MẠNG & GIÁ TRỊ CỐT LÕI UIT
                </h2>
                <p style={{ color: '#cbd5e1', maxWidth: '850px', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  Trường Đại học Công nghệ Thông tin cam kết đào tạo tinh hoa công nghệ, đổi mới sáng tạo và tiên phong trong kỷ nguyên Trí tuệ Nhân tạo.
                </p>
              </div>

              {/* 3 Pillar Cards */}
              <div className="vision-grid">
                {/* Tầm nhìn */}
                <div className="vision-card">
                  <div className="vision-icon-box" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' }}>
                    <Target size={24} color="#ffffff" />
                  </div>
                  <h3 className="vision-card-title">TẦM NHÌN (VISION)</h3>
                  <p className="vision-card-text">
                    Trở thành trường đại học số hàng đầu khu vực Châu Á trong lĩnh vực Công nghệ Thông tin, Truyền thông và Trí tuệ Nhân tạo.
                  </p>
                </div>

                {/* Sứ mạng */}
                <div className="vision-card">
                  <div className="vision-icon-box" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
                    <Compass size={24} color="#ffffff" />
                  </div>
                  <h3 className="vision-card-title">SỨ MẠNG (MISSION)</h3>
                  <p className="vision-card-text">
                    Đào tạo nguồn nhân lực chất lượng cao, nghiên cứu khoa học và chuyển giao công nghệ tiên tiến phục vụ sự phát triển của đất nước.
                  </p>
                </div>

                {/* Giá trị cốt lõi */}
                <div className="vision-card">
                  <div className="vision-icon-box" style={{ background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)' }}>
                    <Heart size={24} color="#ffffff" />
                  </div>
                  <h3 className="vision-card-title">GIÁ TRỊ CỐT LÕI</h3>
                  <p className="vision-card-text">
                    <strong>Toàn diện</strong> (Comprehensive) • <strong>Sáng tạo</strong> (Creative) • <strong>Phụng sự</strong> (Devoted) làm kim chỉ nam mọi hành động.
                  </p>
                </div>
              </div>

              {/* Slide 2 Actions */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                <a 
                  href="https://www.uit.edu.vn/bai-viet/tam-nhin-su-mang-va-gia-tri-cot-loi" 
                  target="_blank" 
                  rel="noreferrer"
                  className="slide-action-btn-outline"
                >
                  <span>Xem bài viết trên uit.edu.vn</span>
                  <ExternalLink size={14} />
                </a>

                <button
                  type="button"
                  onClick={(e) => handleAskAI('Giới thiệu chi tiết về Tầm nhìn, Sứ mạng và các thế mạnh đào tạo nổi bật của UIT?', e)}
                  className="slide-action-btn-primary"
                  style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)' }}
                >
                  <Sparkles size={15} color="#ffffff" />
                  <span>Hỏi AI về thế mạnh của UIT</span>
                </button>
              </div>
            </div>
          </div>

          {/* SLIDE 3: TUYỂN SINH & THÀNH TỰU ĐÀO TẠO (CRAWLED TỪ TUYENSINH.UIT.EDU.VN) */}
          <div className="banner-slide admissions-banner">
            <div className="admissions-bg-overlay" />
            
            <div className="container slide-content-container">
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  padding: '0.35rem 1.25rem', 
                  background: 'rgba(16, 185, 129, 0.18)', 
                  border: '1px solid #10b981', 
                  borderRadius: '9999px', 
                  color: '#6ee7b7', 
                  fontWeight: 700, 
                  fontSize: '0.85rem',
                  marginBottom: '0.75rem' 
                }}>
                  🎯 CỔNG TUYỂN SINH ĐẠI HỌC CHÍNH QUY NĂM 2025 - 2026
                </div>

                <h2 style={{ 
                  fontSize: 'clamp(1.5rem, 2.8vw, 2.3rem)', 
                  fontWeight: 800, 
                  color: '#ffffff', 
                  textTransform: 'uppercase',
                  background: 'linear-gradient(180deg, #ffffff 20%, #a7f3d0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.5rem'
                }}>
                  CHẤT LƯỢNG ĐÀO TẠO ĐẠT CHUẨN QUỐC TẾ TẠI UIT
                </h2>
                <p style={{ color: '#cbd5e1', maxWidth: '850px', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  Môi trường học tập năng động, công nghệ hiện đại, cơ hội việc làm toàn cầu cùng hàng trăm suất học bổng doanh nghiệp.
                </p>
              </div>

              {/* 4 Stats Cards Grid */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon-wrapper" style={{ color: '#38bdf8' }}>
                    <TrendingUp size={28} />
                  </div>
                  <div className="stat-value">100%</div>
                  <div className="stat-label">Sinh viên có việc làm sau tốt nghiệp</div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon-wrapper" style={{ color: '#fde047' }}>
                    <GraduationCap size={28} />
                  </div>
                  <div className="stat-value">14+</div>
                  <div className="stat-label">Ngành đào tạo đón đầu kỷ nguyên AI & Vi mạch</div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon-wrapper" style={{ color: '#4ade80' }}>
                    <Briefcase size={28} />
                  </div>
                  <div className="stat-value">50+</div>
                  <div className="stat-label">Tập đoàn công nghệ đối tác toàn cầu</div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon-wrapper" style={{ color: '#f472b6' }}>
                    <Users size={28} />
                  </div>
                  <div className="stat-value">Top 1</div>
                  <div className="stat-label">Trường đại học hàng đầu về CNTT tại Việt Nam</div>
                </div>
              </div>

              {/* Slide 3 Actions */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                <a 
                  href="https://tuyensinh.uit.edu.vn/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="slide-action-btn-primary"
                  style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', boxShadow: '0 4px 15px rgba(5, 150, 105, 0.4)' }}
                >
                  <span>Cổng tuyển sinh tuyensinh.uit.edu.vn</span>
                  <ExternalLink size={14} />
                </a>

                <button
                  type="button"
                  onClick={(e) => handleAskAI('Tư vấn cho mình các phương thức xét tuyển và chính sách học bổng tuyển sinh 2025 của UIT?', e)}
                  className="slide-action-btn-outline"
                >
                  <Sparkles size={15} color="#fde047" />
                  <span>Hỏi AI về phương thức tuyển sinh</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <button 
          type="button" 
          className="slider-btn prev" 
          onClick={prevSlide}
          aria-label="Slide trước"
        >
          <ChevronLeft size={22} />
        </button>
        <button 
          type="button" 
          className="slider-btn next" 
          onClick={nextSlide}
          aria-label="Slide tiếp theo"
        >
          <ChevronRight size={22} />
        </button>

        {/* Dots */}
        <div className="slider-dots">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Đi tới slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
