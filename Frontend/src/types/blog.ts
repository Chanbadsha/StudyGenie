export interface BlogPost {
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

export interface BlogListData {
  posts: BlogPost[];
  categories: string[];
}
