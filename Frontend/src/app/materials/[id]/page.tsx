'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Container } from '@/components/layout/container';
import { Heading, Text } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/common/loading';
import { ErrorState } from '@/components/common/error-state';
import { materialService } from '@/services/material.service';
import { formatDate } from '@/utils/format-date';
import type { StudyMaterial } from '@/types/study-material';

const difficultyColorMap: Record<string, string> = {
  Beginner: 'bg-success/10 text-success',
  Intermediate: 'bg-warning/10 text-warning',
  Advanced: 'bg-danger/10 text-danger',
};

function MaterialDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, isError, refetch } = useQuery<StudyMaterial>({
    queryKey: ['material', id],
    queryFn: async () => {
      const response = await materialService.getById(id);
      return response.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Container as="section" className="py-16">
        <Spinner size="lg" label="Loading material..." />
      </Container>
    );
  }

  if (isError || !data) {
    return (
      <Container as="section" className="py-16">
        <ErrorState
          title="Failed to load material"
          message="Could not load the study material. It may have been removed or you may have an invalid link."
          onRetry={() => refetch()}
        />
        <div className="mt-6 flex justify-center">
          <Link href="/explore">
            <Button variant="outline">
              <ArrowLeft className="mr-1.5 size-4" />
              Back to Explore
            </Button>
          </Link>
        </div>
      </Container>
    );
  }

  const difficultyClass = difficultyColorMap[data.difficulty] ?? 'bg-surface text-muted';

  return (
    <Container as="article" className="py-8 lg:py-12">
      <Link
        href="/explore"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Explore
      </Link>

      {data.coverImage && (
        <div
          className="mb-8 h-56 w-full rounded-xl bg-cover bg-center sm:h-72 lg:h-96"
          style={{ backgroundImage: `url(${data.coverImage})` }}
          role="img"
          aria-label={data.title}
        />
      )}

      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          {data.subject}
        </span>
        <span className={`rounded-md px-3 py-1 text-sm font-medium ${difficultyClass}`}>
          {data.difficulty}
        </span>
      </div>

      <Heading level={1} className="mt-4">{data.title}</Heading>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted">
        <span className="flex items-center gap-1.5">
          <Calendar className="size-4" />
          {formatDate(data.createdAt)}
        </span>
        {data.createdBy && (
          <span className="flex items-center gap-1.5">
            <User className="size-4" />
            Created by {'createdBy' in data && typeof data.createdBy === 'object' && data.createdBy !== null
              ? ((data.createdBy as { name?: string }).name ?? 'Unknown')
              : 'Unknown'}
          </span>
        )}
      </div>

      <div className="mt-6">
        <Text size="base" className="text-muted">
          {data.shortDescription}
        </Text>
      </div>

      <div className="prose prose-sm prose-gray mt-8 max-w-none border-t border-border pt-8">
        {data.content.split('\n').map((paragraph, index) => (
          paragraph.trim() ? (
            <p key={index} className="mb-4 leading-relaxed text-foreground">
              {paragraph}
            </p>
          ) : null
        ))}
      </div>
    </Container>
  );
}

export default MaterialDetailsPage;
