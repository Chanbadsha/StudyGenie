import { Skeleton, Spinner as HeroSpinner } from '@heroui/react';

interface SkeletonCardProps {
  count?: number;
}

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
}

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

function SkeletonCard({ count = 1 }: SkeletonCardProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-lg border border-border bg-background p-6">
          <Skeleton className="mb-4 h-40 w-full rounded-md" />
          <Skeleton className="mb-2 h-4 w-3/4" />
          <Skeleton className="mb-2 h-3 w-full" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
}

function SkeletonTable({ rows = 5, columns = 4 }: SkeletonTableProps) {
  return (
    <div className="rounded-lg border border-border bg-background">
      <div className="border-b border-border p-4">
        <div className="flex gap-4">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1" />
          ))}
        </div>
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="border-b border-border p-4 last:border-b-0">
          <div className="flex gap-4">
            {Array.from({ length: columns }).map((_, j) => (
              <Skeleton key={j} className="h-3 flex-1" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Spinner({ size = 'md', label, className = '' }: SpinnerProps) {
  const sizeMap = { sm: 'sm', md: 'md', lg: 'lg' } as const;
  return (
    <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
      <HeroSpinner size={sizeMap[size]} />
      {label && <p className="text-sm text-muted">{label}</p>}
    </div>
  );
}

export { SkeletonCard, SkeletonTable, Spinner };
export type { SkeletonCardProps, SkeletonTableProps, SpinnerProps };
