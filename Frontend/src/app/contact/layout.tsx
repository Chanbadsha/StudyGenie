import { ProtectedRoute } from '@/components/auth/protected-route';

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
