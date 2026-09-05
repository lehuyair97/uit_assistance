'use client';

import React from 'react';

interface PromptChipsProps {
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
}

const DEFAULT_PROMPTS = [
  '🏢 Phòng Đào tạo, CTSV & KHTC ở đâu?',
  '🏛️ Liên hệ Văn phòng Khoa KHTT?',
  '🏅 Các ngành đạt chuẩn ASIIN?',
  '🎓 Điều kiện tốt nghiệp UIT là gì?',
  '💰 Chính sách học bổng & học phí?',
  '📝 Quy chế tính điểm GPA & ĐRL?',
];

export const PromptChips: React.FC<PromptChipsProps> = ({ onSelectPrompt, disabled }) => {
  return (
    <div className="prompt-chips-container">
      {DEFAULT_PROMPTS.map((prompt, index) => (
        <button
          key={index}
          type="button"
          className="prompt-chip"
          disabled={disabled}
          onClick={() => onSelectPrompt(prompt.replace(/^[^\s]+\s/, ''))} // remove emoji prefix when sending
        >
          {prompt}
        </button>
      ))}
    </div>
  );
};
