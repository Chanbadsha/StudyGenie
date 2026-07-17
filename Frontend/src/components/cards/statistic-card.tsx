import type { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StatisticCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  className?: string;
}

function StatisticCard({ icon, value, label, className = '' }: StatisticCardProps) {
  return (
    <Card className={`text-center ${className}`}>
      <CardContent className="flex flex-col items-center gap-2 py-6">
        <div className="inline-flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <p className="text-3xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted">{label}</p>
      </CardContent>
    </Card>
  );
}

export { StatisticCard };
export type { StatisticCardProps };
