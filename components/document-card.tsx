'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { FileText, ImageIcon, Eye, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

const PdfThumbnail = dynamic(
  () => import('@/components/pdf-thumbnail').then((m) => m.PdfThumbnail),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <div className="rounded-full bg-secondary/20 p-3 sm:p-4">
          <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-secondary" />
        </div>
      </div>
    ),
  }
);

interface Document {
  id: string;
  judul: string;
  deskripsi?: string;
  tanggal: string;
  kategori: string;
  type: 'pdf' | 'image';
  slug: string;
}

export function DocumentCard({ document }: { document: Document }) {
  const Icon = document.type === 'pdf' ? FileText : ImageIcon;
  const proxyUrl = `/api/proxy/${document.slug}`;

  const categoryColors: Record<string, string> = {
    panduan: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    laporan: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    kebijakan: 'bg-green-100 text-green-800 hover:bg-green-200',
    presentasi: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
    screenshot: 'bg-pink-100 text-pink-800 hover:bg-pink-200',
    desain: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
    statistik: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  };

  const categoryColor = categoryColors[document.kategori] || categoryColors.default;

  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg hover:border-secondary/50">
      <div className="aspect-video w-full overflow-hidden bg-muted">
        {document.type === 'pdf' ? (
          <PdfThumbnail slug={document.slug} className="min-h-full" />
        ) : (
          <img
            src={proxyUrl}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        )}
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-semibold text-foreground group-hover:text-secondary transition-colors">
            {document.judul}
          </h3>
          <Badge className={`shrink-0 ${document.type === 'pdf' ? 'bg-secondary' : 'bg-accent'}`}>
            {document.type.toUpperCase()}
          </Badge>
        </div>

        {document.deskripsi && (
          <p className="mb-3 line-clamp-2 text-xs text-muted-foreground">
            {document.deskripsi}
          </p>
        )}

        <div className="mb-3 flex flex-wrap gap-1">
          <Badge variant="outline" className={categoryColor}>
            {document.kategori}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatDate(document.tanggal)}
          </span>
        </div>

        <div className="flex gap-2">
          <Link href={`/read/${document.slug}`} className="flex-1">
            <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Baca
            </Button>
          </Link>
          <Link href={`/share/${document.slug}`}>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
