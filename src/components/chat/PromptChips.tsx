'use client';

import React from 'react';

interface PromptChipsProps {
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
}

const DEFAULT_PROMPTS = [
  '🏅 Các ngành đạt chuẩn ASIIN?',
  '🎓 Điều kiện tốt nghiệp UIT là gì?',
  '💰 Chính sách học bổng & học phí?',
  '📝 Quy chế tính điểm GPA & ĐRL?',
  '🏛️ Danh sách các Khoa tại UIT?',
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
