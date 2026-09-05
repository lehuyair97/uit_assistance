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

  return (
    <div className={`chat-bubble-container ${isUser ? 'user' : 'model'}`}>
      <div className={`chat-avatar ${isUser ? 'user' : 'model'}`}>
        {isUser ? <User size={18} /> : <Bot size={18} />}
      </div>

      <div className={`chat-bubble ${isUser ? 'user' : 'model'}`}>
        <MarkdownRenderer content={message.content} />
        {message.isStreaming && <span className="typing-cursor" />}
      </div>
    </div>
  );
};
