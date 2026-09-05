'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Trash2, Plus, History, MessageSquare, ChevronRight, Check } from 'lucide-react';
import { useChatStore } from '@/store/useChatStore';
import { ChatMessageItem } from './ChatMessageItem';
import { PromptChips } from './PromptChips';

export const ChatDrawer: React.FC = () => {
  const {
    sessions,
    currentSessionId,
    isDrawerOpen,
    isSessionListOpen,
    isStreaming,
    activePrompt,
    closeDrawer,
    toggleSessionList,
    setActivePrompt,
    getCurrentSession,
    createNewSession,
    selectSession,
    deleteSession,
    clearCurrentSession,
    addUserMessage,
    startModelMessage,
    appendStreamChunk,
    finishStreaming,
  } = useChatStore();

  const [inputVal, setInputVal] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentSession = getCurrentSession();
  const messages = isMounted ? (currentSession?.messages || []) : [];
  const sessionTitle = isMounted ? (currentSession?.title || 'Phiên hỏi đáp') : 'Phiên hỏi đáp mới';

  // Auto-scroll when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isMounted) {
      scrollToBottom();
    }
  }, [messages, isStreaming, isMounted]);

  // When activePrompt changes from outside (e.g. clicking banner button)
  useEffect(() => {
    if (activePrompt) {
      handleSendMessage(activePrompt);
      setActivePrompt('');
    }
  }, [activePrompt]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isStreaming) return;

    setInputVal('');
    addUserMessage(trimmed);

    const modelMsgId = startModelMessage();

    try {
      // Prepare history
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Request failed' }));
        appendStreamChunk(modelMsgId, `⚠️ **Lỗi**: ${errorData.error || 'Không thể kết nối đến AI'}`);
        finishStreaming(modelMsgId);
        return;
      }

      if (!res.body) {
        finishStreaming(modelMsgId);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split(/\r?\n/);
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (trimmedLine.startsWith('data: ')) {
            const dataStr = trimmedLine.slice(6).trim();
            if (dataStr === '[DONE]') {
              continue;
            }
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) {
                appendStreamChunk(modelMsgId, parsed.text);
              } else if (parsed.error) {
                appendStreamChunk(modelMsgId, `\n\n⚠️ ${parsed.error}`);
              }
            } catch {
              // Incomplete or non-JSON chunk
            }
          }
        }
      }

      finishStreaming(modelMsgId);
    } catch (err: unknown) {
      console.error('Chat error:', err);
      const errMsg = err instanceof Error ? err.message : 'Unknown error';
      appendStreamChunk(modelMsgId, `\n\n⚠️ **Lỗi kết nối**: ${errMsg}`);
      finishStreaming(modelMsgId);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputVal);
  };

  const formatSessionTime = (timestamp: number) => {
    const d = new Date(timestamp);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    return isToday
      ? d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      : d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`chat-drawer-backdrop ${isDrawerOpen ? 'open' : ''}`}
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <div className={`chat-drawer ${isDrawerOpen ? 'open' : ''}`}>
        {/* Header */}
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
              onClick={createNewSession}
              title="Tạo phiên hỏi đáp mới"
            >
              <Plus size={16} />
              <span className="btn-text-sm">Mới</span>
            </button>

            <button 
              type="button" 
              className={`chat-header-action-btn ${isSessionListOpen ? 'active' : ''}`}
              onClick={toggleSessionList}
              title="Danh sách phiên hội thoại"
            >
              <History size={16} />
              <span className="session-badge" suppressHydrationWarning>{isMounted ? sessions.length : 1}</span>
            </button>

            <button 
              type="button" 
              className="chat-header-icon-btn" 
              onClick={clearCurrentSession}
              title="Xóa nội dung phiên này"
            >
              <Trash2 size={16} />
            </button>

            <button 
              type="button" 
              className="chat-header-icon-btn" 
              onClick={closeDrawer}
              title="Đóng"
            >
              <X size={19} />
            </button>
          </div>
        </div>

        {/* Session History Overlay Panel */}
        {isSessionListOpen && (
          <div className="session-history-panel">
            <div className="session-panel-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.92rem' }}>
                <History size={17} color="#005baa" />
                <span>Lịch Sử Phiên Hỏi Đáp</span>
              </div>
              <button 
                type="button" 
                className="session-panel-new-btn"
                onClick={createNewSession}
              >
                <Plus size={14} />
                <span>Phiên mới</span>
              </button>
            </div>

            <div className="session-list-scroll">
              {sessions.map((sess) => {
                const isActive = sess.id === currentSessionId;
                const messageCount = sess.messages.filter((m) => m.role === 'user').length;

                return (
                  <div 
                    key={sess.id}
                    className={`session-list-item ${isActive ? 'active' : ''}`}
                    onClick={() => selectSession(sess.id)}
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
                          deleteSession(sess.id);
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
        )}

        {/* Message List */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <ChatMessageItem key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Prompt Chips */}
        <PromptChips 
          onSelectPrompt={handleSendMessage} 
          disabled={isStreaming} 
        />

        {/* Input Bar */}
        <div className="chat-input-container">
          <form className="chat-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="chat-input"
              placeholder="Hỏi về quy chế, địa chỉ phòng ban, chuẩn ngoại ngữ..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              disabled={isStreaming}
            />
            <button 
              type="submit" 
              className="chat-send-btn" 
              disabled={!inputVal.trim() || isStreaming}
              title="Gửi câu hỏi"
            >
              <Send size={16} />
            </button>
          </form>
          <div className="chat-bottom-disclaimer">
            UIT AI có thể mắc sai sót. Vui lòng kiểm tra lại thông tin quan trọng tại <a href="https://www.uit.edu.vn" target="_blank" rel="noreferrer">uit.edu.vn</a>
          </div>
        </div>
      </div>
    </>
  );
};
