import { ProtectedRoute } from '@/components/auth/protected-route';

export default function ManageMaterialsLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
