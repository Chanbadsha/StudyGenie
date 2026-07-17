import { Container } from '@/components/layout/container';
import { Heading, Text } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { BookOpen, Sparkles, Brain, GraduationCap, FileText, MessageCircle, BarChart3, Star, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { FeatureCard } from '@/components/cards/feature-card';
import { StatisticCard } from '@/components/cards/statistic-card';
import { TestimonialCard } from '@/components/cards/testimonial-card';

const FEATURES = [
  {
    icon: <FileText className="size-5" />,
    title: 'Study Materials',
    description: 'Create and organize your study materials with AI-powered assistance.',
  },
  {
    icon: <Sparkles className="size-5" />,
    title: 'AI Notes Generator',
    description: 'Generate comprehensive notes from your study materials instantly.',
  },
  {
    icon: <Brain className="size-5" />,
    title: 'AI Tutor',
    description: 'Chat with an AI tutor that understands your study context.',
  },
  {
    icon: <BarChart3 className="size-5" />,
    title: 'Learning Analytics',
    description: 'Track your progress with detailed analytics and insights.',
  },
  {
    icon: <GraduationCap className="size-5" />,
    title: 'Smart Organization',
    description: 'Keep your materials organized by subject, topic, and difficulty.',
  },
  {
    icon: <MessageCircle className="size-5" />,
    title: 'Interactive Learning',
    description: 'Engage with dynamic study sessions and practice materials.',
  },
];

const AI_CAPABILITIES = [
  {
    icon: Sparkles,
    title: 'Instant Note Generation',
    description: 'Transform any topic into well-structured study notes with key concepts, definitions, and examples.',
  },
  {
    icon: Brain,
    title: 'Intelligent Tutoring',
    description: 'Get personalized explanations and answers to your questions from an AI that remembers your context.',
  },
  {
    icon: Star,
    title: 'Smart Recommendations',
    description: 'Receive AI-powered suggestions for related topics and materials based on your study patterns.',
  },
];

const STATISTICS = [
  { icon: <BookOpen className="size-6" />, value: '10,000+', label: 'Study Materials' },
  { icon: <Sparkles className="size-6" />, value: '50,000+', label: 'AI Generations' },
  { icon: <GraduationCap className="size-6" />, value: '5,000+', label: 'Active Students' },
  { icon: <Brain className="size-6" />, value: '98%', label: 'Satisfaction Rate' },
];

const TESTIMONIALS = [
  {
    quote: 'StudyGenie has completely transformed how I prepare for exams. The AI notes generator saves me hours of work every week.',
    author: 'Sarah Johnson',
    role: 'Computer Science Student',
    avatar: 'SJ',
  },
  {
    quote: 'The AI tutor is incredibly helpful. It explains complex concepts in a way that actually makes sense.',
    author: 'Michael Chen',
    role: 'Physics Major',
    avatar: 'MC',
  },
  {
    quote: 'I love how organized everything is. Being able to filter and search through materials makes studying so much more efficient.',
    author: 'Emma Williams',
    role: 'Medical Student',
    avatar: 'EW',
  },
];

const FAQ_ITEMS = [
  {
    question: 'What is StudyGenie?',
    answer: 'StudyGenie is an AI-powered study assistant that helps students create, organize, and understand study materials. It combines traditional study tools with advanced AI features like automatic note generation and intelligent tutoring.',
  },
  {
    question: 'Is StudyGenie free to use?',
    answer: 'Yes, StudyGenie offers a free tier with access to core features including study material creation, AI notes generation, and basic AI tutor interactions.',
  },
  {
    question: 'How does the AI Notes Generator work?',
    answer: 'Simply provide a topic, subject, and difficulty level, and our AI will generate comprehensive study notes including key concepts, definitions, examples, and memory tips.',
  },
  {
    question: 'Can I chat with the AI Tutor about my materials?',
    answer: 'Yes, the AI Tutor is context-aware and can reference your study materials to provide personalized explanations and answer questions related to your specific content.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use industry-standard encryption and security practices. Your study materials and personal information are protected and never shared with third parties.',
  },
];

function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background to-surface">
        <Container as="div" className="flex flex-col items-center py-20 lg:py-28">
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
            <p className="mt-4 text-xs text-muted">No credit card required. Free forever.</p>
          </div>
        </Container>
      </section>

      <Container as="section" className="py-16 lg:py-24">
        <div className="mb-12 text-center">
          <Heading level={2}>Everything You Need to Study Better</Heading>
          <Text size="base" className="mt-3 text-muted">
            Powerful features designed to make your study sessions more effective.
          </Text>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </Container>

      <section className="border-y border-border bg-surface">
        <Container as="div" className="py-16 lg:py-24">
          <div className="mb-12 text-center">
            <Heading level={2}>Powered by Advanced AI</Heading>
            <Text size="base" className="mt-3 text-muted">
              Leverage the latest AI technology to accelerate your learning.
            </Text>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {AI_CAPABILITIES.map((capability) => {
              const Icon = capability.icon;
              return (
                <div key={capability.title} className="flex flex-col items-center text-center">
                  <div className="mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-7" />
                  </div>
                  <Heading level={4}>{capability.title}</Heading>
                  <Text size="sm" className="mt-2 text-muted">
                    {capability.description}
                  </Text>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <Container as="section" className="py-16 lg:py-24">
        <div className="mb-12 text-center">
          <Heading level={2}>Trusted by Students Worldwide</Heading>
          <Text size="base" className="mt-3 text-muted">
            Join thousands of students who have transformed their study habits.
          </Text>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATISTICS.map((stat) => (
            <StatisticCard
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </Container>

      <section className="border-y border-border bg-surface">
        <Container as="div" className="py-16 lg:py-24">
          <div className="mb-12 text-center">
            <Heading level={2}>What Our Users Say</Heading>
            <Text size="base" className="mt-3 text-muted">
              Hear from students who use StudyGenie every day.
            </Text>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard
                key={testimonial.author}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                avatar={testimonial.avatar}
              />
            ))}
          </div>
        </Container>
      </section>

      <Container as="section" className="py-16 lg:py-24">
        <div className="mb-12 text-center">
          <Heading level={2}>Frequently Asked Questions</Heading>
          <Text size="base" className="mt-3 text-muted">
            Everything you need to know about StudyGenie.
          </Text>
        </div>
        <div className="mx-auto max-w-3xl space-y-4">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="group rounded-lg border border-border bg-background transition-shadow hover:shadow-low"
            >
              <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-sm font-medium text-foreground">
                {item.question}
                <ChevronDown className="size-4 text-muted transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-border px-6 py-4">
                <p className="text-sm leading-relaxed text-muted">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </Container>

      <section className="border-t border-border bg-primary/5">
        <Container as="div" className="flex flex-col items-center py-16 text-center lg:py-20">
          <Heading level={2}>Ready to Start Learning Smarter?</Heading>
          <Text size="base" className="mt-3 max-w-lg text-muted">
            Join thousands of students who have already transformed their study experience with AI.
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
        </Container>
      </section>
    </>
  );
}

export default Home;
