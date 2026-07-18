import api from './api';

export interface MaterialQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  subject?: string;
  difficulty?: string;
  sort?: string;
}

export const materialService = {
  async getAll(params?: MaterialQueryParams) {
    const response = await api.get('/materials', { params });
    return response.data.data;
  },

  async getById(id: string) {
    const response = await api.get(`/materials/${id}`);
    return response.data.data;
  },

  async create(data: {
    title: string;
    subject: string;
    difficulty: string;
    shortDescription: string;
    content: string;
    coverImage?: string;
  }) {
    const response = await api.post('/materials', data);
    return response.data.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/materials/${id}`);
    return response.data;
  },
};
