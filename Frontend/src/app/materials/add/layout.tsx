import { ProtectedRoute } from '@/components/auth/protected-route';

export default function AddMaterialLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
