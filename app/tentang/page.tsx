'use client';

import { Header } from '@/components/header';
import {
  FileText,
  Search,
  Filter,
  Share2,
  BookOpen,
  Shield,
  LayoutGrid,
  Download,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

// Ikon brand untuk share (inline SVG)
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.885-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.265.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.058 1.645-.07 4.849-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

function AppShareSection() {
  const qrContainerRef = useRef<HTMLDivElement>(null);
  const [appUrl, setAppUrl] = useState('');

  useEffect(() => {
    setAppUrl(typeof window !== 'undefined' ? window.location.origin : '');
  }, []);

  const handleDownloadQR = () => {
    const canvas = qrContainerRef.current?.querySelector('canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'docreader-qrcode.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const shareText = 'DocReader - Platform dokumen aman. Baca dan bagikan dokumen dengan mudah.';
  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + appUrl)}`,
      '_blank'
    );
  };
  const handleFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appUrl)}`,
      '_blank'
    );
  };
  const handleInstagram = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(appUrl);
      alert('Link aplikasi sudah disalin! Tempel di Instagram (bio, caption, atau story) untuk dibagikan.');
    }
  };

  return (
    <section className="mb-12 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-foreground">
        Bagikan Aplikasi
      </h2>
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-around">
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-muted-foreground">QR Code aplikasi</p>
          <div
            ref={qrContainerRef}
            className="rounded-lg border border-border bg-white p-2 inline-block"
          >
            {appUrl ? (
              <QRCodeCanvas
                value={appUrl}
                size={200}
                level="M"
                includeMargin={false}
              />
            ) : (
              <div
                className="bg-muted animate-pulse rounded"
                style={{ width: 200, height: 200 }}
              />
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadQR}
            disabled={!appUrl}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Unduh QR Code
          </Button>
        </div>
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-muted-foreground">Bagikan ke media sosial</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={handleWhatsApp}
              disabled={!appUrl}
              className="gap-2 bg-[#25D366] text-white hover:bg-[#20bd5a] hover:text-white"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleFacebook}
              disabled={!appUrl}
              className="gap-2 bg-[#1877F2] text-white hover:bg-[#166fe5] hover:text-white"
            >
              <FacebookIcon className="h-5 w-5" />
              Facebook
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleInstagram}
              disabled={!appUrl}
              className="gap-2 bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#dc2743] text-white hover:opacity-90 hover:text-white"
            >
              <InstagramIcon className="h-5 w-5" />
              Instagram
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TentangPage() {
  const features = [
    {
      icon: LayoutGrid,
      title: 'Koleksi Dokumen',
      description:
        'Jelajahi dokumen PDF dan gambar dalam satu tempat. Semua dokumen terorganisir dengan rapi dan mudah diakses.',
    },
    {
      icon: Search,
      title: 'Pencarian',
      description:
        'Cari dokumen berdasarkan judul atau deskripsi. Hasil pencarian ditampilkan secara instan untuk pengalaman yang lancar.',
    },
    {
      icon: Filter,
      title: 'Filter',
      description:
        'Saring dokumen menurut kategori dan tipe file (PDF atau gambar). Filter dapat dikombinasikan sesuai kebutuhan.',
    },
    {
      icon: BookOpen,
      title: 'Pembaca Dokumen',
      description:
        'Baca dokumen langsung di peramban dengan tampilan yang nyaman. Mendukung PDF dengan navigasi halaman yang mudah.',
    },
    {
      icon: Share2,
      title: 'Berbagi Link',
      description:
        'Bagikan dokumen melalui link unik. Penerima dapat membuka dan membaca tanpa perlu login.',
    },
    {
      icon: Shield,
      title: 'Aman & Terpercaya',
      description:
        'Platform dirancang dengan pertimbangan keamanan. Dokumen dilayani melalui proxy untuk kontrol akses yang lebih baik.',
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <FileText className="h-8 w-8" />
            </div>
            <h1 className="mb-3 text-3xl font-bold text-foreground sm:text-4xl">
              Tentang Aplikasi
            </h1>
            <p className="text-lg text-muted-foreground">
              DocReader adalah platform untuk membaca, menjelajahi, dan berbagi dokumen dengan mudah.
            </p>
          </div>

          {/* Deskripsi */}
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              Apa itu DocReader?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              DocReader (Secure Document Platform) memungkinkan Anda mengelola koleksi dokumen—seperti bahan Pendalaman Alkitab (PA), panduan, atau arsip—dalam satu aplikasi. Anda dapat mencari dokumen, memfilter berdasarkan kategori atau tipe file, membaca PDF di peramban, serta berbagi tautan ke dokumen dengan orang lain.
            </p>
          </section>

          {/* Fitur */}
          <section className="mb-12">
            <h2 className="mb-6 text-xl font-semibold text-foreground">
              Fitur Utama
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="rounded-lg border border-border bg-card p-5 text-card-foreground shadow-sm transition-colors hover:bg-muted/50"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 font-medium text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Cara Menggunakan (ringkas) */}
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-semibold text-foreground">
              Cara Menggunakan
            </h2>
            <ol className="list-decimal space-y-3 pl-5 text-muted-foreground">
              <li>
                <strong className="text-foreground">Beranda</strong> — Lihat daftar dokumen. Gunakan kotak pencarian untuk mencari dan panel filter untuk menyaring menurut kategori atau tipe file.
              </li>
              <li>
                <strong className="text-foreground">Membaca</strong> — Klik kartu dokumen untuk membuka dan membacanya di peramban.
              </li>
              <li>
                <strong className="text-foreground">Berbagi</strong> — Di halaman baca, gunakan tombol berbagi untuk mendapatkan link yang bisa Anda kirim ke orang lain.
              </li>
            </ol>
          </section>

          {/* QR Code & Bagikan ke media sosial */}
          <AppShareSection />

          {/* CTA */}
          <div className="flex justify-center border-t border-border pt-8">
            <Button asChild>
              <Link href="/">Kembali ke Beranda</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
