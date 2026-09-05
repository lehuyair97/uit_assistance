# 🎓 UIT Student Assistant (Trợ Lý Sinh Viên UIT)

Hệ thống AI Grounding & Tư vấn Trực tuyến dành cho sinh viên **Trường Đại học Công nghệ Thông tin - ĐHQG TP.HCM (UIT)**.  
Dự án được xây dựng trên nền tảng **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Zustand** và tích hợp mô hình ngôn ngữ lớn **Google Gemini AI (@google/genai)**.

---

## 📋 Yêu Cầu Hệ Thống (Prerequisites)

Trước khi khởi chạy, máy tính của bạn cần cài đặt:
- **Node.js**: Phiên bản `>= 20.x` (khuyến nghị Node 22.x)
- **Package Manager**: **`pnpm`** (khuyến nghị phiên bản `>= 9.x / 11.x`), hoặc `npm` / `yarn` / `bun`.

Kiểm tra phiên bản bằng terminal:
```bash
node -v
pnpm -v
```
*(Nếu chưa có pnpm, cài đặt bằng: `npm install -g pnpm`)*

---

## 🚀 Hướng Dẫn Cài Đặt & Mở Dự Án (Quick Start)

Thực hiện lần lượt 4 bước sau để khởi chạy ứng dụng trên máy:

### Bước 1: Di chuyển vào thư mục dự án
```bash
cd uit_assistance
```

### Bước 2: Cài đặt các gói phụ thuộc (Dependencies)
```bash
pnpm install
```
*(Nếu dùng npm: `npm install`)*

---

### Bước 3: Cấu hình biến môi trường (`.env.local`)

1. Copy file mẫu `.env.example` thành `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Mở file `.env.local` và điền **Gemini API Key** của bạn:
   ```env
   # Google Gemini API Key (Lấy tại: https://aistudio.google.com/app/apikey)
   GEMINI_API_KEY=AIzaSy...your_gemini_api_key_here
   GEMINI_MODEL=gemini-2.5-flash

   # Cấu hình ứng dụng
   NEXT_PUBLIC_APP_NAME="UIT Assistant"
   ```

> 💡 **Lưu ý:**
> - Bạn có thể lấy API Key Gemini hoàn toàn miễn phí tại [Google AI Studio](https://aistudio.google.com/).
> - Nếu chưa điền `GEMINI_API_KEY`, hệ thống vẫn có cơ chế Mock Service hỗ trợ trả lời cơ bản cho mục đích kiểm thử giao diện.

---

### Bước 4: Khởi chạy Development Server

Chạy lệnh:
```bash
pnpm dev
```
*(Hoặc `npm run dev`)*

Khi màn hình terminal hiển thị:
```text
  ▲ Next.js 16.x.x
  - Local:        http://localhost:3000
```

Truy cập vào trình duyệt web theo địa chỉ:  
👉 **[http://localhost:3000](http://localhost:3000)**

Nhấn vào biểu tượng **Chatbot UIT** ở góc phải màn hình để bắt đầu trò chuyện cùng Trợ lý AI!

---

## 🛠️ Danh Sách Lệnh CLI (Scripts)

| Lệnh CLI | Mô tả |
| :--- | :--- |
| `pnpm dev` | Chạy dev server tại `http://localhost:3000` (hỗ trợ Hot Reload) |
| `pnpm dev -p 3001` | Chạy dev server trên cổng khác (nếu port 3000 bị chiếm dụng) |
| `pnpm build` | Biên dịch tối ưu hóa mã nguồn cho môi trường Production |
| `pnpm start` | Khởi chạy server sau khi đã build production |
| `pnpm lint` | Quét kiểm tra lỗi cú pháp và format chuẩn Next.js / TypeScript |

---

## 📂 Cấu Trúc Mã Nguồn (Project Structure)

```text
uit_assistance/
├── src/
│   ├── app/                    # Next.js 16 App Router (Layouts, Pages, API Routes)
│   │   ├── api/chat/route.ts   # Backend API xử lý câu hỏi & Gemini Streaming
│   │   ├── layout.tsx          # Root Layout & Metadata
│   │   └── page.tsx            # Giao diện chính (Hero Slider, Portals, Chat Drawer)
│   ├── components/             # Reusable UI Components
│   │   ├── chat/               # Chat Drawer, Message Item, Markdown, Quick Chips
│   │   └── uit/                # TopHeader, MainNavbar, QuickPortals, Slider
│   ├── data/knowledge/         # Tri thức học vụ, quy chế, chuẩn đầu ra ASIIN, học bổng
│   ├── lib/gemini/             # Khởi tạo client Gemini & Prompts System
│   ├── services/ai/            # Gemini Service & Mock fallback
│   ├── store/useChatStore.ts   # Quản lý State trò chuyện toàn cục (Zustand)
│   └── styles/globals.css      # CSS tùy biến & thiết kế giao diện
├── .env.example                # Mẫu biến môi trường
├── package.json                # Danh sách thư viện & scripts
└── tsconfig.json               # Cấu hình TypeScript & Path Alias (@/*)
```

---

## ❓ Xử Lý Sự Cố Thường Gặp (Troubleshooting)

1. **Port 3000 bị chiếm dụng (`Port 3000 is in use`):**
   - Đổi sang port khác: `pnpm dev -p 3005`
   - Hoặc tắt tiến trình đang chiếm port 3000: `kill -9 $(lsof -ti:3000)`

2. **Lỗi `Module not found` hoặc lỗi package:**
   - Xóa `node_modules` và cài đặt lại:
     ```bash
     rm -rf node_modules pnpm-lock.yaml
     pnpm install
     ```

3. **Lỗi `Permission denied (publickey)` khi thao tác Git:**
   - Kiểm tra SSH Key cá nhân bằng `ssh -T git@github.com`. Đảm bảo Public Key trong `~/.ssh/id_ed25519.pub` đã được thêm vào [GitHub SSH Keys](https://github.com/settings/keys).
