'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Clock3, Sparkles, BookOpen } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Container } from '@/components/layout/container';
import { Heading, Text } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Spinner } from '@/components/common/loading';
import { ErrorState } from '@/components/common/error-state';

const MarkdownRenderer = dynamic(() => import('@/components/common/markdown-renderer').then((mod) => mod.MarkdownRenderer), {
  ssr: false,
  loading: () => <div className="h-48 animate-pulse rounded-lg bg-surface" />,
});
import { useAIHistory } from '@/hooks/useAI';
import { useSession } from '@/hooks/useAuth';
import { formatDate } from '@/utils/format-date';
import { ROUTES } from '@/constants/routes';

const difficultyColorMap: Record<string, string> = {
  Beginner: 'bg-success/10 text-success',
  Intermediate: 'bg-warning/10 text-warning',
  Advanced: 'bg-danger/10 text-danger',
};

export default function NoteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const sessionQuery = useSession();
  const historyQuery = useAIHistory(Boolean(sessionQuery.data));

  const note = historyQuery.data?.find((g) => g.id === id) ?? null;

  const isLoading = historyQuery.isLoading;

  return (
    <Container as="section" className="py-8 lg:py-12">
      <Link
        href={ROUTES.notes}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to My Notes
      </Link>

      {isLoading ? (
        <div className="flex min-h-80 items-center justify-center">
          <Spinner size="lg" label="Loading note..." />
        </div>
      ) : historyQuery.isError ? (
        <ErrorState
          title="Failed to load note"
          message="Could not load this note. Please try again."
          onRetry={() => historyQuery.refetch()}
        />
      ) : !note ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <BookOpen className="size-16 text-muted" aria-hidden="true" />
          <Heading level={2}>Note not found</Heading>
          <Text size="base" className="max-w-md text-muted">
            This note could not be found or may have been deleted.
          </Text>
          <Link href={ROUTES.notes}>
            <Button variant="primary">Browse All Notes</Button>
          </Link>
        </div>
      ) : (
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {note.subject}
                    </span>
                    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${difficultyColorMap[note.difficulty] ?? ''}`}>
                      {note.difficulty}
                    </span>
                    <span className="rounded-md bg-surface px-2 py-0.5 text-xs font-medium text-muted">
                      {note.outputLength}
                    </span>
                  </div>
                  <CardTitle>{note.topic}</CardTitle>
                  <CardDescription className="mt-1 flex items-center gap-1">
                    <Clock3 className="size-3.5" aria-hidden="true" />
                    Generated {formatDate(note.createdAt)}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6 rounded-lg bg-surface p-4 text-sm text-muted">
                <p className="mb-1 font-medium text-foreground">Learning goal</p>
                <p>{note.learningGoal}</p>
              </div>
              <MarkdownRenderer content={note.response} />
            </CardContent>
          </Card>

          <div className="mt-8 flex items-center gap-4">
            <Link href={ROUTES.notes}>
              <Button variant="outline">
                <ArrowLeft className="mr-1.5 size-4" />
                Back to My Notes
              </Button>
            </Link>
            <Link href={ROUTES.aiNotes}>
              <Button variant="primary">
                <Sparkles className="mr-1.5 size-4" />
                Open in Generator
              </Button>
            </Link>
          </div>
        </div>
      )}
    </Container>
  );
}
