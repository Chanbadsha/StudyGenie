import { ProtectedRoute } from '@/components/auth/protected-route';

export default function NotesLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
