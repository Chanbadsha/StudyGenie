'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/container';
import { Heading, Text } from '@/components/ui/typography';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User } from 'lucide-react';
import { formatDate } from '@/utils/format-date';

const BLOG_POSTS = [
  {
    slug: 'how-ai-transforms-studying',
    title: 'How AI is Transforming the Way Students Study',
    excerpt: 'Discover how artificial intelligence is revolutionizing education and helping students learn more effectively than ever before.',
    author: 'Alex Devlin',
    date: '2026-07-15',
    category: 'AI & Education',
  },
  {
    slug: 'effective-study-techniques',
    title: '10 Effective Study Techniques Backed by Science',
    excerpt: 'Learn about the most effective study methods recommended by cognitive science research and how to apply them.',
    author: 'Sarah Kim',
    date: '2026-07-10',
    category: 'Study Tips',
  },
  {
    slug: 'getting-started-ai-notes',
    title: 'Getting Started with AI-Powered Note Generation',
    excerpt: 'A step-by-step guide to using StudyGenie AI Notes Generator to create comprehensive study materials.',
    author: 'Marcus Johnson',
    date: '2026-07-05',
    category: 'Tutorials',
  },
  {
    slug: 'future-of-personalized-learning',
    title: 'The Future of Personalized Learning with AI Tutors',
    excerpt: 'Explore how AI tutors are creating personalized learning experiences and what this means for the future of education.',
    author: 'Emily Chen',
    date: '2026-06-28',
    category: 'AI & Education',
  },
  {
    slug: 'study-group-best-practices',
    title: 'Best Practices for Online Study Groups',
    excerpt: 'Tips and strategies for making the most of collaborative learning in the digital age.',
    author: 'Alex Devlin',
    date: '2026-06-20',
    category: 'Study Tips',
  },
  {
    slug: 'managing-exam-stress',
    title: 'Managing Exam Stress: A Student Guide',
    excerpt: 'Practical advice for staying calm and focused during exam season while maintaining a healthy study-life balance.',
    author: 'Sarah Kim',
    date: '2026-06-15',
    category: 'Student Life',
  },
];

const CATEGORIES = ['All', 'AI & Education', 'Study Tips', 'Tutorials', 'Student Life'];

function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = selectedCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  return (
    <>
      <section className="border-b border-border bg-gradient-to-b from-background to-surface">
        <Container as="div" className="flex flex-col items-center py-16 text-center lg:py-24">
          <Heading level={1}>Blog</Heading>
          <Text size="base" className="mt-4 max-w-2xl text-muted">
            Insights, tips, and updates from the StudyGenie team on AI-powered learning, study techniques, and more.
          </Text>
        </Container>
      </section>

      <Container as="section" className="py-12 lg:py-16">
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
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
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Card key={post.slug} className="flex flex-col transition-shadow hover:shadow-medium">
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
                    {formatDate(post.date)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Text size="sm" className="text-muted">
            More articles coming soon. Stay tuned for updates!
          </Text>
        </div>
      </Container>
    </>
  );
}

export default BlogPage;
