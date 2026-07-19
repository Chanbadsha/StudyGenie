'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/container';
import { Heading, Text } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Mail, CheckCircle2 } from 'lucide-react';
import { FadeIn } from '@/components/common/motion-wrapper';

function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail('');
  }

  return (
    <section className="border-y border-border bg-primary/5">
      <Container as="div" className="flex flex-col items-center py-16 text-center lg:py-20">
        <FadeIn className="flex flex-col items-center">
          <div className="mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Mail className="size-7" />
          </div>
          <Heading level={2}>Stay Updated</Heading>
          <Text size="base" className="mt-3 max-w-lg text-muted">
            Get the latest study tips, AI insights, and product updates delivered to your inbox.
          </Text>

          {submitted ? (
            <div className="mt-8 flex items-center gap-2 text-success">
              <CheckCircle2 className="size-5" />
              <Text size="sm" className="font-medium text-success">
                Thanks for subscribing!
              </Text>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                aria-label="Email for newsletter"
              />
              <Button type="submit" variant="primary" size="lg">
                Subscribe
              </Button>
            </form>
          )}

          <p className="mt-3 text-xs text-muted">No spam. Unsubscribe anytime.</p>
        </FadeIn>
      </Container>
    </section>
  );
}

export { NewsletterSection };
