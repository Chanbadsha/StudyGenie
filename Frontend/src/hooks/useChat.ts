import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { chatService } from '@/services/chat.service';
import type { SendMessageInput, ChatSessionDetail, ChatMessage } from '@/types/chat';

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
      toast.success('Chat session created!');
      await queryClient.invalidateQueries({ queryKey: CHAT_SESSIONS_KEY });
    },
    onError: () => {
      toast.error('Could not create a new chat. Please try again.');
    },
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SendMessageInput) => chatService.sendMessage(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ['chat-session', data.sessionId] });
      const previous = queryClient.getQueryData<ChatSessionDetail>(['chat-session', data.sessionId]);

      if (previous) {
        const tempMessage: ChatMessage = {
          id: `temp-${Date.now()}`,
          sessionId: data.sessionId,
          role: 'user',
          content: data.message,
          createdAt: new Date().toISOString(),
        };
        queryClient.setQueryData<ChatSessionDetail>(['chat-session', data.sessionId], {
          ...previous,
          messages: [...previous.messages, tempMessage],
        });
      }

      return { previous };
    },
    onError: (_error, variables, context) => {
      toast.error('Failed to send message. Please try again.');
      if (context?.previous) {
        queryClient.setQueryData(['chat-session', variables.sessionId], context.previous);
      }
    },
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
      toast.success('Session deleted.');
      await queryClient.invalidateQueries({ queryKey: CHAT_SESSIONS_KEY });
    },
    onError: () => {
      toast.error('Could not delete session. Please try again.');
    },
  });
}
