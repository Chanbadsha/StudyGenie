import { Container } from '@/components/layout/container';
import { Heading, Text } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Target, Shield, Users, GraduationCap, BookOpen, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { FeatureCard } from '@/components/cards/feature-card';
import { StatisticCard } from '@/components/cards/statistic-card';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/common/motion-wrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - StudyGenie',
  description:
    'Learn about StudyGenie\'s mission to transform learning with AI-powered study tools.',
};

const VALUES = [
  {
    icon: <Target className="size-5" />,
    title: 'Our Mission',
    description: 'To make quality education accessible to everyone by leveraging AI technology to create personalized, efficient learning experiences.',
  },
  {
    icon: <Shield className="size-5" />,
    title: 'Our Vision',
    description: 'A world where every student has access to intelligent study tools that adapt to their learning style and pace.',
  },
  {
    icon: <Users className="size-5" />,
    title: 'Our Community',
    description: 'A growing community of learners, educators, and innovators committed to transforming the way people study.',
  },
];

const STATS = [
  { icon: <GraduationCap className="size-6" />, value: '10K+', label: 'Active Students' },
  { icon: <BookOpen className="size-6" />, value: '50K+', label: 'Study Materials' },
  { icon: <Sparkles className="size-6" />, value: '100K+', label: 'AI Notes Generated' },
];

const TEAM = [
  { role: 'Founder & CEO', initials: 'AD', name: 'Alex Devlin' },
  { role: 'CTO', initials: 'SK', name: 'Sarah Kim' },
  { role: 'Head of AI', initials: 'MJ', name: 'Marcus Johnson' },
  { role: 'Lead Designer', initials: 'EC', name: 'Emily Chen' },
];

function AboutPage() {
  return (
    <>
      <section className="border-b border-border bg-gradient-to-b from-background to-surface">
        <Container as="div" className="flex flex-col items-center py-16 text-center lg:py-24">
          <FadeIn className="flex flex-col items-center">
            <Heading level={1}>About StudyGenie</Heading>
            <Text size="base" className="mt-4 max-w-2xl text-muted">
              We are on a mission to transform the way students learn by combining the power of artificial
              intelligence with proven study techniques.
            </Text>
          </FadeIn>
        </Container>
      </section>

      <Container as="section" className="py-16 lg:py-24">
        <FadeIn className="mb-12 text-center">
          <Heading level={2}>What Drives Us</Heading>
          <Text size="base" className="mt-3 text-muted">
            Our core values guide everything we build.
          </Text>
        </FadeIn>
        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {VALUES.map((value) => (
            <StaggerItem key={value.title}>
              <FeatureCard
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>

      <section className="border-y border-border bg-surface">
        <Container as="div" className="py-16 lg:py-24">
          <FadeIn className="mb-12 text-center">
            <Heading level={2}>Our Story</Heading>
            <Text size="base" className="mt-3 text-muted">
              How StudyGenie came to be.
            </Text>
          </FadeIn>
          <StaggerContainer className="mx-auto max-w-3xl">
            <StaggerItem>
              <Text size="base" className="leading-relaxed text-muted">
                StudyGenie was born from a simple observation: students spend too much time organizing
                their study materials and not enough time actually learning. We saw an opportunity to
                use AI to automate the tedious parts of studying, freeing students to focus on what
                really matters — understanding and retaining knowledge.
              </Text>
            </StaggerItem>
            <StaggerItem>
              <Text size="base" className="mt-4 leading-relaxed text-muted">
                What started as a small project quickly grew into a comprehensive platform used by
                thousands of students worldwide. Today, StudyGenie combines powerful AI features
                with an intuitive interface to create the ultimate study companion.
              </Text>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </section>

      <Container as="section" className="py-16 lg:py-24">
        <FadeIn className="mb-12 text-center">
          <Heading level={2}>By the Numbers</Heading>
          <Text size="base" className="mt-3 text-muted">
            Our growing impact in the learning community.
          </Text>
        </FadeIn>
        <StaggerContainer className="grid gap-6 sm:grid-cols-3">
          {STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <StatisticCard
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>

      <section className="border-y border-border bg-surface">
        <Container as="div" className="py-16 lg:py-24">
          <FadeIn className="mb-12 text-center">
            <Heading level={2}>Our Team</Heading>
            <Text size="base" className="mt-3 text-muted">
              The people behind StudyGenie.
            </Text>
          </FadeIn>
          <StaggerContainer className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
            {TEAM.map((member) => (
              <StaggerItem key={member.name}>
                <Card className="transition-shadow hover:shadow-medium">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {member.initials}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{member.name}</p>
                      <p className="text-sm text-muted">{member.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      <section className="border-t border-border bg-gradient-to-b from-background to-surface">
        <Container as="div" className="flex flex-col items-center py-16 text-center lg:py-20">
          <FadeIn className="flex flex-col items-center">
            <Heading level={2}>Join Us on This Journey</Heading>
            <Text size="base" className="mt-3 max-w-lg text-muted">
              Start learning smarter today and be part of a community that is shaping the future of education.
            </Text>
            <div className="mt-8 flex items-center gap-4">
              <Link href={ROUTES.register}>
                <Button variant="primary" size="lg">
                  Get Started Free
                </Button>
              </Link>
              <Link href={ROUTES.contact}>
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}

export default AboutPage;
