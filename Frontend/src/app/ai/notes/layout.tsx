import { ProtectedRoute } from '@/components/auth/protected-route';

export default function AINotesLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
