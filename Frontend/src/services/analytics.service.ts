import api from './api';
import type { DashboardStats, SubjectDistribution, LearningProgress } from '@/types/analytics';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const analyticsService = {
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await api.get<ApiResponse<DashboardStats>>('/analytics/dashboard');
    return response.data.data;
  },

  async getSubjectDistribution(): Promise<SubjectDistribution[]> {
    const response = await api.get<ApiResponse<SubjectDistribution[]>>('/analytics/subjects');
    return response.data.data;
  },

  async getLearningProgress(): Promise<LearningProgress> {
    const response = await api.get<ApiResponse<LearningProgress>>('/analytics/progress');
    return response.data.data;
  },
};
