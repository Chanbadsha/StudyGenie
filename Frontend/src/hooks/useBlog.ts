import { useQuery } from '@tanstack/react-query';
import { blogService } from '@/services/blog.service';

export const BLOG_QUERY_KEY = ['blog-posts'] as const;

export function useBlogPosts() {
  return useQuery({
    queryKey: BLOG_QUERY_KEY,
    queryFn: () => blogService.getAll(),
    staleTime: 60 * 1000,
  });
}
