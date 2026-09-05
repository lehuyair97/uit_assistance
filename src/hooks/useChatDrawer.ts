'use client';

import { useState, useRef, useEffect } from 'react';
import { useChatStore } from '@/store/useChatStore';

export function useChatDrawer() {
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
      const history = (currentSession?.messages || [])
        .filter((m) => m.role === 'user' || m.role === 'model')
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      if (!res.body) {
        throw new Error('Response body is null');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (trimmedLine.startsWith('data:')) {
            const dataStr = trimmedLine.replace(/^data:\s*/, '');
            if (dataStr === '[DONE]') {
              finishStreaming(modelMsgId);
              return;
            }
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) {
                appendStreamChunk(modelMsgId, parsed.text);
              }
            } catch {
              // ignore json parse errors in stream
            }
          }
        }
      }

      finishStreaming(modelMsgId);
    } catch (err: unknown) {
      console.error('Chat stream error:', err);
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      appendStreamChunk(modelMsgId, `\n\n⚠️ *Lỗi kết nối: ${errorMsg}. Vui lòng thử lại sau.*`);
      finishStreaming(modelMsgId);
    }
  };

  return {
    isDrawerOpen,
    isSessionListOpen,
    isMounted,
    isStreaming,
    sessions,
    currentSessionId,
    sessionTitle,
    messages,
    inputVal,
    setInputVal,
    messagesEndRef,
    closeDrawer,
    toggleSessionList,
    createNewSession,
    clearCurrentSession,
    selectSession,
    deleteSession,
    handleSendMessage,
  };
}
