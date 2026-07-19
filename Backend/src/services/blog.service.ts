import { BlogPost, type IBlogPost } from '../models/blog.model';
import type { BlogQueryInput } from '../validators/blog.validator';

export interface BlogPostResponse {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
}

function serialize(post: IBlogPost): BlogPostResponse {
  return {
    id: String(post._id),
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    author: post.author,
    category: post.category,
    ...(post.coverImage ? { coverImage: post.coverImage } : {}),
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };
}

export async function getPublishedPosts(input: BlogQueryInput): Promise<BlogPostResponse[]> {
  const filter: Record<string, unknown> = { published: true };

  if (input.category) {
    filter.category = input.category;
  }

  const posts = await BlogPost.find(filter)
    .select('slug title excerpt author category coverImage createdAt updatedAt')
    .sort({ createdAt: -1 });

  return posts.map(serialize);
}

export async function getPostBySlug(slug: string): Promise<BlogPostResponse | null> {
  const post = await BlogPost.findOne({ slug, published: true });

  if (!post) return null;

  return serialize(post);
}

export async function getCategories(): Promise<string[]> {
  const categories = await BlogPost.distinct('category', { published: true });
  return categories.sort();
}
