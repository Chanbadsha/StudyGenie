import { Heading as HeroHeading, Paragraph } from '@heroui/react';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
  level?: HeadingLevel;
  children: React.ReactNode;
  className?: string;
}

interface TextProps {
  size?: 'base' | 'sm' | 'xs';
  children: React.ReactNode;
  className?: string;
  color?: 'default' | 'muted';
}

const headingStyles: Record<HeadingLevel, string> = {
  1: 'text-4xl font-bold tracking-tight',
  2: 'text-3xl font-semibold tracking-tight',
  3: 'text-2xl font-semibold',
  4: 'text-xl font-medium',
  5: 'text-lg font-medium',
  6: 'text-base font-medium',
};

function Heading({ level = 1, children, className = '' }: HeadingProps) {
  return (
    <HeroHeading level={level} className={`${headingStyles[level]} ${className}`}>
      {children}
    </HeroHeading>
  );
}

function Text({ size = 'base', children, className = '', color = 'default' }: TextProps) {
  const colorStyles = color === 'muted' ? 'text-muted' : 'text-foreground';
  return (
    <Paragraph size={size} className={`${colorStyles} ${className}`}>
      {children}
    </Paragraph>
  );
}

export { Heading, Text };
export type { HeadingProps, TextProps };
