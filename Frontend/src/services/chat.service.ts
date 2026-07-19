import api from './api';
import type { ChatSession, ChatSessionDetail, SendMessageResponse, SendMessageInput, CreateSessionInput } from '@/types/chat';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface SessionsData {
  sessions: ChatSession[];
}

export const chatService = {
  async getSessions(): Promise<ChatSession[]> {
    const response = await api.get<ApiResponse<SessionsData>>('/chat/sessions');
    return response.data.data.sessions;
  },

  async getSession(id: string): Promise<ChatSessionDetail> {
    const response = await api.get<ApiResponse<ChatSessionDetail>>(`/chat/sessions/${id}`);
    return response.data.data;
  },

  async createSession(input?: CreateSessionInput): Promise<ChatSession> {
    const response = await api.post<ApiResponse<ChatSession>>('/chat/sessions', input ?? {});
    return response.data.data;
  },

  async sendMessage(data: SendMessageInput): Promise<SendMessageResponse> {
    const response = await api.post<ApiResponse<SendMessageResponse>>('/chat/messages', data);
    return response.data.data;
  },

  async deleteSession(id: string): Promise<void> {
    await api.delete<ApiResponse<undefined>>(`/chat/sessions/${id}`);
  },
};
