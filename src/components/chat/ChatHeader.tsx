'use client';

import React from 'react';
import { Bot, Plus, History, Trash2, X } from 'lucide-react';

interface ChatHeaderProps {
  sessionTitle: string;
  isMounted: boolean;
  sessionsCount: number;
  isSessionListOpen: boolean;
  onCreateNewSession: () => void;
  onToggleSessionList: () => void;
  onClearCurrentSession: () => void;
  onCloseDrawer: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  sessionTitle,
  isMounted,
  sessionsCount,
  isSessionListOpen,
  onCreateNewSession,
  onToggleSessionList,
  onClearCurrentSession,
  onCloseDrawer,
}) => {
  return (
    <div className="chat-header">
      <div className="chat-header-info">
        <div className="chat-header-icon">
          <Bot size={22} />
        </div>
        <div>
          <div className="chat-header-title">UIT AI Assistant</div>
          <div className="chat-header-status">
            <span className="status-dot" />
            <span className="session-current-title" title={sessionTitle} suppressHydrationWarning>
              {sessionTitle}
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        <button 
          type="button" 
          className="chat-header-action-btn"
          onClick={onCreateNewSession}
          title="Tạo phiên hỏi đáp mới"
        >
          <Plus size={16} />
          <span className="btn-text-sm">Mới</span>
        </button>

        <button 
          type="button" 
          className={`chat-header-action-btn ${isSessionListOpen ? 'active' : ''}`}
          onClick={onToggleSessionList}
          title="Danh sách phiên hội thoại"
        >
          <History size={16} />
          <span className="session-badge" suppressHydrationWarning>
            {isMounted ? sessionsCount : 1}
          </span>
        </button>

        <button 
          type="button" 
          className="chat-header-icon-btn" 
          onClick={onClearCurrentSession}
          title="Xóa nội dung phiên này"
        >
          <Trash2 size={16} />
        </button>

        <button 
          type="button" 
          className="chat-header-icon-btn" 
          onClick={onCloseDrawer}
          title="Đóng"
        >
          <X size={19} />
        </button>
      </div>
    </div>
  );
};
