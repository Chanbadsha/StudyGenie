import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  className?: string;
}

function TestimonialCard({ quote, author, role, avatar, className = '' }: TestimonialCardProps) {
  return (
    <Card className={`h-full ${className}`}>
      <CardContent className="flex flex-col gap-4 py-6">
        <Quote className="size-8 text-primary/30" />
        <blockquote className="text-sm leading-relaxed text-foreground">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="mt-auto flex items-center gap-3 pt-2">
          <div className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {avatar}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{author}</p>
            <p className="text-xs text-muted">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { TestimonialCard };
export type { TestimonialCardProps };
