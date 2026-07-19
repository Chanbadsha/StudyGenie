'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save, BookOpen } from 'lucide-react';
import { CreateMaterialSchema, type CreateMaterialSchemaType } from '@/validations/material.schema';
import { useCreateMaterial } from '@/hooks/useStudyMaterials';
import { Container } from '@/components/layout/container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Heading, Text } from '@/components/ui/typography';
import { FadeIn } from '@/components/common/motion-wrapper';
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

export default function AddMaterialPage() {
  const router = useRouter();
  const createMaterial = useCreateMaterial();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateMaterialSchemaType>({
    resolver: zodResolver(CreateMaterialSchema),
  });
  const isSubmittingMaterial = isSubmitting || createMaterial.isPending;

  function onSubmit(data: CreateMaterialSchemaType): void {
    createMaterial.mutate(data, {
      onSuccess: (material) => {
        router.push(`/materials/${material.id}`);
      },
    });
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 via-background to-surface">
        <div className="absolute inset-0 -z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, var(--color-primary) 0%, transparent 50%), radial-gradient(circle at 75% 50%, var(--color-primary) 0%, transparent 50%)' }} />
        <Container as="div" className="relative z-10 py-12 lg:py-16">
          <FadeIn>
            <Link
              href={ROUTES.manageMaterials}
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back to Manage Materials
            </Link>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 shadow-sm">
                <BookOpen className="size-7 text-primary" />
              </div>
              <Heading level={1}>Add Study Material</Heading>
              <div className="mt-2 flex justify-center">
                <Text size="base" className="max-w-xl text-center text-muted">
                  Create a clear, useful resource for your next study session. Share your knowledge with the community.
                </Text>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      <Container as="section" className="py-10 lg:py-14">
        <FadeIn y={16}>
          <Card className="mx-auto max-w-3xl">
            <CardHeader>
              <CardTitle>Material details</CardTitle>
              <CardDescription>Required fields are marked with an asterisk.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <CardContent className="flex flex-col gap-5">
            <Input
              label="Title"
              placeholder="Introduction to Algebra"
              error={errors.title?.message}
              isRequired
              {...register('title')}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <SelectField
                id="subject"
                label="Subject"
                error={errors.subject?.message}
                {...register('subject')}
              >
                <option value="">Select a subject</option>
                {SUBJECTS.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </SelectField>

              <SelectField
                id="difficulty"
                label="Difficulty"
                error={errors.difficulty?.message}
                {...register('difficulty')}
              >
                <option value="">Select a difficulty</option>
                {DIFFICULTY_LEVELS.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </SelectField>
            </div>

            <Textarea
              label="Short description"
              placeholder="Summarize what a learner will understand after reading this material."
              rows={3}
              error={errors.shortDescription?.message}
              isRequired
              {...register('shortDescription')}
            />

            <Textarea
              label="Full content"
              placeholder="Write the complete study material here..."
              rows={12}
              error={errors.content?.message}
              isRequired
              {...register('content')}
            />

            <Input
              label="Cover image URL (optional)"
              type="url"
              placeholder="https://example.com/cover.jpg"
              error={errors.coverImage?.message}
              {...register('coverImage')}
            />

          </CardContent>
          <CardFooter className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link href={ROUTES.manageMaterials} className="w-full sm:w-auto">
              <Button type="button" variant="outline" fullWidth>
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmittingMaterial}
              fullWidth
              className="sm:w-auto"
            >
              {!isSubmittingMaterial && <Save className="mr-1.5 size-4" />}
              Save Material
            </Button>
              </CardFooter>
            </form>
          </Card>
        </FadeIn>
      </Container>
    </>
  );
}
