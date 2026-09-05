'use client';

import React from 'react';
import { Calendar, Search, Globe, ChevronDown } from 'lucide-react';

export const TopHeader: React.FC = () => {
  return (
    <div className="top-header">
      <div className="container top-header-inner">
        <nav className="top-nav-links">
          <a href="https://www.uit.edu.vn/" target="_blank" rel="noreferrer" className="top-nav-link">
            Trang chủ
          </a>
          <a href="https://portal.uit.edu.vn/sinh-vien/" target="_blank" rel="noreferrer" className="top-nav-link">
            Sinh viên
          </a>
          <a href="https://portal.uit.edu.vn/vc-nld" target="_blank" rel="noreferrer" className="top-nav-link">
            Nhân viên
          </a>
          <a href="https://alumni.uit.edu.vn/" target="_blank" rel="noreferrer" className="top-nav-link">
            Cựu sinh viên
          </a>
        </nav>

        <div className="top-nav-actions">
          <a 
            href="https://daa.uit.edu.vn/lich-dao-tao" 
            target="_blank" 
            rel="noreferrer" 
            className="top-action-btn"
            title="Lịch đào tạo & công tác"
          >
            <Calendar size={15} />
          </a>
          <a 
            href="https://www.uit.edu.vn/" 
            target="_blank" 
            rel="noreferrer" 
            className="top-action-btn"
            title="Tìm kiếm"
          >
            <Search size={15} />
          </a>
          <div className="lang-badge" title="Ngôn ngữ hiện tại">
            <Globe size={13} />
            <span>VI</span>
            <ChevronDown size={11} />
          </div>
        </div>
      </div>
    </div>
  );
};
