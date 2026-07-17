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

  async googleLogin(): Promise<void> {
    const callbackURL = `${window.location.origin}/dashboard`;
    const response = await api.post('/auth/sign-in/social', {
      provider: 'google',
      callbackURL,
      errorCallbackURL: `${window.location.origin}/login`,
    });
    if (response.data.url) {
      window.location.href = response.data.url;
    }
  },

  async getSession(): Promise<BetterAuthSession | null> {
    const response = await api.get('/auth/get-session');
    return response.data ?? null;
  },

  async logout() {
    const response = await api.post('/auth/sign-out');
    return response.data;
  },
};

export type { BetterAuthSession };

