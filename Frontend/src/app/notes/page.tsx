'use client';

import { useState, useMemo, memo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Sparkles, FileText, Clock3, BookOpen, Plus } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Heading, Text } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SkeletonCard } from '@/components/common/loading';
import { EmptyState } from '@/components/common/empty-state';
import { ErrorState } from '@/components/common/error-state';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/common/motion-wrapper';
import { useAIHistory } from '@/hooks/useAI';
import { useSession } from '@/hooks/useAuth';
import { useDebounce } from '@/hooks/useDebounce';
import { formatDate } from '@/utils/format-date';
import { ROUTES } from '@/constants/routes';
import type { AIGeneration } from '@/types/ai';

const difficultyColorMap: Record<string, string> = {
  Beginner: 'bg-success/10 text-success',
  Intermediate: 'bg-warning/10 text-warning',
  Advanced: 'bg-danger/10 text-danger',
};

const lengthLabelMap: Record<string, string> = {
  Short: 'Short',
  Medium: 'Medium',
  Long: 'Long',
};

const NotesCard = memo(function NotesCard({ note }: { note: AIGeneration }) {
  const difficultyClass = difficultyColorMap[note.difficulty] ?? 'bg-surface text-muted';

  return (
    <Link href={`/notes/${note.id}`}>
      <Card className="group h-full transition-shadow hover:shadow-medium">
        <CardContent className="flex flex-col gap-3 p-5">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {note.subject}
            </span>
            <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${difficultyClass}`}>
              {note.difficulty}
            </span>
            <span className="ml-auto rounded-md bg-surface px-2 py-0.5 text-xs font-medium text-muted">
              {lengthLabelMap[note.outputLength]}
            </span>
          </div>

          <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-primary">
            {note.topic}
          </h3>

          <p className="line-clamp-2 text-sm text-muted">
            {note.learningGoal}
          </p>

          <div className="mt-auto flex items-center gap-4 pt-2 text-xs text-muted">
            <span className="flex items-center gap-1">
              <FileText className="size-3.5" />
              {note.response.length > 500 ? `${Math.round(note.response.length / 500)} pages` : '1 page'}
            </span>
            <span className="flex items-center gap-1">
              <Clock3 className="size-3.5" />
              {formatDate(note.createdAt)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
});

export default function NotesPage() {
  const sessionQuery = useSession();
  const historyQuery = useAIHistory(Boolean(sessionQuery.data));
  const [searchInput, setSearchInput] = useState('');

  const debouncedSearch = useDebounce(searchInput, 300);

  const allNotes = useMemo(() => historyQuery.data ?? [], [historyQuery.data]);

  const filteredNotes = useMemo(
    () =>
      debouncedSearch
        ? allNotes.filter(
            (note) =>
              note.topic.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
              note.subject.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
              note.learningGoal.toLowerCase().includes(debouncedSearch.toLowerCase())
          )
        : allNotes,
    [allNotes, debouncedSearch]
  );

  return (
    <Container as="section" className="py-8 lg:py-12">
      <Link
        href={ROUTES.dashboard}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to Dashboard
      </Link>

      <FadeIn className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          <Sparkles className="size-4" aria-hidden="true" />
          AI Study Assistant
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <Heading level={1}>My Notes</Heading>
            <Text size="base" className="mt-1 text-muted">
              Browse all your AI-generated study notes in one place.
            </Text>
          </div>
          <Link href={ROUTES.aiNotes}>
            <Button variant="primary" size="sm" className="shrink-0">
              <Plus className="mr-1.5 size-4" />
              Generate New Notes
            </Button>
          </Link>
        </div>
      </FadeIn>

      <FadeIn y={16} className="mb-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search notes by topic, subject, or learning goal..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label="Search notes"
          />
        </div>
      </FadeIn>

      {historyQuery.isLoading ? (
        <SkeletonCard count={6} />
      ) : historyQuery.isError ? (
        <ErrorState
          title="Failed to load notes"
          message="Could not load your saved notes. Please try again."
          onRetry={() => historyQuery.refetch()}
        />
      ) : filteredNotes.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="size-12" />}
          title={allNotes.length === 0 ? 'No notes yet' : 'No matching notes'}
          description={
            allNotes.length === 0
              ? 'Generate your first study notes to see them here.'
              : 'Try adjusting your search query.'
          }
          action={
            allNotes.length === 0 ? (
              <Link href={ROUTES.aiNotes}>
                <Button variant="primary">
                  <Sparkles className="mr-1.5 size-4" />
                  Generate Notes
                </Button>
              </Link>
            ) : undefined
          }
        />
      ) : (
        <>
          <p className="mb-4 text-sm text-muted">
            Showing {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''}
            {debouncedSearch && allNotes.length !== filteredNotes.length
              ? ` of ${allNotes.length}`
              : ''}
          </p>
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNotes.map((note) => (
              <StaggerItem key={note.id}>
                <NotesCard note={note} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </>
      )}
    </Container>
  );
}
