'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Heading, Text } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { StudyMaterialCard } from '@/components/cards/study-material-card';
import { SkeletonCard } from '@/components/common/loading';
import { EmptyState } from '@/components/common/empty-state';
import { ErrorState } from '@/components/common/error-state';
import { useStudyMaterials } from '@/hooks/useStudyMaterials';
import { useDebounce } from '@/hooks/useDebounce';
import { SUBJECTS } from '@/constants/subjects';
import { DIFFICULTY_LEVELS } from '@/constants/difficulty';
import { SORT_OPTIONS, DEFAULT_PAGE_SIZE } from '@/constants/pagination';
import { BookOpen } from 'lucide-react';

function ExplorePage() {
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, isError, refetch } = useStudyMaterials({
    page,
    limit: DEFAULT_PAGE_SIZE,
    search: debouncedSearch || undefined,
    subject: subject || undefined,
    difficulty: difficulty || undefined,
    sort: sort || undefined,
  });

  const materials = data?.materials ?? [];
  const pagination = data?.pagination;

  function handleFilterChange() {
    setPage(1);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleSubjectChange(value: string) {
    setSubject(value);
    handleFilterChange();
  }

  function handleDifficultyChange(value: string) {
    setDifficulty(value);
    handleFilterChange();
  }

  function handleSortChange(value: string) {
    setSort(value);
    handleFilterChange();
  }

  function clearFilters() {
    setSearch('');
    setSubject('');
    setDifficulty('');
    setSort('newest');
    setPage(1);
  }

  const hasActiveFilters = search || subject || difficulty || sort !== 'newest';

  return (
    <Container as="section" className="py-8 lg:py-12">
      <div className="mb-8">
        <Heading level={1}>Explore Study Materials</Heading>
        <Text size="base" className="mt-1 text-muted">
          Discover study materials created by the community.
        </Text>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search materials..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label="Search materials"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="mr-1.5 size-4" />
          Filters
          {hasActiveFilters && (
            <span className="ml-1.5 inline-flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white">
              !
            </span>
          )}
        </Button>
      </div>

      {showFilters && (
        <div className="mb-6 rounded-lg border border-border bg-surface p-4">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground">Subject</label>
              <select
                value={subject}
                onChange={(e) => handleSubjectChange(e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                aria-label="Filter by subject"
              >
                <option value="">All Subjects</option>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => handleDifficultyChange(e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                aria-label="Filter by difficulty"
              >
                <option value="">All Levels</option>
                {DIFFICULTY_LEVELS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-foreground">Sort By</label>
              <select
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                aria-label="Sort by"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="mr-1 size-4" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      )}

      {isLoading ? (
        <SkeletonCard count={6} />
      ) : isError ? (
        <ErrorState
          title="Failed to load materials"
          message="Could not load study materials. Please try again."
          onRetry={() => refetch()}
        />
      ) : materials.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="size-12" />}
          title="No materials found"
          description={
            hasActiveFilters
              ? 'Try adjusting your search or filters.'
              : 'No study materials have been created yet.'
          }
          action={
            hasActiveFilters ? (
              <Button variant="primary" onClick={clearFilters}>
                Clear Filters
              </Button>
            ) : undefined
          }
        />
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {materials.map((material) => (
              <StudyMaterialCard
                key={material.id}
                id={material.id}
                title={material.title}
                subject={material.subject}
                difficulty={material.difficulty}
                shortDescription={material.shortDescription}
                coverImage={material.coverImage}
                createdAt={material.createdAt}
              />
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                isDisabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>

              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                .filter((p) => {
                  const distance = Math.abs(p - page);
                  return distance === 0 || distance === 1 || distance === 2 || p === 1 || p === pagination.totalPages;
                })
                .map((p, i, arr) => {
                  const showEllipsis = i > 0 && p - arr[i - 1] > 1;
                  return (
                    <span key={p} className="flex items-center gap-1">
                      {showEllipsis && <span className="px-1 text-muted">...</span>}
                      <Button
                        variant={p === page ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </Button>
                    </span>
                  );
                })}

              <Button
                variant="outline"
                size="sm"
                isDisabled={page >= pagination.totalPages}
                onClick={() => setPage(page + 1)}
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

export default ExplorePage;
