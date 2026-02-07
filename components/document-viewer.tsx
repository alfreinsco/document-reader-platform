"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  FileText,
  ImageIcon as ImageIcon,
  Maximize2,
  Minimize2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

interface DocumentViewerProps {
  slug: string;
  showControls?: boolean;
}

interface DocumentData {
  id: string;
  judul: string;
  deskripsi?: string;
  tanggal: string;
  kategori: string;
  type: "pdf" | "image";
  slug: string;
}

export function DocumentViewer({
  slug,
  showControls = true,
}: DocumentViewerProps) {
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = useCallback(() => {
    if (!viewerRef.current || typeof window === "undefined") return;
    const doc = window.document;
    if (!doc.fullscreenElement) {
      viewerRef.current
        .requestFullscreen?.()
        .then(() => setIsFullscreen(true))
        .catch(() => {});
    } else {
      doc
        .exitFullscreen?.()
        .then(() => setIsFullscreen(false))
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const doc = window.document;
    const onFullscreenChange = () => {
      setIsFullscreen(!!doc.fullscreenElement);
    };
    doc.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      doc.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    async function loadDocument() {
      try {
        const response = await fetch(`/api/documents/${slug}`);
        if (!response.ok) {
          throw new Error("Dokumen tidak ditemukan atau tidak aktif");
        }
        const data = await response.json();
        setDocument(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat dokumen");
      } finally {
        setIsLoading(false);
      }
    }

    loadDocument();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-muted-foreground">Memuat dokumen...</div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="rounded-lg border border-border bg-card p-8">
        <div className="text-center">
          <p className="text-red-600 font-medium mb-4">
            {error || "Dokumen tidak ditemukan"}
          </p>
          <Link href="/">
            <Button variant="outline">Kembali ke Dokumen</Button>
          </Link>
        </div>
      </div>
    );
  }

  const fileUrl = `/api/proxy/${slug}`;
  const pdfUrlWithNoToolbar =
    document.type === "pdf" ? `${fileUrl}#toolbar=0&navpanes=0` : fileUrl;
  const Icon = document.type === "pdf" ? FileText : ImageIcon;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          {showControls && (
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                Kembali
              </Button>
            </Link>
          )}
        </div>

        <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-5 w-5 text-secondary" />
                <span className="inline-block px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded">
                  {document.type.toUpperCase()}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                {document.judul}
              </h1>
              {document.deskripsi && (
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  {document.deskripsi}
                </p>
              )}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <span>
                  Kategori:{" "}
                  <span className="capitalize font-medium">
                    {document.kategori}
                  </span>
                </span>
                <span>Tanggal: {formatDate(document.tanggal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Viewer Container */}
      <div
        ref={viewerRef}
        className="relative rounded-lg border border-border overflow-hidden bg-white"
        onContextMenu={(e) => e.preventDefault()}
      >
        {document.type === "pdf" ? (
          <>
            <div className="absolute top-2 right-2 z-10">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={toggleFullscreen}
                className="gap-2 shadow-md"
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="h-4 w-4" />
                    Keluar layar penuh
                  </>
                ) : (
                  <>
                    <Maximize2 className="h-4 w-4" />
                    Layar penuh
                  </>
                )}
              </Button>
            </div>
            <div className="bg-gray-100 min-h-[600px] flex items-center justify-center">
              <iframe
                src={pdfUrlWithNoToolbar}
                className="w-full border-0"
                title={document.judul}
                style={{ minHeight: "600px", height: "80vh" }}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          </>
        ) : (
          <div
            className="bg-gray-100 min-h-screen flex items-center justify-center p-4"
            onContextMenu={(e) => e.preventDefault()}
          >
            <img
              src={fileUrl || "/placeholder.svg"}
              alt={document.judul}
              className="max-w-full max-h-full object-contain select-none"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
        )}
      </div>

      {/* Info Footer */}
      {/* <div className="rounded-lg border border-border bg-card p-3 sm:p-4">
        <p className="text-xs sm:text-sm text-muted-foreground">
          ✓ Dokumen ini bersifat read-only dan tidak dapat diunduh. Akses melalui proxy endpoint yang aman.
        </p>
      </div> */}
    </div>
  );
}
