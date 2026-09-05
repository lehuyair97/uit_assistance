'use client';

import React from 'react';
import { User, Bot } from 'lucide-react';
import { ChatMessage } from '@/types/chat';
import { MarkdownRenderer } from './MarkdownRenderer';

interface ChatMessageItemProps {
  message: ChatMessage;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isWaitingResponse = !isUser && message.isStreaming && !message.content.trim();

  return (
    <div className={`chat-bubble-container ${isUser ? 'user' : 'model'}`}>
      <div className={`chat-avatar ${isUser ? 'user' : 'model'}`}>
        {isUser ? <User size={18} /> : <Bot size={18} />}
      </div>

      <div className={`chat-bubble ${isUser ? 'user' : 'model'}`}>
        {isWaitingResponse ? (
          <div className="typing-indicator-dots" aria-label="Đang xử lý câu trả lời...">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        ) : (
          <>
            <MarkdownRenderer content={message.content} />
            {message.isStreaming && <span className="typing-cursor" />}
          </>
        )}
      </div>
    </div>
  );
};
