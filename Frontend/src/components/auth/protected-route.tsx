'use client';

import { useSession } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { Spinner } from '@/components/common/loading';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: user, isLoading, isError } = useSession();
  const router = useRouter();

  const isUnauthenticated = !isLoading && (!user || isError);

  useEffect(() => {
    if (isUnauthenticated) {
      router.push(ROUTES.login);
    }
  }, [isUnauthenticated, router]);

  if (isLoading || isUnauthenticated) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <Spinner size="lg" label="Loading..." />
      </div>
    );
  }

  return <>{children}</>;
}
