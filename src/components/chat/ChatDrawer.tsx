'use client';

import React from 'react';
import { useChatDrawer } from '@/hooks/useChatDrawer';
import { ChatMessageItem } from './ChatMessageItem';
import { ChatHeader } from './ChatHeader';
import { ChatSessionPanel } from './ChatSessionPanel';
import { ChatInput } from './ChatInput';

export const ChatDrawer: React.FC = () => {
  const {
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
  } = useChatDrawer();

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`chat-drawer-backdrop ${isDrawerOpen ? 'open' : ''}`}
        onClick={closeDrawer}
      />

      {/* Drawer Container */}
      <div className={`chat-drawer ${isDrawerOpen ? 'open' : ''}`}>
        {/* Header Component */}
        <ChatHeader
          sessionTitle={sessionTitle}
          isMounted={isMounted}
          sessionsCount={sessions.length}
          isSessionListOpen={isSessionListOpen}
          onCreateNewSession={createNewSession}
          onToggleSessionList={toggleSessionList}
          onClearCurrentSession={clearCurrentSession}
          onCloseDrawer={closeDrawer}
        />

        {/* Session History Overlay Panel */}
        <ChatSessionPanel
          isOpen={isSessionListOpen}
          isMounted={isMounted}
          sessions={sessions}
          currentSessionId={currentSessionId}
          onSelectSession={selectSession}
          onCreateNewSession={createNewSession}
          onDeleteSession={deleteSession}
        />

        {/* Message List */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <ChatMessageItem key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar & Disclaimer Component */}
        <ChatInput
          inputVal={inputVal}
          setInputVal={setInputVal}
          isStreaming={isStreaming}
          onSendMessage={handleSendMessage}
        />
      </div>
    </>
  );
};
