import { Role } from './chat';

export interface ChatHistoryItem {
  role: Role;
  content: string;
}

export interface ChatApiRequest {
  message: string;
  history?: ChatHistoryItem[];
  sessionId?: string;
}

export interface StreamChunkPayload {
  text?: string;
  error?: string;
  citations?: Array<{
    title: string;
    source: string;
    page?: number;
  }>;
}
