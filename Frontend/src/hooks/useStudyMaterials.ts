import { useQuery } from '@tanstack/react-query';
import { materialService } from '@/services/material.service';
import type { MaterialQueryParams } from '@/services/material.service';
import type { StudyMaterial } from '@/types/study-material';

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface MaterialsResponse {
  materials: StudyMaterial[];
  pagination: PaginationInfo;
}

export function useStudyMaterials(params: MaterialQueryParams) {
  return useQuery<MaterialsResponse>({
    queryKey: ['materials', params],
    queryFn: async () => {
      const response = await materialService.getAll(params);
      return response.data;
    },
  });
}
