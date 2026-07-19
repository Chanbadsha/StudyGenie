'use client';

import { useMemo } from 'react';
import { BookOpen, Sparkles, Brain, Bot, FolderOpen, Plus, ArrowRight, Clock, BarChart3 } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Heading, Text } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { SkeletonCard, Spinner } from '@/components/common/loading';
import { EmptyState } from '@/components/common/empty-state';
import { ErrorState } from '@/components/common/error-state';

const SubjectChart = dynamic(() => import('@/components/analytics/subject-chart').then((mod) => mod.SubjectChart), {
  ssr: false,
  loading: () => (
    <div className="h-80 animate-pulse rounded-xl bg-surface" />
  ),
});
import { ROUTES } from '@/constants/routes';
import { useAIHistory } from '@/hooks/useAI';
import { useSession } from '@/hooks/useAuth';
import { useMyMaterials } from '@/hooks/useStudyMaterials';
import { useDashboardStats } from '@/hooks/useAnalytics';
import { formatDate } from '@/utils/format-date';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/common/motion-wrapper';

const QUICK_ACTIONS = [
  {
    icon: Plus,
    title: 'New Study Material',
    description: 'Create a new study material for your library.',
    href: ROUTES.addMaterial,
    variant: 'primary' as const,
  },
  {
    icon: FolderOpen,
    title: 'Manage Materials',
    description: 'Review or remove your study materials.',
    href: ROUTES.manageMaterials,
    variant: 'secondary' as const,
  },
  {
    icon: Sparkles,
    title: 'Generate AI Notes',
    description: 'Turn a learning goal into structured study notes.',
    href: ROUTES.aiNotes,
    variant: 'secondary' as const,
  },
  {
    icon: Bot,
    title: 'AI Tutor Chat',
    description: 'Chat with AI to understand any topic.',
    href: ROUTES.aiChat,
    variant: 'secondary' as const,
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'View charts and learning progress.',
    href: ROUTES.analytics,
    variant: 'outline' as const,
  },
];

export default function DashboardPage() {
  const { data: user, isLoading, isError, refetch } = useSession();
  const materialsQuery = useMyMaterials({ limit: 5, sort: 'newest' }, !!user);
  const aiHistoryQuery = useAIHistory(!!user);
  const dashboardStatsQuery = useDashboardStats(!!user);
  const recentMaterials = useMemo(() => materialsQuery.data?.materials ?? [], [materialsQuery.data]);
  const stats = useMemo(() => dashboardStatsQuery.data, [dashboardStatsQuery.data]);

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
      <FadeIn className="mb-8">
        <Heading level={1}>
          Welcome back, {user.name}
        </Heading>
        <Text size="base" className="mt-1 text-muted">
          Here is an overview of your study activity.
        </Text>
      </FadeIn>

      <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StaggerItem>
          <Card>
            <CardHeader>
              <BookOpen className="size-8 text-primary" />
              <CardTitle>Study Materials</CardTitle>
              <CardDescription>Total materials created</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{materialsQuery.data?.pagination.total ?? 0}</p>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Link href={ROUTES.notes}>
            <Card className="h-full transition-shadow hover:shadow-medium">
              <CardHeader>
                <Sparkles className="size-8 text-secondary" />
                <CardTitle>AI Notes</CardTitle>
                <CardDescription>Notes generated</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{aiHistoryQuery.data?.length ?? 0}</p>
              </CardContent>
            </Card>
          </Link>
        </StaggerItem>

        <StaggerItem>
          <Link href={ROUTES.aiChat}>
            <Card className="h-full transition-shadow hover:shadow-medium">
              <CardHeader>
                <Brain className="size-8 text-accent" />
                <CardTitle>AI Chats</CardTitle>
                <CardDescription>Study sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{stats?.totalChatSessions ?? 0}</p>
              </CardContent>
            </Card>
          </Link>
        </StaggerItem>
      </StaggerContainer>

      <FadeIn className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <Heading level={2}>
            Quick Actions
          </Heading>
        </div>
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {QUICK_ACTIONS.map((action) => (
            <StaggerItem key={action.title}>
              <Link href={action.href}>
                <Card className="h-full transition-shadow hover:shadow-medium">
                  <CardHeader>
                    <action.icon className="size-8 text-primary" />
                    <CardTitle>{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </FadeIn>

      <FadeIn className="mt-10">
        <SubjectChart
          data={stats?.subjectDistribution ?? []}
          isLoading={dashboardStatsQuery.isLoading}
        />
      </FadeIn>

      <FadeIn className="mt-10">
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

        {materialsQuery.isLoading ? (
          <SkeletonCard count={3} />
        ) : materialsQuery.isError ? (
          <ErrorState
            title="Failed to load recent materials"
            message="Could not load your recent materials. Please try again."
            onRetry={() => materialsQuery.refetch()}
          />
        ) : recentMaterials.length > 0 ? (
          <StaggerContainer className="space-y-3">
            {recentMaterials.map((material) => (
              <StaggerItem key={material.id}>
                <Card>
                  <CardContent className="flex min-w-0 items-center justify-between gap-4">
                    <div className="min-w-0">
                      <CardTitle>{material.title}</CardTitle>
                      <CardDescription>{material.subject}</CardDescription>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 text-sm text-muted">
                      <Clock className="size-4" />
                      {formatDate(material.updatedAt)}
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
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
      </FadeIn>
    </Container>
  );
}
