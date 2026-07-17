'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui';
import { ROUTES } from '@/constants/routes';
import { useSession, useLogout } from '@/hooks/useAuth';

const NAV_LINKS = [
  { href: ROUTES.home, label: 'Home' },
  { href: ROUTES.explore, label: 'Explore' },
  { href: ROUTES.about, label: 'About' },
] as const;

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: user } = useSession();
  const logout = useLogout();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={ROUTES.home}
          className="flex items-center gap-2 text-xl font-semibold text-foreground"
        >
          <BookOpen className="size-6 text-primary" />
          <span>StudyGenie</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link href={ROUTES.dashboard}>
                <Button variant="ghost" size="sm">
                  <LayoutDashboard className="mr-1.5 size-4" />
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                isLoading={logout.isPending}
                onClick={() => logout.mutate()}
              >
                <LogOut className="mr-1.5 size-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href={ROUTES.login}>
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href={ROUTES.register}>
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="flex items-center md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-border md:hidden">
          <div className="space-y-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              {user ? (
                <>
                  <Link href={ROUTES.dashboard} onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    isLoading={logout.isPending}
                    onClick={() => {
                      logout.mutate();
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href={ROUTES.login} onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href={ROUTES.register} onClick={() => setIsMenuOpen(false)}>
                    <Button variant="primary" size="sm" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export { Navbar };
