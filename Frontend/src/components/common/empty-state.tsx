import type { ReactNode } from 'react';
import { EmptyState as HeroEmptyState } from '@heroui/react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

function EmptyState({ icon, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 ${className}`}>
      <HeroEmptyState className="flex flex-col items-center gap-4 text-center">
        {icon && <div className="text-muted">{icon}</div>}
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        {description && <p className="max-w-sm text-sm text-muted">{description}</p>}
        {action && <div className="mt-2">{action}</div>}
      </HeroEmptyState>
    </div>
  );
}

export { EmptyState };
export type { EmptyStateProps };
