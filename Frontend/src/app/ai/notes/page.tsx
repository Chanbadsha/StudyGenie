'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Clock3, FileText, RefreshCw, Sparkles } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Heading, Text } from '@/components/ui/typography';
import { EmptyState } from '@/components/common/empty-state';
import { ErrorState } from '@/components/common/error-state';
import { Spinner } from '@/components/common/loading';
import { MarkdownRenderer } from '@/components/common/markdown-renderer';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/common/motion-wrapper';
import { useAIHistory, useAINotes } from '@/hooks/useAI';
import { useSession } from '@/hooks/useAuth';
import { getApiErrorMessage } from '@/utils/api-error';
import { formatDate } from '@/utils/format-date';
import { GenerateNotesSchema, type GenerateNotesSchemaType } from '@/validations/ai.schema';
import type { AIGeneration } from '@/types/ai';
import { SUBJECTS } from '@/constants/subjects';
import { DIFFICULTY_LEVELS } from '@/constants/difficulty';
import { ROUTES } from '@/constants/routes';

function SelectField({
  id,
  label,
  error,
  children,
  ...props
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label} <span className="text-danger" aria-hidden="true">*</span>
      </label>
      <select
        id={id}
        className="h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-60"
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}

function HistoryItem({
  generation,
}: {
  generation: AIGeneration;
}) {
  return (
    <Link href={`/notes/${generation.id}`}>
      <div className="rounded-lg border border-border bg-background p-3 transition-colors hover:border-primary hover:bg-primary/5">
        <p className="line-clamp-2 text-sm font-semibold text-foreground">{generation.topic}</p>
        <p className="mt-1 text-xs text-muted">{generation.subject} - {generation.outputLength}</p>
        <p className="mt-2 flex items-center gap-1 text-xs text-muted">
          <Clock3 className="size-3.5" aria-hidden="true" />
          {formatDate(generation.createdAt)}
        </p>
      </div>
    </Link>
  );
}

