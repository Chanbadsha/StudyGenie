'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Container } from '@/components/layout/container';
import { Heading, Text } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/common/loading';
import { ErrorState } from '@/components/common/error-state';
import { FadeIn } from '@/components/common/motion-wrapper';
import { MarkdownRenderer } from '@/components/common/markdown-renderer';
import { materialService } from '@/services/material.service';
import { formatDate } from '@/utils/format-date';
import type { StudyMaterial } from '@/types/study-material';

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=600&fit=crop';

const difficultyColorMap: Record<string, string> = {
  Beginner: 'bg-success/10 text-success',
  Intermediate: 'bg-warning/10 text-warning',
  Advanced: 'bg-danger/10 text-danger',
};

function MaterialDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [imgFailed, setImgFailed] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery<StudyMaterial>({
    queryKey: ['material', id],
    queryFn: () => materialService.getById(id),
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
  const imageSrc = data.coverImage && !imgFailed ? data.coverImage : PLACEHOLDER_IMAGE;

  return (
    <article>
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 via-background to-surface">
        <div className="absolute inset-0 -z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, var(--color-primary) 0%, transparent 50%), radial-gradient(circle at 75% 50%, var(--color-primary) 0%, transparent 50%)' }} />
        <Container as="div" className="relative z-10 py-10 lg:py-14">
          <FadeIn>
            <Link
              href="/explore"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back to Explore
            </Link>

            <div className="relative mb-8 h-56 w-full overflow-hidden rounded-xl sm:h-72 lg:h-96">
              <Image
                src={imageSrc}
                alt={data.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 80vw"
                className="object-cover"
                priority
                onError={() => setImgFailed(true)}
              />
            </div>

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
              {data.createdBy && typeof data.createdBy === 'object' && data.createdBy !== null && (
                <span className="flex items-center gap-1.5">
                  <User className="size-4" />
                  {(data.createdBy as { name?: string }).name ?? 'Unknown'}
                </span>
              )}
            </div>

            <div className="mt-5 max-w-3xl">
              <Text size="base" className="text-muted">
                {data.shortDescription}
              </Text>
            </div>
          </FadeIn>
        </Container>
      </section>

      <Container as="section" className="py-10 lg:py-14">
        <FadeIn y={16}>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <MarkdownRenderer content={data.content ?? ''} />
          </div>
        </FadeIn>
      </Container>
    </article>
  );
}

export default MaterialDetailsPage;
