export interface ChatSession {
  id: string;
  title: string;
  lastMessageAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface ChatSessionDetail {
  session: ChatSession;
  messages: ChatMessage[];
}

export interface SendMessageResponse {
  reply: string;
  message: ChatMessage;
}

export interface CreateSessionInput {
  title?: string;
}

export interface SendMessageInput {
  sessionId: string;
  message: string;
}
