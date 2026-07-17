import Link from 'next/link';
import { Clock, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { formatRelativeTime } from '@/utils/format-date';
import { truncateText } from '@/utils/truncate-text';

interface StudyMaterialCardProps {
  id: string;
  title: string;
  subject: string;
  difficulty: string;
  shortDescription: string;
  coverImage?: string;
  authorName?: string;
  createdAt: string;
  className?: string;
}

const difficultyColorMap: Record<string, string> = {
  Beginner: 'bg-success/10 text-success',
  Intermediate: 'bg-warning/10 text-warning',
  Advanced: 'bg-danger/10 text-danger',
};

function StudyMaterialCard({
  id,
  title,
  subject,
  difficulty,
  shortDescription,
  coverImage,
  authorName,
  createdAt,
  className = '',
}: StudyMaterialCardProps) {
  const difficultyClass = difficultyColorMap[difficulty] ?? 'bg-surface text-muted';

  return (
    <Link href={`/materials/${id}`}>
      <Card className={`group h-full transition-shadow hover:shadow-medium ${className}`}>
        {coverImage && (
          <div
            className="h-36 w-full rounded-t-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${coverImage})` }}
            role="img"
            aria-label={title}
          />
        )}
        <CardContent className="flex flex-col gap-3 p-5">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {subject}
            </span>
            <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${difficultyClass}`}>
              {difficulty}
            </span>
          </div>

          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
            {truncateText(title, 60)}
          </h3>

          <p className="text-sm text-muted line-clamp-2">
            {truncateText(shortDescription, 100)}
          </p>

          <div className="mt-auto flex items-center gap-4 pt-2 text-xs text-muted">
            {authorName && (
              <span className="flex items-center gap-1">
                <User className="size-3.5" />
                {authorName}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {formatRelativeTime(createdAt)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export { StudyMaterialCard };
export type { StudyMaterialCardProps };
