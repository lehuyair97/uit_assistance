'use client';

import React from 'react';
import { History, Plus, MessageSquare, Trash2 } from 'lucide-react';
import { ChatSession } from '@/types/chat';

interface ChatSessionPanelProps {
  isOpen: boolean;
  isMounted: boolean;
  sessions: ChatSession[];
  currentSessionId: string;
  onSelectSession: (id: string) => void;
  onCreateNewSession: () => void;
  onDeleteSession: (id: string) => void;
}

export const ChatSessionPanel: React.FC<ChatSessionPanelProps> = ({
  isOpen,
  isMounted,
  sessions,
  currentSessionId,
  onSelectSession,
  onCreateNewSession,
  onDeleteSession,
}) => {
  if (!isOpen) return null;

  const formatSessionTime = (timestamp: number) => {
    const d = new Date(timestamp);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    return isToday
      ? d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      : d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
  };

  return (
    <div className="session-history-panel">
      <div className="session-panel-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.92rem' }}>
          <History size={17} color="#005baa" />
          <span>Lịch Sử Phiên Hỏi Đáp</span>
        </div>
        <button 
          type="button" 
          className="session-panel-new-btn"
          onClick={onCreateNewSession}
        >
          <Plus size={14} />
          <span>Phiên mới</span>
        </button>
      </div>

      <div className="session-list-scroll">
        {isMounted && sessions.map((sess) => {
          const isActive = sess.id === currentSessionId;
          const messageCount = sess.messages.filter((m) => m.role === 'user').length;

          return (
            <div 
              key={sess.id}
              className={`session-list-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectSession(sess.id)}
            >
              <div className="session-item-icon">
                <MessageSquare size={16} />
              </div>

              <div className="session-item-content">
                <div className="session-item-title">{sess.title}</div>
                <div className="session-item-meta">
                  <span>{formatSessionTime(sess.updatedAt)}</span>
                  <span>•</span>
                  <span>{messageCount} câu hỏi</span>
                </div>
              </div>

              {isActive && <span className="session-active-tag">Đang mở</span>}

              {sessions.length > 1 && (
                <button
                  type="button"
                  className="session-item-del-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSession(sess.id);
                  }}
                  title="Xóa phiên này"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
