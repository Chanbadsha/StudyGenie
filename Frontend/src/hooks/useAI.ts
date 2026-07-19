import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { aiService } from '@/services/ai.service';
import type { GenerateNotesInput } from '@/types/ai';

export const AI_HISTORY_QUERY_KEY = ['ai-history'] as const;

export function useAIHistory(enabled = true) {
  return useQuery({
    queryKey: AI_HISTORY_QUERY_KEY,
    queryFn: () => aiService.getHistory(),
    enabled,
    staleTime: 30 * 1000,
  });
}

export function useAINotes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GenerateNotesInput) => aiService.generateNotes(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: AI_HISTORY_QUERY_KEY });
    },
  });
}

export function useDeleteAIHistory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => aiService.deleteHistory(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: AI_HISTORY_QUERY_KEY });
    },
  });
}
