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

  useEffect(() => {
    if (!isLoading && (!user || isError)) {
      router.push(ROUTES.login);
    }
  }, [user, isLoading, isError, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <Spinner size="lg" label="Loading..." />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
