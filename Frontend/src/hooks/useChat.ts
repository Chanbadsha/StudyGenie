import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { chatService } from '@/services/chat.service';
import type { SendMessageInput } from '@/types/chat';

export const CHAT_SESSIONS_KEY = ['chat-sessions'] as const;

export function useChatSessions(enabled = true) {
  return useQuery({
    queryKey: CHAT_SESSIONS_KEY,
    queryFn: () => chatService.getSessions(),
    enabled,
    staleTime: 30 * 1000,
  });
}

export function useChatSession(sessionId: string | null, enabled = true) {
  return useQuery({
    queryKey: ['chat-session', sessionId],
    queryFn: () => chatService.getSession(sessionId!),
    enabled: enabled && !!sessionId,
    staleTime: 10 * 1000,
  });
}

export function useCreateSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const session = await chatService.createSession();
      return session;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CHAT_SESSIONS_KEY });
    },
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SendMessageInput) => chatService.sendMessage(data),
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['chat-session', variables.sessionId] }),
        queryClient.invalidateQueries({ queryKey: CHAT_SESSIONS_KEY }),
      ]);
    },
  });
}

export function useDeleteSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => chatService.deleteSession(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: CHAT_SESSIONS_KEY });
    },
  });
}
