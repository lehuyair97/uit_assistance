import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Trường Đại học Công nghệ Thông tin - ĐHQG-HCM | AI Assistant',
  description: 'Trường Đại học Công nghệ Thông tin (UIT - VNUHCM) - Các chương trình đào tạo đạt chuẩn kiểm định quốc tế ASIIN và Trợ lý ảo AI sinh viên.',
  icons: {
    icon: 'https://www.uit.edu.vn/media/favicon_1620ada787.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        {children}
      </body>
    </html>
  );
}
