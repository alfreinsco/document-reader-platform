'use client';

import { use } from 'react';
import { Header } from '@/components/header';
import { ShareButton } from '@/components/share-button';
import { QRCodeGenerator } from '@/components/qr-code';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Share2 } from 'lucide-react';

export default function SharePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/read/${slug}` 
    : `https://docreader.vercel.app/read/${slug}`;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-secondary/20 p-3 sm:p-4">
                <Share2 className="h-6 w-6 sm:h-8 sm:w-8 text-secondary" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Bagikan Dokumen</h1>
            <p className="text-muted-foreground">
              Gunakan fitur di bawah untuk membagikan dokumen ke orang lain
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 sm:p-8 space-y-6 sm:space-y-8">
            {/* QR Code Section */}
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-semibold text-foreground mb-4">QR Code</h2>
              <QRCodeGenerator url={shareUrl} />
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Scan kode QR ini untuk membuka dokumen
              </p>
            </div>

            <div className="h-px bg-border" />

            {/* Share URL Section */}
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-foreground mb-4">Link Publik</h2>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-muted text-foreground text-xs sm:text-sm rounded-lg border border-border font-mono"
                />
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    alert('Link disalin!');
                  }}
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-xs sm:text-sm px-3 sm:px-4"
                >
                  Salin
                </Button>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Info */}
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="text-sm font-medium text-foreground">Keamanan & Privasi</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>✓ Dokumen hanya dapat dibaca, tidak dapat diunduh</li>
                <li>✓ Hanya dokumen aktif yang dapat diakses</li>
                <li>✓ Semua akses melalui endpoint proxy yang aman</li>
                <li>✓ Tidak ada pelacakan download file</li>
              </ul>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-6 sm:mt-8 flex justify-center">
            <Link href="/">
              <Button variant="outline" className="text-xs sm:text-sm bg-transparent">Kembali ke Dokumen</Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
