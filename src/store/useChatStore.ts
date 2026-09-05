import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ChatMessage, ChatSession } from '@/types/chat';

interface ChatStore {
  sessions: ChatSession[];
  currentSessionId: string;
  isDrawerOpen: boolean;
  isSessionListOpen: boolean;
  isStreaming: boolean;
  activePrompt: string;
  
  // Actions
  toggleDrawer: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleSessionList: () => void;
  setActivePrompt: (prompt: string) => void;
  
  // Session Actions
  getCurrentSession: () => ChatSession;
  createNewSession: () => string;
  selectSession: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
  renameSession: (sessionId: string, newTitle: string) => void;
  clearCurrentSession: () => void;
  
  // Message Actions
  addUserMessage: (content: string) => void;
  startModelMessage: () => string; // returns temp id
  appendStreamChunk: (id: string, chunk: string) => void;
  finishStreaming: (id: string) => void;
}

const DEFAULT_WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome-msg',
  role: 'model',
  content: `Xin chào! Tôi là **UIT AI Assistant** 🤖. 

Tôi có thể hỗ trợ bạn tra cứu các thông tin về:
- 🏅 **Các chương trình đào tạo đạt chuẩn kiểm định quốc tế ASIIN**
- 📖 **Quy chế học vụ, điều kiện tốt nghiệp & thang điểm UIT**
- 🎯 **Thông tin tuyển sinh, học bổng & học phí**
- 🏫 **Hệ thống phòng ban & cổng thông tin sinh viên UIT**

Bạn cần hỗ trợ điều gì hôm nay?`,
  timestamp: Date.now(),
};

const createInitialSession = (id = `session-${Date.now()}`): ChatSession => ({
  id,
  title: 'Phiên hỏi đáp mới',
  messages: [{ ...DEFAULT_WELCOME_MESSAGE }],
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => {
      const defaultInitial = createInitialSession('default-session');

      return {
        sessions: [defaultInitial],
        currentSessionId: 'default-session',
        isDrawerOpen: false,
        isSessionListOpen: false,
        isStreaming: false,
        activePrompt: '',

        toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
        openDrawer: () => set({ isDrawerOpen: true }),
        closeDrawer: () => set({ isDrawerOpen: false }),
        toggleSessionList: () => set((state) => ({ isSessionListOpen: !state.isSessionListOpen })),
        setActivePrompt: (prompt) => set({ activePrompt: prompt }),

        getCurrentSession: () => {
          const state = get();
          const found = state.sessions.find((s) => s.id === state.currentSessionId);
          return found || state.sessions[0] || defaultInitial;
        },

        createNewSession: () => {
          const newSession = createInitialSession();
          set((state) => ({
            sessions: [newSession, ...state.sessions],
            currentSessionId: newSession.id,
            isSessionListOpen: false,
            isStreaming: false,
          }));
          return newSession.id;
        },

        selectSession: (sessionId: string) => {
          set({
            currentSessionId: sessionId,
            isSessionListOpen: false,
            isStreaming: false,
          });
        },

        deleteSession: (sessionId: string) => {
          set((state) => {
            const remaining = state.sessions.filter((s) => s.id !== sessionId);
            const nextSessions = remaining.length > 0 ? remaining : [createInitialSession()];
            const nextActiveId = state.currentSessionId === sessionId ? nextSessions[0].id : state.currentSessionId;
            return {
              sessions: nextSessions,
              currentSessionId: nextActiveId,
            };
          });
        },

        renameSession: (sessionId: string, newTitle: string) => {
          set((state) => ({
            sessions: state.sessions.map((s) =>
              s.id === sessionId ? { ...s, title: newTitle.trim() || 'Phiên hỏi đáp', updatedAt: Date.now() } : s
            ),
          }));
        },

        clearCurrentSession: () => {
          const { currentSessionId } = get();
          set((state) => ({
            sessions: state.sessions.map((s) =>
              s.id === currentSessionId
                ? { ...s, messages: [{ ...DEFAULT_WELCOME_MESSAGE, timestamp: Date.now() }], updatedAt: Date.now() }
                : s
            ),
            isStreaming: false,
          }));
        },

        addUserMessage: (content: string) => {
          const { currentSessionId, sessions } = get();
          const userMsg: ChatMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            content,
            timestamp: Date.now(),
          };

          set((state) => {
            const current = state.sessions.find((s) => s.id === currentSessionId);
            // Tự động đặt tên tiêu đề phiên dựa trên câu hỏi đầu tiên nếu còn là tiêu đề mặc định
            const isDefaultTitle = !current || current.title === 'Phiên hỏi đáp mới' || current.messages.length <= 1;
            const newTitle = isDefaultTitle 
              ? (content.length > 28 ? content.slice(0, 28) + '...' : content)
              : current?.title || 'Phiên hỏi đáp';

            return {
              isStreaming: true,
              sessions: state.sessions.map((s) =>
                s.id === currentSessionId
                  ? {
                      ...s,
                      title: newTitle,
                      messages: [...s.messages, userMsg],
                      updatedAt: Date.now(),
                    }
                  : s
              ),
            };
          });
        },

        startModelMessage: () => {
          const { currentSessionId } = get();
          const modelId = `model-${Date.now()}`;
          const modelMsg: ChatMessage = {
            id: modelId,
            role: 'model',
            content: '',
            timestamp: Date.now(),
            isStreaming: true,
          };

          set((state) => ({
            isStreaming: true,
            sessions: state.sessions.map((s) =>
              s.id === currentSessionId
                ? {
                    ...s,
                    messages: [...s.messages, modelMsg],
                    updatedAt: Date.now(),
                  }
                : s
            ),
          }));
          return modelId;
        },

        appendStreamChunk: (id: string, chunk: string) => {
          const { currentSessionId } = get();
          set((state) => ({
            sessions: state.sessions.map((s) =>
              s.id === currentSessionId
                ? {
                    ...s,
                    messages: s.messages.map((m) =>
                      m.id === id ? { ...m, content: m.content + chunk } : m
                    ),
                  }
                : s
            ),
          }));
        },

        finishStreaming: (id: string) => {
          const { currentSessionId } = get();
          set((state) => ({
            isStreaming: false,
            sessions: state.sessions.map((s) =>
              s.id === currentSessionId
                ? {
                    ...s,
                    updatedAt: Date.now(),
                    messages: s.messages.map((m) =>
                      m.id === id ? { ...m, isStreaming: false } : m
                    ),
                  }
                : s
            ),
          }));
        },
      };
    },
    {
      name: 'uit_chat_sessions_storage_v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        sessions: state.sessions,
        currentSessionId: state.currentSessionId,
      }),
    }
  )
);
