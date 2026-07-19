import api from './api';
import type { AIGeneration, GenerateNotesInput } from '@/types/ai';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface AIHistoryData {
  generations: AIGeneration[];
}

export const aiService = {
  async generateNotes(data: GenerateNotesInput): Promise<AIGeneration> {
    const response = await api.post<ApiResponse<AIGeneration>>('/ai/notes', data);
    return response.data.data;
  },

  async getHistory(): Promise<AIGeneration[]> {
    const response = await api.get<ApiResponse<AIHistoryData | AIGeneration[]>>('/ai/history');
    const data = response.data.data;
    return Array.isArray(data) ? data : data.generations;
  },

  async deleteHistory(id: string): Promise<void> {
    await api.delete<ApiResponse<undefined>>(`/ai/history/${id}`);
  },
};
