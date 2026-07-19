import toast from 'react-hot-toast';
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
      toast.success('Material created!');
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['materials'] }),
        queryClient.invalidateQueries({ queryKey: ['my-materials'] }),
      ]);
    },
    onError: () => {
      toast.error('Could not create this material. Please try again.');
    },
  });
}

export function useDeleteMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => materialService.delete(id),
    onSuccess: async () => {
      toast.success('Material deleted!');
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['materials'] }),
        queryClient.invalidateQueries({ queryKey: ['my-materials'] }),
      ]);
    },
    onError: () => {
      toast.error('Could not delete this material. Please try again.');
    },
  });
}
