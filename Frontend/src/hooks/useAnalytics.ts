import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '@/services/analytics.service';

export const ANALYTICS_QUERY_KEY = ['analytics'] as const;

export function useDashboardStats(enabled = true) {
  return useQuery({
    queryKey: [...ANALYTICS_QUERY_KEY, 'dashboard'],
    queryFn: () => analyticsService.getDashboardStats(),
    enabled,
    staleTime: 30 * 1000,
  });
}

export function useSubjectDistribution(enabled = true) {
  return useQuery({
    queryKey: [...ANALYTICS_QUERY_KEY, 'subjects'],
    queryFn: () => analyticsService.getSubjectDistribution(),
    enabled,
    staleTime: 30 * 1000,
  });
}

export function useLearningProgress(enabled = true) {
  return useQuery({
    queryKey: [...ANALYTICS_QUERY_KEY, 'progress'],
    queryFn: () => analyticsService.getLearningProgress(),
    enabled,
    staleTime: 30 * 1000,
  });
}
