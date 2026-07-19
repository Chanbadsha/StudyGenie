'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Heading, Text } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { StudyMaterialCard } from '@/components/cards/study-material-card';
import { SkeletonCard } from '@/components/common/loading';
import { EmptyState } from '@/components/common/empty-state';
import { materialService } from '@/services/material.service';
import { ROUTES } from '@/constants/routes';
import type { StudyMaterial, StudyMaterialAuthor } from '@/types/study-material';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/common/motion-wrapper';

function PopularMaterialsSection() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['materials', 'popular'],
    queryFn: () => materialService.getAll({ limit: 6, sort: 'newest' }),
  });

  const materials: StudyMaterial[] = data?.materials ?? [];

  return (
    <Container as="section" className="py-16 lg:py-24">
      <FadeIn className="mb-12 text-center">
        <Heading level={2}>Popular Study Materials</Heading>
        <Text size="base" className="mt-3 text-muted">
          Explore trending materials created by the community.
        </Text>
      </FadeIn>

      {isLoading ? (
        <SkeletonCard count={6} />
      ) : isError || materials.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="size-12" />}
          title="No materials yet"
          description="Be the first to create a study material and share it with the community."
        />
      ) : (
        <>
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {materials.map((material) => {
              const authorName = typeof material.createdBy === 'object' && material.createdBy !== null
                ? (material.createdBy as StudyMaterialAuthor).name
                : undefined;
              return (
                <StaggerItem key={material.id}>
                  <StudyMaterialCard
                    id={material.id}
                    title={material.title}
                    subject={material.subject}
                    difficulty={material.difficulty}
                    shortDescription={material.shortDescription}
                    coverImage={material.coverImage}
                    authorName={authorName}
                    createdAt={material.createdAt}
                  />
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <FadeIn className="mt-10 text-center">
            <Link href={ROUTES.explore}>
              <Button variant="outline" size="lg">
                View All Materials
              </Button>
            </Link>
          </FadeIn>
        </>
      )}
    </Container>
  );
}

export { PopularMaterialsSection };
