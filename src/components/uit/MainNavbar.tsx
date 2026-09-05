'use client';

import React from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';

export const MainNavbar: React.FC = () => {
  return (
    <header className="main-navbar">
      <div className="container main-navbar-inner">
        {/* Brand Logo */}
        <a 
          href="https://www.uit.edu.vn/" 
          target="_blank" 
          rel="noreferrer" 
          className="brand-logo"
        >
          <div className="brand-logo-20">
            <span className="logo-badge-20">20</span>
            <div className="logo-text-group">
              <span className="logo-vnuhcm">ĐẠI HỌC QUỐC GIA TP. HỒ CHÍ MINH</span>
              <span className="logo-uit-title">TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN</span>
            </div>
          </div>
        </a>

        {/* Navigation Menu */}
        <nav>
          <ul className="nav-menu">
            {/* Về UIT */}
            <li className="nav-item">
              <a 
                href="https://www.uit.edu.vn/bai-viet/tong-quan-ve-truong-dh-cong-nghe-thong-tin" 
                target="_blank" 
                rel="noreferrer" 
                className="nav-link"
              >
                Về UIT <ChevronDown size={14} />
              </a>
              <div className="dropdown-menu">
                <a href="https://www.uit.edu.vn/bai-viet/tong-quan-ve-truong-dh-cong-nghe-thong-tin" target="_blank" rel="noreferrer" className="dropdown-item">
                  Tổng quan
                </a>
                <a href="https://www.uit.edu.vn/bai-viet/tam-nhin-su-mang-va-gia-tri-cot-loi" target="_blank" rel="noreferrer" className="dropdown-item">
                  Tầm nhìn, Sứ mạng & Giá trị cốt lõi
                </a>
                <a href="https://www.uit.edu.vn/bai-viet/nhan-dien-thuong-hieu" target="_blank" rel="noreferrer" className="dropdown-item">
                  Nhận diện thương hiệu
                </a>
                <a href="https://www.uit.edu.vn/bai-viet/ban-giam-hieu" target="_blank" rel="noreferrer" className="dropdown-item">
                  Ban Giám hiệu
                </a>
                <a href="https://www.uit.edu.vn/bai-viet/dam-bao-chat-luong" target="_blank" rel="noreferrer" className="dropdown-item">
                  Đảm bảo chất lượng & Kiểm định
                </a>
              </div>
            </li>

            {/* Tuyển sinh */}
            <li className="nav-item">
              <a 
                href="https://tuyensinh.uit.edu.vn/" 
                target="_blank" 
                rel="noreferrer" 
                className="nav-link"
              >
                Tuyển sinh <ExternalLink size={12} style={{ opacity: 0.6 }} />
              </a>
            </li>

            {/* Tuyển dụng */}
            <li className="nav-item">
              <a 
                href="https://www.uit.edu.vn/tuyen-dung" 
                target="_blank" 
                rel="noreferrer" 
                className="nav-link"
              >
                Tuyển dụng <ChevronDown size={14} />
              </a>
              <div className="dropdown-menu">
                <a href="https://www.uit.edu.vn/tuyen-dung" target="_blank" rel="noreferrer" className="dropdown-item">
                  Người lao động
                </a>
                <a href="https://www.uit.edu.vn/tuyen-dung-vien-chuc" target="_blank" rel="noreferrer" className="dropdown-item">
                  Viên chức
                </a>
              </div>
            </li>

            {/* Tin tức & sự kiện */}
            <li className="nav-item">
              <a 
                href="https://www.uit.edu.vn/tin-uit" 
                target="_blank" 
                rel="noreferrer" 
                className="nav-link"
              >
                Tin tức & sự kiện <ChevronDown size={14} />
              </a>
              <div className="dropdown-menu">
                <a href="https://www.uit.edu.vn/thong-tin-thong-bao" target="_blank" rel="noreferrer" className="dropdown-item">
                  Thông báo chung
                </a>
                <a href="https://www.uit.edu.vn/tin-uit" target="_blank" rel="noreferrer" className="dropdown-item">
                  Tin tức UIT
                </a>
                <a href="https://www.uit.edu.vn/hoc-tap-nghien-cuu" target="_blank" rel="noreferrer" className="dropdown-item">
                  Tin học tập - nghiên cứu
                </a>
                <a href="https://www.uit.edu.vn/hoat-dong-sinh-vien" target="_blank" rel="noreferrer" className="dropdown-item">
                  Hoạt động sinh viên
                </a>
              </div>
            </li>

            {/* Đào tạo */}
            <li className="nav-item">
              <a 
                href="https://tuyensinh.uit.edu.vn/cac-nganh-dao-tao" 
                target="_blank" 
                rel="noreferrer" 
                className="nav-link"
              >
                Đào tạo <ChevronDown size={14} />
              </a>
              <div className="dropdown-menu">
                <a href="https://tuyensinh.uit.edu.vn/nganh-dao-tao/nganh-khoa-hoc-may-tinh" target="_blank" rel="noreferrer" className="dropdown-item">
                  Khoa học Máy tính
                </a>
                <a href="https://tuyensinh.uit.edu.vn/nganh-dao-tao/nganh-cong-nghe-thong-tin" target="_blank" rel="noreferrer" className="dropdown-item">
                  Công nghệ Thông tin
                </a>
                <a href="https://tuyensinh.uit.edu.vn/nganh-dao-tao/nganh-ky-thuat-phan-mem" target="_blank" rel="noreferrer" className="dropdown-item">
                  Kỹ thuật Phần mềm
                </a>
                <a href="https://tuyensinh.uit.edu.vn/nganh-dao-tao/nganh-he-thong-thong-tin" target="_blank" rel="noreferrer" className="dropdown-item">
                  Hệ thống Thông tin
                </a>
                <a href="https://tuyensinh.uit.edu.vn/nganh-dao-tao/nganh-an-toan-thong-tin" target="_blank" rel="noreferrer" className="dropdown-item">
                  An toàn Thông tin
                </a>
                <a href="https://tuyensinh.uit.edu.vn/nganh-dao-tao/nganh-khoa-hoc-du-lieu" target="_blank" rel="noreferrer" className="dropdown-item">
                  Khoa học Dữ liệu
                </a>
                <a href="https://tuyensinh.uit.edu.vn/nganh-dao-tao/nganh-tri-tue-nhan-tao" target="_blank" rel="noreferrer" className="dropdown-item">
                  Trí tuệ Nhân tạo
                </a>
              </div>
            </li>

            {/* Tra cứu */}
            <li className="nav-item">
              <a 
                href="https://vbcc.uit.edu.vn/" 
                target="_blank" 
                rel="noreferrer" 
                className="nav-link"
              >
                Tra cứu <ChevronDown size={14} />
              </a>
              <div className="dropdown-menu">
                <a href="https://vbcc.uit.edu.vn/" target="_blank" rel="noreferrer" className="dropdown-item">
                  Tra cứu văn bằng chứng chỉ
                </a>
                <a href="https://daa.uit.edu.vn/" target="_blank" rel="noreferrer" className="dropdown-item">
                  Tra cứu thời khóa biểu & lịch thi
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
