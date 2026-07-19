'use client';

import { Container } from '@/components/layout/container';
import { Heading, Text } from '@/components/ui/typography';
import { Spinner } from '@/components/common/loading';
import { ErrorState } from '@/components/common/error-state';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { SubjectChart } from '@/components/analytics/subject-chart';
import { ProgressChart } from '@/components/analytics/progress-chart';
import { useSubjectDistribution, useLearningProgress } from '@/hooks/useAnalytics';

function AnalyticsContent() {
  const subjectsQuery = useSubjectDistribution();
  const progressQuery = useLearningProgress();

  if (subjectsQuery.isLoading || progressQuery.isLoading) {
    return (
      <Container as="section" className="py-8">
        <div className="mb-8">
          <Spinner size="lg" label="Loading analytics..." />
        </div>
      </Container>
    );
  }

  if (subjectsQuery.isError || progressQuery.isError) {
    return (
      <Container as="section" className="py-8">
        <ErrorState
          title="Failed to load analytics"
          message="Could not load your analytics data. Please try again."
          onRetry={() => {
            subjectsQuery.refetch();
            progressQuery.refetch();
          }}
        />
      </Container>
    );
  }

  return (
    <Container as="section" className="py-8">
      <div className="mb-8">
        <Heading level={1}>Analytics</Heading>
        <Text size="base" className="mt-1 text-muted">
          Visualize your study activity and learning progress.
        </Text>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SubjectChart
          data={subjectsQuery.data ?? []}
          isLoading={subjectsQuery.isLoading}
        />
        <ProgressChart
          data={progressQuery.data ?? { monthlyMaterials: [], monthlyGenerations: [] }}
          isLoading={progressQuery.isLoading}
        />
      </div>
    </Container>
  );
}

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <AnalyticsContent />
    </ProtectedRoute>
  );
}
