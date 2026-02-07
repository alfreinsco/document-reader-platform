'use client';

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Worker untuk PDF.js (wajib)
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

interface PdfThumbnailProps {
  slug: string;
  className?: string;
}

export function PdfThumbnail({ slug, className = '' }: PdfThumbnailProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const pdfUrl = `/api/proxy/${slug}`;

  useEffect(() => {
    setError(false);
  }, [slug]);

  const onLoadSuccess = ({ numPages: n }: { numPages: number }) => {
    setNumPages(n);
  };

  const onLoadError = () => {
    setError(true);
  };

  if (error) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-muted ${className}`}
      >
        <span className="text-muted-foreground text-xs">Preview tidak tersedia</span>
      </div>
    );
  }

  return (
    <div className={`flex h-full w-full items-center justify-center overflow-hidden bg-muted ${className}`}>
      <Document
        file={pdfUrl}
        onLoadSuccess={onLoadSuccess}
        onLoadError={onLoadError}
        loading={
          <div className="flex h-full w-full items-center justify-center text-muted-foreground text-xs">
            Memuat...
          </div>
        }
      >
        {numPages !== null && (
          <Page
            pageNumber={1}
            width={320}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="!max-h-full !w-auto shadow-sm"
          />
        )}
      </Document>
    </div>
  );
}
