import {
  Card as HeroCard,
  CardHeader as HeroCardHeader,
  CardTitle as HeroCardTitle,
  CardDescription as HeroCardDescription,
  CardContent as HeroCardContent,
  CardFooter as HeroCardFooter,
} from '@heroui/react';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

function Card({ children, className = '' }: CardProps) {
  return <HeroCard className={className}>{children}</HeroCard>;
}

function CardHeader({ children, className = '' }: CardHeaderProps) {
  return <HeroCardHeader className={className}>{children}</HeroCardHeader>;
}

function CardTitle({ children, className = '' }: CardTitleProps) {
  return <HeroCardTitle className={className}>{children}</HeroCardTitle>;
}

function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return <HeroCardDescription className={className}>{children}</HeroCardDescription>;
}

function CardContent({ children, className = '' }: CardContentProps) {
  return <HeroCardContent className={className}>{children}</HeroCardContent>;
}

function CardFooter({ children, className = '' }: CardFooterProps) {
  return <HeroCardFooter className={className}>{children}</HeroCardFooter>;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
};
