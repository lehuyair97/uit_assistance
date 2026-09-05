export type Role = 'user' | 'model' | 'system';

export interface Citation {
  title: string;
  source: string;
  page?: number | string;
  url?: string;
}

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
  citations?: Citation[];
  isStreaming?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}
