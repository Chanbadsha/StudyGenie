export interface ChatSession {
  id: string;
  userId: string;
  title: string;
  lastMessageAt: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}
