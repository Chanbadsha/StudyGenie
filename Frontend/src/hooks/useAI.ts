import toast from 'react-hot-toast';
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
      toast.success('Notes generated!');
      await queryClient.invalidateQueries({ queryKey: AI_HISTORY_QUERY_KEY });
    },
    onError: () => {
      toast.error('Could not generate notes. Please try again.');
    },
  });
}

export function useDeleteAIHistory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => aiService.deleteHistory(id),
    onSuccess: async () => {
      toast.success('History entry deleted.');
      await queryClient.invalidateQueries({ queryKey: AI_HISTORY_QUERY_KEY });
    },
    onError: () => {
      toast.error('Could not delete history entry. Please try again.');
    },
  });
}
