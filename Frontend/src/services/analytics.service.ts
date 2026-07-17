import api from './api';

export const analyticsService = {
  async getDashboard() {
    const response = await api.get('/analytics/dashboard');
    return response.data;
  },

  async getCharts() {
    const response = await api.get('/analytics/charts');
    return response.data;
  },
};
