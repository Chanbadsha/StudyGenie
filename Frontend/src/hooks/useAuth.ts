'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService, type BetterAuthSession } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string | undefined;
  role: 'student' | 'admin';
  createdAt: string;
  updatedAt: string;
}

function mapSessionToUser(session: BetterAuthSession): AuthUser | null {
  if (!session.user) return null;
  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    avatar: session.user.image,
    role: 'student',
    createdAt: session.user.createdAt,
    updatedAt: session.user.updatedAt,
  };
}

export function useSession() {
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const session = await authService.getSession();
      return mapSessionToUser(session);
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      authService.login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      router.push(ROUTES.dashboard);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: { name: string; email: string; password: string }) =>
      authService.register(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      router.push(ROUTES.dashboard);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
      router.push(ROUTES.home);
    },
  });
}
