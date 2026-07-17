'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/container';
import { Heading, Text } from '@/components/ui/typography';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@studygenie.app',
    href: 'mailto:hello@studygenie.app',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'San Francisco, CA',
    href: null,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
];

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmitStatus = 'idle' | 'success' | 'error';

function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): FormErrors {
    const newErrors: FormErrors = {};

    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!form.subject.trim()) {
      newErrors.subject = 'Please enter a subject.';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    return newErrors;
  }

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitStatus('idle');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section className="border-b border-border bg-gradient-to-b from-background to-surface">
        <Container as="div" className="flex flex-col items-center py-16 text-center lg:py-24">
          <Heading level={1}>Contact Us</Heading>
          <Text size="base" className="mt-4 max-w-2xl text-muted">
            Have a question, suggestion, or just want to say hello? We would love to hear from you.
          </Text>
        </Container>
      </section>

      <Container as="section" className="py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <Heading level={3} className="mb-6">Send Us a Message</Heading>

                {submitStatus === 'success' ? (
                  <div className="flex flex-col items-center gap-4 py-12 text-center">
                    <CheckCircle2 className="size-12 text-success" />
                    <div>
                      <Heading level={4}>Message Sent!</Heading>
                      <Text size="sm" className="mt-1 text-muted">
                        Thank you for reaching out. We will get back to you as soon as possible.
                      </Text>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSubmitStatus('idle')}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : submitStatus === 'error' ? (
                  <div className="flex flex-col items-center gap-4 py-12 text-center">
                    <AlertCircle className="size-12 text-danger" />
                    <div>
                      <Heading level={4}>Something Went Wrong</Heading>
                      <Text size="sm" className="mt-1 text-muted">
                        Could not send your message. Please try again later.
                      </Text>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setSubmitStatus('idle')}
                    >
                      Try Again
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Input
                        label="Name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        error={errors.name}
                        isRequired
                      />
                      <Input
                        label="Email"
                        placeholder="your@email.com"
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        error={errors.email}
                        isRequired
                      />
                    </div>
                    <Input
                      label="Subject"
                      placeholder="How can we help?"
                      value={form.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      error={errors.subject}
                      isRequired
                    />
                    <Textarea
                      label="Message"
                      placeholder="Tell us more about your inquiry..."
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      error={errors.message}
                      rows={5}
                      isRequired
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={isSubmitting}
                    >
                      <Send className="mr-1.5 size-4" />
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {CONTACT_INFO.map((item) => {
              const Icon = item.icon;
              const content = (
                <Card className="transition-shadow hover:shadow-medium">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-sm text-muted transition-colors hover:text-primary"
                        >
                          {item.value}
                        </Link>
                      ) : (
                        <p className="text-sm text-muted">{item.value}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
              return content;
            })}

            <Card>
              <CardContent className="p-5">
                <Heading level={4}>Follow Us</Heading>
                <Text size="sm" className="mt-2 text-muted">
                  Stay connected on social media for the latest updates, tips, and community news.
                </Text>
                <div className="mt-4 flex gap-3">
                  <Link
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-primary hover:text-primary"
                    aria-label="Twitter"
                  >
                    X
                  </Link>
                  <Link
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-primary hover:text-primary"
                    aria-label="GitHub"
                  >
                    GH
                  </Link>
                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-primary hover:text-primary"
                    aria-label="LinkedIn"
                  >
                    LI
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ContactPage;
