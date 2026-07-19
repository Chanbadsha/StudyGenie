'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Calendar, Eye, Plus, Trash2 } from 'lucide-react';
import { useDeleteMaterial, useMyMaterials } from '@/hooks/useStudyMaterials';
import { getApiErrorMessage } from '@/utils/api-error';
import { Container } from '@/components/layout/container';
import { Heading, Text } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { EmptyState } from '@/components/common/empty-state';
import { ErrorState } from '@/components/common/error-state';
import { SkeletonCard } from '@/components/common/loading';
import { ROUTES } from '@/constants/routes';
import { formatDate } from '@/utils/format-date';

const PAGE_SIZE = 12;

export default function ManageMaterialsPage() {
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const materialsQuery = useMyMaterials({ page, limit: PAGE_SIZE, sort: 'newest' });
  const deleteMaterial = useDeleteMaterial();
  const materials = materialsQuery.data?.materials ?? [];
  const pagination = materialsQuery.data?.pagination;

  function confirmDelete(): void {
    if (!deleteId) return;

    deleteMaterial.mutate(deleteId, {
      onSuccess: () => setDeleteId(null),
    });
  }

  return (
    <Container as="section" className="py-8 lg:py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            href={ROUTES.dashboard}
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Dashboard
          </Link>
          <Heading level={1}>Manage Materials</Heading>
          <Text size="base" className="mt-1 text-muted">View and remove the study materials you created.</Text>
        </div>
        <Link href={ROUTES.addMaterial}>
          <Button variant="primary">
            <Plus className="mr-1.5 size-4" />
            Add Material
          </Button>
        </Link>
      </div>

      {deleteMaterial.error && (
        <p className="mb-6 rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger" role="alert">
          {getApiErrorMessage(deleteMaterial.error, 'Could not delete this material. Please try again.')}
        </p>
      )}

      {materialsQuery.isLoading ? (
        <SkeletonCard count={6} />
      ) : materialsQuery.isError ? (
        <ErrorState
          title="Failed to load your materials"
          message="Could not load your study materials. Please try again."
          onRetry={() => materialsQuery.refetch()}
        />
      ) : materials.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="size-12" />}
          title="No materials yet"
          description="Create your first study material to start building your library."
          action={(
            <Link href={ROUTES.addMaterial}>
              <Button variant="primary">
                <Plus className="mr-1.5 size-4" />
                Add Material
              </Button>
            </Link>
          )}
        />
      ) : (
        <>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {materials.map((material) => {
              const isConfirming = deleteId === material.id;
              const isDeleting = isConfirming && deleteMaterial.isPending;

              return (
                <Card key={material.id} className="flex h-full flex-col">
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        {material.subject}
                      </span>
                      <span className="rounded-md bg-surface px-2 py-0.5 text-xs font-medium text-muted">
                        {material.difficulty}
                      </span>
                    </div>
                    <CardTitle className="mt-2 line-clamp-2">{material.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{material.shortDescription}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <p className="flex items-center gap-1.5 text-xs text-muted">
                      <Calendar className="size-3.5" />
                      Created {formatDate(material.createdAt)}
                    </p>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3">
                    {isConfirming ? (
                      <div className="w-full rounded-lg border border-danger/30 bg-danger/5 p-3" role="alert">
                        <p className="text-sm font-medium text-foreground">Delete this material?</p>
                        <p className="mt-1 text-xs text-muted">This action cannot be undone.</p>
                        <div className="mt-3 flex gap-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            isDisabled={isDeleting}
                            onClick={() => setDeleteId(null)}
                            fullWidth
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            variant="danger"
                            size="sm"
                            isLoading={isDeleting}
                            onClick={confirmDelete}
                            fullWidth
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex w-full gap-2">
                        <Link href={`/materials/${material.id}`} className="flex-1">
                          <Button type="button" variant="outline" size="sm" fullWidth>
                            <Eye className="mr-1.5 size-4" />
                            View
                          </Button>
                        </Link>
                        <Button
                          type="button"
                          variant="danger"
                          size="sm"
                          aria-label={`Delete ${material.title}`}
                          onClick={() => setDeleteId(material.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Material pages">
              <Button
                type="button"
                variant="outline"
                size="sm"
                isDisabled={page <= 1}
                onClick={() => setPage((currentPage) => currentPage - 1)}
              >
                Previous
              </Button>
              {Array.from({ length: pagination.totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <Button
                  key={pageNumber}
                  type="button"
                  variant={pageNumber === page ? 'primary' : 'outline'}
                  size="sm"
                  aria-label={`Go to page ${pageNumber}`}
                  aria-current={pageNumber === page ? 'page' : undefined}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                isDisabled={page >= pagination.totalPages}
                onClick={() => setPage((currentPage) => currentPage + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </Container>
  );
}
