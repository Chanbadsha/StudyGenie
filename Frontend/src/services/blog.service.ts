import api from './api';
import type { BlogListData, BlogPost } from '@/types/blog';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const blogService = {
  async getAll(category?: string): Promise<BlogListData> {
    const params = category ? { category } : {};
    const response = await api.get<ApiResponse<BlogListData>>('/blog', { params });
    return response.data.data;
  },

  async getBySlug(slug: string): Promise<BlogPost> {
    const response = await api.get<ApiResponse<BlogPost>>(`/blog/${slug}`);
    return response.data.data;
  },
};
