import { ProtectedRoute } from '@/components/auth/protected-route';

export default function AIChatLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
