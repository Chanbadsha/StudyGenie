"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { Heading, Text } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import { FaXTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { FadeIn } from "@/components/common/motion-wrapper";
import Link from "next/link";

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@studygenie.app",
    href: "mailto:hello@studygenie.app",
    description:
      "Send us an email anytime and we will respond within 24 hours.",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: null,
    description:
      "Our team is based in Dhaka, serving students across Bangladesh.",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+880 1234-567890",
    href: "tel:+8801234567890",
    description: "Give us a call during business hours (Sat–Thu, 9AM–6PM).",
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

type SubmitStatus = "idle" | "success" | "error";

function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): FormErrors {
    const newErrors: FormErrors = {};

    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.subject.trim()) {
      newErrors.subject = "Please enter a subject.";
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
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
    setSubmitStatus("idle");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-primary/5 via-background to-surface">
        {/* Background */}
        <div
          className="absolute inset-0 -z-10 opacity-40"
          style={{
            backgroundImage: `
        radial-gradient(circle at 25% 40%, var(--color-primary) 0%, transparent 40%),
        radial-gradient(circle at 75% 60%, var(--color-primary) 0%, transparent 40%)
      `,
          }}
        />

        <Container
          as="div"
          className="relative z-10 flex flex-col items-center py-16 text-center lg:py-20"
        >
          <FadeIn className="flex max-w-3xl flex-col items-center">
            {/* Icon */}
            <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/10 bg-primary/10 shadow-sm">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>

            {/* Heading */}
            <Heading
              level={1}
              className="text-4xl font-bold tracking-tight sm:text-5xl"
            >
              Get in Touch
            </Heading>

            {/* Subtitle */}
            <Text
              size="base"
              className="mt-4 max-w-2xl text-center text-lg leading-8 text-muted"
            >
              Have a question, feedback, or need help with your studies?
              <span className="font-semibold text-primary">
                {" "}
                We&apos;re here to help.
              </span>
            </Text>

            {/* Description */}
            <Text
              size="base"
              className="mt-3 max-w-3xl text-center leading-7 text-muted/75"
            >
              Whether you&apos;re looking for support, want to share feedback,
              or simply have a question, our team is always happy to assist and
              typically responds within{" "}
              <span className="font-medium text-foreground">24 hours.</span>
            </Text>
          </FadeIn>
        </Container>
      </section>

      <Container as="section" className="py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          <FadeIn y={16} className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <Heading level={3} className="mb-6">
                  Send Us a Message
                </Heading>

                {submitStatus === "success" ? (
                  <div className="flex flex-col items-center gap-4 py-12 text-center">
                    <CheckCircle2 className="size-12 text-success" />
                    <div>
                      <Heading level={4}>Message Sent!</Heading>
                      <Text size="sm" className="mt-1 text-center text-muted">
                        Thank you for reaching out. We will get back to you as
                        soon as possible.
                      </Text>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSubmitStatus("idle")}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : submitStatus === "error" ? (
                  <div className="flex flex-col items-center gap-4 py-12 text-center">
                    <AlertCircle className="size-12 text-danger" />
                    <div>
                      <Heading level={4}>Something Went Wrong</Heading>
                      <Text size="sm" className="mt-1 text-center text-muted">
                        Could not send your message. Please try again later.
                      </Text>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setSubmitStatus("idle")}
                    >
                      Try Again
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Input
                        label="Name"
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        error={errors.name}
                        isRequired
                      />

                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        error={errors.email}
                        isRequired
                      />
                    </div>

                    <Input
                      label="Subject"
                      placeholder="What can we help you with?"
                      value={form.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      error={errors.subject}
                      isRequired
                    />

                    <Textarea
                      label="Message"
                      placeholder="Tell us more about your question or feedback..."
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      error={errors.message}
                      rows={6}
                      isRequired
                    />

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm leading-6 text-muted">
                        We usually respond within{" "}
                        <span className="font-semibold text-foreground">
                          24 hours.
                        </span>
                      </p>

                      <Button
                        type="submit"
                        variant="primary"
                        isLoading={isSubmitting}
                        className="w-full sm:w-auto sm:min-w-[180px]"
                      >
                        {!isSubmitting && <Send className="mr-2 size-4" />}
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </FadeIn>

          <div className="space-y-6">
            {CONTACT_INFO.map((item, i) => {
              const Icon = item.icon;

              const gradients = [
                "from-primary/10 via-background to-background",
                "from-success/10 via-background to-background",
                "from-warning/10 via-background to-background",
              ];

              return (
                <FadeIn key={item.label} y={16} delay={i * 0.08}>
                  <Card
                    className={`overflow-hidden border border-border/60 bg-gradient-to-br ${gradients[i]} shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                  >
                    <CardContent className="flex flex-col items-center gap-4 p-7 text-center">
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-background/50 bg-background/90 shadow-sm backdrop-blur">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>

                      <div className="space-y-2">
                        <p className="text-base font-semibold text-foreground">
                          {item.label}
                        </p>

                        {item.href ? (
                          <Link
                            href={item.href}
                            className="block text-sm font-medium text-muted transition-colors hover:text-primary"
                          >
                            {item.value}
                          </Link>
                        ) : (
                          <p className="text-sm font-medium text-muted">
                            {item.value}
                          </p>
                        )}

                        <p className="text-sm leading-6 text-muted/70">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              );
            })}

            <FadeIn y={16} delay={0.3}>
              <Card className="border border-border/60 shadow-sm transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-7 text-center">
                  <Heading level={4}>Follow Us</Heading>

                  <Text size="sm" className="mt-2 leading-6 text-muted">
                    Stay connected for product updates, study tips, and
                    community news.
                  </Text>

                  <div className="mt-6 flex justify-center gap-4">
                    {[
                      {
                        href: "https://twitter.com",
                        icon: FaXTwitter,
                        label: "Twitter",
                      },
                      {
                        href: "https://github.com",
                        icon: FaGithub,
                        label: "GitHub",
                      },
                      {
                        href: "https://linkedin.com",
                        icon: FaLinkedinIn,
                        label: "LinkedIn",
                      },
                    ].map(({ href, icon: Icon, label }) => (
                      <Link
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background text-muted transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary/10 hover:text-primary"
                      >
                        <Icon className="h-5 w-5" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ContactPage;
