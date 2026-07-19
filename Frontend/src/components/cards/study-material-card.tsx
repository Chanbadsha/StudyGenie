import { memo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { formatRelativeTime } from '@/utils/format-date';
import { truncateText } from '@/utils/truncate-text';

const CARD_PLACEHOLDER = 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=300&fit=crop';

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

const StudyMaterialCard = memo(function StudyMaterialCard({
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
  const [imgFailed, setImgFailed] = useState(false);
  const imageSrc = coverImage && !imgFailed ? coverImage : CARD_PLACEHOLDER;

  return (
    <Link href={`/materials/${id}`}>
      <Card className={`group h-full transition-shadow hover:shadow-medium ${className}`}>
        <div className="relative h-36 w-full">
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="rounded-t-lg object-cover"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        </div>
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
});

export { StudyMaterialCard };
export type { StudyMaterialCardProps };
