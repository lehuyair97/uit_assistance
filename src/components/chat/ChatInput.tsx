'use client';

import React from 'react';
import { Send } from 'lucide-react';
import { PromptChips } from './PromptChips';

interface ChatInputProps {
  inputVal: string;
  setInputVal: (val: string) => void;
  isStreaming: boolean;
  onSendMessage: (text: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  inputVal,
  setInputVal,
  isStreaming,
  onSendMessage,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isStreaming) return;
    onSendMessage(inputVal);
    setInputVal('');
  };

  return (
    <>
      {/* Prompt Chips */}
      <PromptChips 
        onSelectPrompt={onSendMessage} 
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
          UIT AI có thể mắc sai sót. Vui lòng kiểm tra lại thông tin quan trọng tại{' '}
          <a href="https://www.uit.edu.vn" target="_blank" rel="noreferrer">
            uit.edu.vn
          </a>
        </div>
      </div>
    </>
  );
};
