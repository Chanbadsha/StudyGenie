import Link from 'next/link';
import { BookOpen, Globe, ExternalLink } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

const FOOTER_LINKS = [
  {
    title: 'Product',
    links: [
      { href: ROUTES.home, label: 'Home' },
      { href: ROUTES.explore, label: 'Explore' },
      { href: ROUTES.about, label: 'About' },
    ],
  },
  {
    title: 'Support',
    links: [
      { href: ROUTES.contact, label: 'Contact' },
      { href: ROUTES.blog, label: 'Blog' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '#', label: 'Privacy Policy' },
      { href: '#', label: 'Terms of Service' },
    ],
  },
];

function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link
              href={ROUTES.home}
              className="flex items-center gap-2 text-lg font-semibold text-foreground"
            >
              <BookOpen className="size-5 text-primary" />
              <span>StudyGenie</span>
            </Link>
            <p className="mt-3 text-sm text-muted">
              Your AI-powered study companion. Create, organize, and understand study materials with
              intelligent assistance.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <Globe className="size-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-foreground"
                aria-label="Twitter"
              >
                <ExternalLink className="size-5" />
              </a>
            </div>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-xs text-muted">
            &copy; {new Date().getFullYear()} StudyGenie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
