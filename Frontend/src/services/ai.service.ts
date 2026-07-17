import api from './api';

export const aiService = {
  async generateNotes(data: {
    topic: string;
    subject: string;
    difficulty: string;
    learningGoal: string;
    outputLength: string;
  }) {
    const response = await api.post('/ai/notes', data);
    return response.data;
  },

  async getHistory() {
    const response = await api.get('/ai/history');
    return response.data;
  },

  async deleteHistory(id: string) {
    const response = await api.delete(`/ai/history/${id}`);
    return response.data;
  },
};
