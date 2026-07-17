'use client';

import { BookOpen, Sparkles, Brain, Plus, ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Heading, Text } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { SkeletonCard, Spinner } from '@/components/common/loading';
import { EmptyState } from '@/components/common/empty-state';
import { ErrorState } from '@/components/common/error-state';
import { ROUTES } from '@/constants/routes';
import { useSession } from '@/hooks/useAuth';

const QUICK_ACTIONS = [
  {
    icon: Plus,
    title: 'New Study Material',
    description: 'Create study material with AI assistance.',
    href: ROUTES.addMaterial,
    variant: 'primary' as const,
  },
  {
    icon: Sparkles,
    title: 'Generate Notes',
    description: 'Generate AI-powered notes instantly.',
    href: ROUTES.aiNotes,
    variant: 'secondary' as const,
  },
  {
    icon: Brain,
    title: 'AI Tutor',
    description: 'Chat with your AI study assistant.',
    href: ROUTES.aiChat,
    variant: 'outline' as const,
  },
];

const RECENT_MATERIALS: {
  id: string;
  title: string;
  subject: string;
  updatedAt: string;
}[] = [];

export default function DashboardPage() {
  const { data: user, isLoading, isError, refetch } = useSession();

  if (isLoading) {
    return (
      <Container as="section" className="py-8">
        <div className="mb-8">
          <Spinner size="lg" label="Loading dashboard..." />
        </div>
        <SkeletonCard count={3} />
      </Container>
    );
  }

  if (isError || !user) {
    return (
      <Container as="section" className="py-8">
        <ErrorState
          title="Failed to load dashboard"
          message="Could not load your dashboard data. Please try again."
          onRetry={() => refetch()}
        />
      </Container>
    );
  }

  return (
    <Container as="section" className="py-8">
      <div className="mb-8">
        <Heading level={1}>
          Welcome back, {user.name}
        </Heading>
        <Text size="base" className="mt-1 text-muted">
          Here is an overview of your study activity.
        </Text>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <BookOpen className="size-8 text-primary" />
            <CardTitle>Study Materials</CardTitle>
            <CardDescription>Total materials created</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Sparkles className="size-8 text-secondary" />
            <CardTitle>AI Notes</CardTitle>
            <CardDescription>Notes generated</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Brain className="size-8 text-accent" />
            <CardTitle>AI Chats</CardTitle>
            <CardDescription>Study sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">0</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <Heading level={2} className="mb-4">
          Quick Actions
        </Heading>
        <div className="grid gap-4 sm:grid-cols-3">
          {QUICK_ACTIONS.map((action) => (
            <Link key={action.title} href={action.href}>
              <Card className="h-full transition-shadow hover:shadow-medium">
                <CardHeader>
                  <action.icon className="size-8 text-primary" />
                  <CardTitle>{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <Heading level={2}>
            Recent Materials
          </Heading>
          <Link href={ROUTES.manageMaterials}>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="ml-1 size-4" />
            </Button>
          </Link>
        </div>

        {RECENT_MATERIALS.length > 0 ? (
          <div className="space-y-3">
            {RECENT_MATERIALS.map((material) => (
              <Card key={material.id}>
                <CardContent className="flex items-center justify-between">
                  <div>
                    <CardTitle>{material.title}</CardTitle>
                    <CardDescription>{material.subject}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <Clock className="size-4" />
                    {material.updatedAt}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<BookOpen className="size-12" />}
            title="No materials yet"
            description="Create your first study material to get started."
            action={
              <Link href={ROUTES.addMaterial}>
                <Button variant="primary">
                  <Plus className="mr-1.5 size-4" />
                  Create Material
                </Button>
              </Link>
            }
          />
        )}
      </div>
    </Container>
  );
}
