import Link from 'next/link';
import { BookOpen, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Heading, Text } from '@/components/ui/typography';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
      <div className="mb-4 inline-flex size-16 items-center justify-center rounded-2xl bg-primary/10">
        <BookOpen className="size-8 text-primary" />
      </div>
      <Heading level={1} className="text-7xl text-primary">404</Heading>
      <Text size="base" className="mt-4 text-muted">
        Page not found
      </Text>
      <Text size="base" className="mt-1 max-w-md text-center text-muted">
        The page you are looking for does not exist or has been moved.
      </Text>
      <div className="mt-8">
        <Link href="/">
          <Button variant="primary" size="lg">
            <Home className="mr-1.5 size-4" />
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
