import { Container } from '@/components/layout/container';
import { Heading, Text } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, Sparkles, Brain } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

const FEATURES = [
  {
    icon: BookOpen,
    title: 'Study Materials',
    description: 'Create and organize your study materials with AI-powered assistance.',
    href: ROUTES.addMaterial,
  },
  {
    icon: Sparkles,
    title: 'AI Notes Generator',
    description: 'Generate comprehensive notes from your study materials instantly.',
    href: ROUTES.aiNotes,
  },
  {
    icon: Brain,
    title: 'AI Tutor',
    description: 'Chat with an AI tutor that understands your study context.',
    href: ROUTES.aiChat,
  },
];

export default function Home() {
  return (
    <Container as="section" className="flex flex-col items-center py-16 lg:py-24">
      <div className="flex max-w-3xl flex-col items-center text-center">
        <Heading level={1}>
          Learn Smarter with{' '}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI
          </span>
        </Heading>
        <Text size="base" className="mt-6 max-w-xl text-muted">
          StudyGenie helps you create, organize, and understand study materials using
          the power of AI. Transform your learning experience today.
        </Text>
        <div className="mt-8 flex items-center gap-4">
          <Link href={ROUTES.register}>
            <Button variant="primary" size="lg">
              Get Started Free
            </Button>
          </Link>
          <Link href={ROUTES.explore}>
            <Button variant="outline" size="lg">
              Explore Materials
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-20 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <Link key={feature.title} href={feature.href}>
            <Card className="h-full transition-shadow hover:shadow-medium">
              <CardHeader>
                <feature.icon className="size-8 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}
