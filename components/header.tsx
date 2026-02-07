'use client';

import Link from 'next/link';
import { FileText } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <FileText className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <Link href="/" className="block">
                <h1 className="text-xl font-bold text-foreground">DocReader</h1>
              </Link>
              <p className="text-sm text-muted-foreground">Secure Document Platform</p>
            </div>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Beranda
            </Link>
            <Link
              href="/tentang"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Tentang
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
