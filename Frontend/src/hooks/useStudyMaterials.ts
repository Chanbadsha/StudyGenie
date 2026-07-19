import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { materialService } from '@/services/material.service';
import type { MaterialQueryParams } from '@/services/material.service';
import type { CreateMaterialInput } from '@/types/study-material';

export function useStudyMaterials(params: MaterialQueryParams, enabled = true) {
  return useQuery({
    queryKey: ['materials', params],
    queryFn: () => materialService.getAll(params),
    enabled,
  });
}

export function useMyMaterials(params: MaterialQueryParams, enabled = true) {
  return useQuery({
    queryKey: ['my-materials', params],
    queryFn: () => materialService.getMine(params),
    enabled,
  });
}

export function useCreateMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMaterialInput) => materialService.create(data),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['materials'] }),
        queryClient.invalidateQueries({ queryKey: ['my-materials'] }),
      ]);
    },
  });
}

export function useDeleteMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => materialService.delete(id),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['materials'] }),
        queryClient.invalidateQueries({ queryKey: ['my-materials'] }),
      ]);
    },
  });
}
