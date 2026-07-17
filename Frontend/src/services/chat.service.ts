import api from './api';

export const chatService = {
  async getSessions() {
    const response = await api.get('/chat/sessions');
    return response.data;
  },

  async getSession(id: string) {
    const response = await api.get(`/chat/sessions/${id}`);
    return response.data;
  },

  async createSession() {
    const response = await api.post('/chat/sessions');
    return response.data;
  },

  async sendMessage(data: { sessionId: string; message: string }) {
    const response = await api.post('/chat/messages', data);
    return response.data;
  },

  async deleteSession(id: string) {
    const response = await api.delete(`/chat/sessions/${id}`);
    return response.data;
  },
};
