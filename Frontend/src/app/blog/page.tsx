'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/container';
import { Heading, Text } from '@/components/ui/typography';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, Loader2, Newspaper } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/common/motion-wrapper';
import { formatDate } from '@/utils/format-date';
import { useBlogPosts } from '@/hooks/useBlog';

function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { data, isLoading, isError } = useBlogPosts();

  const allPosts = data?.posts ?? [];
  const posts = selectedCategory === 'All'
    ? allPosts
    : allPosts.filter((p) => p.category === selectedCategory);
  const categories = data?.categories ?? [];

  const allCategories = ['All', ...categories];

  return (
    <>
      <section className="border-b border-border bg-gradient-to-b from-background to-surface">
        <Container as="div" className="flex flex-col items-center py-16 text-center lg:py-24">
          <FadeIn className="flex flex-col items-center">
            <Heading level={1}>StudyGenie Blog</Heading>
            <Text size="base" className="mt-4 max-w-2xl text-center text-muted">
              Insights, tips, and updates from the StudyGenie team on AI-powered learning, study techniques, and more.
            </Text>
          </FadeIn>
        </Container>
      </section>

      <Container as="section" className="py-12 lg:py-16">
        <FadeIn y={16} className="mb-8 flex flex-wrap gap-2">
          {allCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'border-primary bg-primary text-white'
                  : 'border-border text-muted hover:border-primary hover:text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </FadeIn>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="size-8 animate-spin text-muted" />
          </div>
        ) : isError ? (
          <div className="py-16 text-center">
            <Text className="text-center text-muted">Failed to load blog posts. Please try again later.</Text>
          </div>
        ) : posts.length === 0 ? (
          <FadeIn className="flex flex-col items-center py-16 text-center">
            <div className="mb-4 inline-flex size-16 items-center justify-center rounded-2xl bg-primary/10">
              <Newspaper className="size-8 text-primary" />
            </div>
            <Heading level={2}>No blog posts yet</Heading>
            <Text size="base" className="mt-2 max-w-md text-center text-muted">
              {selectedCategory === 'All'
                ? 'Blog posts will appear here once published. Check back soon for new content!'
                : `No posts found in "${selectedCategory}". Try selecting a different category.`}
            </Text>
          </FadeIn>
        ) : (
          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <Card className="flex flex-col transition-shadow hover:shadow-medium">
                  <CardContent className="flex flex-1 flex-col gap-4 p-6">
                    <span className="inline-flex self-start rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">
                      {post.title}
                    </h3>
                    <p className="flex-1 text-sm leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between border-t border-border pt-4 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <User className="size-3.5" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3.5" />
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        <FadeIn className="mt-12 text-center">
          <Text size="sm" className="text-center text-muted">
            More articles coming soon. Stay tuned for updates!
          </Text>
        </FadeIn>
      </Container>
    </>
  );
}

export default BlogPage;
