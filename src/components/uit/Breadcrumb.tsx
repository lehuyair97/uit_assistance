'use client';

import React from 'react';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  url?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items = [
    { label: 'Trang chủ', url: 'https://www.uit.edu.vn/' },
    { label: 'Đảm bảo chất lượng', url: 'https://www.uit.edu.vn/bai-viet/dam-bao-chat-luong' },
    { label: 'Các chương trình đào tạo đạt chuẩn kiểm định quốc tế ASIIN' },
  ],
}) => {
  return (
    <nav className="breadcrumb-container" aria-label="Breadcrumb">
      <div className="container">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <a 
              href="https://www.uit.edu.vn/" 
              target="_blank" 
              rel="noreferrer" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
            >
              <Home size={14} />
              <span>UIT</span>
            </a>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <React.Fragment key={index}>
                <li className="breadcrumb-separator">
                  <ChevronRight size={13} />
                </li>
                <li className={`breadcrumb-item ${isLast ? 'breadcrumb-current' : ''}`}>
                  {item.url && !isLast ? (
                    <a href={item.url} target="_blank" rel="noreferrer">
                      {item.label}
                    </a>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};
