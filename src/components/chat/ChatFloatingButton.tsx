'use client';

import React, { useState } from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { useChatStore } from '@/store/useChatStore';

export const ChatFloatingButton: React.FC = () => {
  const { toggleDrawer, isDrawerOpen } = useChatStore();
  const [showTooltip, setShowTooltip] = useState(true);

  if (isDrawerOpen) return null;

  return (
    <div className="ai-floating-container">
      {showTooltip && (
        <div className="ai-floating-tooltip">
          <Sparkles size={14} color="#fde047" />
          <span>Hỏi Trợ lý AI UIT</span>
        </div>
      )}

      <button
        type="button"
        className="ai-floating-btn"
        onClick={toggleDrawer}
        aria-label="Mở Trợ lý ảo AI UIT"
        onMouseEnter={() => setShowTooltip(true)}
      >
        <div className="ai-floating-pulse" />
        <Bot size={28} />
        <span className="ai-floating-badge">AI</span>
      </button>
    </div>
  );
};
