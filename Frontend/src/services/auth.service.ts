import api from './api';
import { API_BASE_URL } from '@/constants/api';

export const AUTH_BASE = `${API_BASE_URL}/auth`;

interface BetterAuthSession {
  user: {
    id: string;
    email: string;
    name: string;
    image?: string;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
  session: {
    id: string;
    expiresAt: string;
  } | null;
}

export const authService = {
  async register(data: { name: string; email: string; password: string }) {
    const response = await api.post('/auth/sign-up/email', data);
    return response.data;
  },

  async login(data: { email: string; password: string }) {
    const response = await api.post('/auth/sign-in/email', data);
    return response.data;
  },

  googleLogin() {
    window.location.href = `${AUTH_BASE}/oauth2/authorize?provider=google&callbackURL=${encodeURIComponent(window.location.origin)}`;
  },

  async getSession(): Promise<BetterAuthSession> {
    const response = await api.get('/auth/session');
    return response.data;
  },

  async logout() {
    const response = await api.post('/auth/sign-out');
    return response.data;
  },
};

export type { BetterAuthSession };

