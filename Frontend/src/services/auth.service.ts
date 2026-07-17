import api from './api';

export const authService = {
  async register(data: { name: string; email: string; password: string }) {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  async login(data: { email: string; password: string }) {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  async googleLogin() {
    const response = await api.post('/auth/google');
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  async logout() {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};
