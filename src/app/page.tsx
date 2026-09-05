'use client';

import React from 'react';
import { TopHeader } from '@/components/uit/TopHeader';
import { MainNavbar } from '@/components/uit/MainNavbar';
import { Breadcrumb } from '@/components/uit/Breadcrumb';
import { HeroBannerSlider } from '@/components/uit/HeroBannerSlider';
import { QuickPortals } from '@/components/uit/QuickPortals';
import { ChatFloatingButton } from '@/components/chat/ChatFloatingButton';
import { ChatDrawer } from '@/components/chat/ChatDrawer';

export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Top Header */}
      <TopHeader />

      {/* 2. Main Navigation */}
      <MainNavbar />

      {/* 3. Breadcrumb */}
      <Breadcrumb />

      {/* 4. Hero Banner Slider (ASIIN & Highlights) */}
      <HeroBannerSlider />

      {/* 5. Quick Portals & Student Hub Services */}
      <QuickPortals />

      {/* 6. AI Assistant Floating Button & Slide Drawer */}
      <ChatFloatingButton />
      <ChatDrawer />

      {/* 7. Footer */}
      <footer style={{ marginTop: 'auto', background: '#0f172a', color: '#94a3b8', padding: '2rem 0', fontSize: '0.82rem', borderTop: '1px solid #1e293b' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
              TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN - ĐHQG TP. HỒ CHÍ MINH
            </div>
            <div>Khu phố 6, P. Linh Trung, TP. Thủ Đức, TP. Hồ Chí Minh</div>
            <div>Điện thoại: (028) 372 52002 • Website: <a href="https://www.uit.edu.vn" target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>www.uit.edu.vn</a></div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#cbd5e1', fontWeight: 600 }}>Cổng Thông tin Hỗ trợ Sinh viên & Tuyển sinh</div>
            <div>Hệ thống AI Grounding Tư vấn Trực tuyến</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
