import api from './api';
import type { CreateMaterialInput, StudyMaterial } from '@/types/study-material';

export interface MaterialQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  subject?: string;
  difficulty?: string;
  sort?: string;
}

export interface MaterialPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface MaterialsResponse {
  materials: StudyMaterial[];
  pagination: MaterialPagination;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const materialService = {
  async getAll(params?: MaterialQueryParams): Promise<MaterialsResponse> {
    const response = await api.get<ApiResponse<MaterialsResponse>>('/materials', { params });
    return response.data.data;
  },

  async getMine(params?: MaterialQueryParams): Promise<MaterialsResponse> {
    const response = await api.get<ApiResponse<MaterialsResponse>>('/materials/mine', { params });
    return response.data.data;
  },

  async getById(id: string): Promise<StudyMaterial> {
    const response = await api.get<ApiResponse<StudyMaterial>>(`/materials/${id}`);
    return response.data.data;
  },

  async create(data: CreateMaterialInput): Promise<StudyMaterial> {
    const response = await api.post<ApiResponse<StudyMaterial>>('/materials', data);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete<ApiResponse<undefined>>(`/materials/${id}`);
  },
};