export default function AINotesPage() {
  const sessionQuery = useSession();
  const historyQuery = useAIHistory(Boolean(sessionQuery.data));
  const generateNotes = useAINotes();
  const [currentGeneration, setCurrentGeneration] = useState<AIGeneration | null>(null);
  const [lastInput, setLastInput] = useState<GenerateNotesSchemaType | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GenerateNotesSchemaType>({
    resolver: zodResolver(GenerateNotesSchema),
    defaultValues: {
      difficulty: 'Beginner',
      outputLength: 'Medium',
    },
  });

  const isGenerating = isSubmitting || generateNotes.isPending;

  function submitNotes(data: GenerateNotesSchemaType): void {
    setLastInput(data);
    generateNotes.mutate(data, {
      onSuccess: (generation) => setCurrentGeneration(generation),
    });
  }

  function regenerateNotes(): void {
    if (!lastInput) return;

    generateNotes.mutate(lastInput, {
      onSuccess: (generation) => setCurrentGeneration(generation),
    });
  }

  return (
    <Container as="section" className="py-8 lg:py-12">
      <FadeIn y={8}>
        <Link
          href={ROUTES.dashboard}
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to Dashboard
        </Link>
      </FadeIn>

      <FadeIn className="mb-8 max-w-3xl">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          <Sparkles className="size-4" aria-hidden="true" />
          AI Study Assistant
        </div>
        <Heading level={1}>Generate Study Notes</Heading>
        <Text size="base" className="mt-2 text-muted">
          Set a learning goal and let StudyGenie shape a focused, structured study guide for you.
        </Text>
      </FadeIn>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-8">
          <FadeIn y={16}>
            <Card>
              <CardHeader>
                <CardTitle>Build your prompt</CardTitle>
                <CardDescription>Tell the generator what you want to understand. The selected length controls the depth of the response.</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit(submitNotes)} noValidate>
                <CardContent className="flex flex-col gap-6">
                  <Input
                    label="Topic"
                    placeholder="Newton's laws of motion"
                    error={errors.topic?.message}
                    isRequired
                    isDisabled={isGenerating}
                    {...register('topic')}
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <SelectField id="subject" label="Subject" error={errors.subject?.message} disabled={isGenerating} {...register('subject')}>
                      <option value="">Select a subject</option>
                      {SUBJECTS.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
                    </SelectField>
                    <SelectField id="difficulty" label="Difficulty" error={errors.difficulty?.message} disabled={isGenerating} {...register('difficulty')}>
                      <option value="">Select a difficulty</option>
                      {DIFFICULTY_LEVELS.map((difficulty) => <option key={difficulty} value={difficulty}>{difficulty}</option>)}
                    </SelectField>
                  </div>

                  <Textarea
                    label="Learning goal"
                    placeholder="Understand how force, mass, and acceleration relate in real-world problems."
                    rows={4}
                    error={errors.learningGoal?.message}
                    isRequired
                    isDisabled={isGenerating}
                    {...register('learningGoal')}
                  />

                  <SelectField id="outputLength" label="Output length" error={errors.outputLength?.message} disabled={isGenerating} {...register('outputLength')}>
                    <option value="Short">Short - essential review</option>
                    <option value="Medium">Medium - balanced study notes</option>
                    <option value="Long">Long - detailed study guide</option>
                  </SelectField>

                  <hr className="border-border" />

                  {generateNotes.error && (
                    <FadeIn>
                      <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger" role="alert">
                        {getApiErrorMessage(generateNotes.error, 'Could not generate notes. Please try again.')}
                      </p>
                    </FadeIn>
                  )}
                </CardContent>
                <CardFooter>
                  <Button type="submit" variant="primary" isLoading={isGenerating} fullWidth>
                    {!isGenerating && <Sparkles className="mr-1.5 size-4" aria-hidden="true" />}
                    {isGenerating ? 'Generating notes...' : 'Generate Notes'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </FadeIn>

          {isGenerating ? (
            <FadeIn>
              <Card aria-live="polite">
                <CardContent className="flex min-h-80 flex-col items-center justify-center gap-5">
                  <Spinner size="lg" label="StudyGenie is organizing your notes..." />
                  <div className="w-full max-w-xl space-y-3" aria-hidden="true">
                    <div className="h-4 animate-pulse rounded bg-surface" />
                    <div className="h-4 w-5/6 animate-pulse rounded bg-surface" />
                    <div className="h-4 w-4/6 animate-pulse rounded bg-surface" />
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ) : currentGeneration ? (
            <FadeIn>
              <Card>
                <CardHeader>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{currentGeneration.subject}</span>
                        <span className="rounded-md bg-success/10 px-2 py-0.5 text-xs font-medium text-success">{currentGeneration.difficulty}</span>
                        <span className="rounded-md bg-surface px-2 py-0.5 text-xs font-medium text-muted">{currentGeneration.outputLength}</span>
                      </div>
                      <CardTitle>{currentGeneration.topic}</CardTitle>
                      <CardDescription className="mt-1">Generated {formatDate(currentGeneration.createdAt)}</CardDescription>
                    </div>
                    <Button type="button" variant="outline" size="sm" isLoading={generateNotes.isPending} onClick={regenerateNotes} isDisabled={!lastInput}>
                      {!generateNotes.isPending && <RefreshCw className="mr-1.5 size-4" aria-hidden="true" />}
                      Regenerate
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <MarkdownRenderer content={currentGeneration.response} />
                </CardContent>
              </Card>
            </FadeIn>
          ) : (
            <FadeIn>
              <Card>
                <CardContent>
                  <EmptyState
                    icon={<FileText className="size-12" />}
                    title="Your notes will appear here"
                    description="Complete the prompt form to generate a focused study guide."
                  />
                </CardContent>
              </Card>
            </FadeIn>
          )}
        </div>

        <aside>
          <FadeIn className="lg:sticky lg:top-24">
            <Card>
              <CardHeader>
                <CardTitle>Saved generations</CardTitle>
                <CardDescription>Your notes history is private to your account.</CardDescription>
              </CardHeader>
              <CardContent>
                {historyQuery.isLoading ? (
                  <Spinner label="Loading history..." />
                ) : historyQuery.isError ? (
                  <ErrorState
                    title="History unavailable"
                    message={getApiErrorMessage(historyQuery.error, 'Could not load your saved notes.')}
                    onRetry={() => historyQuery.refetch()}
                  />
                ) : historyQuery.data && historyQuery.data.length > 0 ? (
                  <StaggerContainer className="space-y-3">
                    {historyQuery.data.map((generation) => (
                      <StaggerItem key={generation.id}>
                        <HistoryItem generation={generation} />
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                ) : (
                  <EmptyState
                    icon={<FileText className="size-10" />}
                    title="No saved notes"
                    description="Generated notes will be kept here for your next review."
                    className="py-8"
                  />
                )}
              </CardContent>
            </Card>
          </FadeIn>
        </aside>
      </div>
    </Container>
  );
}
