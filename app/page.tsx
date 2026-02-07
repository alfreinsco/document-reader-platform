'use client';

import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/header';
import { DocumentCard } from '@/components/document-card';
import { FilterSidebar } from '@/components/filter-sidebar';
import { SearchBar } from '@/components/search-bar';
import { Empty } from '@/components/ui/empty';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Document {
  id: string;
  judul: string;
  deskripsi?: string;
  tanggal: string;
  kategori: string;
  type: 'pdf' | 'image';
  slug: string;
}

export default function Home() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedDocType, setSelectedDocType] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch documents
  useEffect(() => {
    async function loadDocuments() {
      try {
        const response = await fetch('/api/documents');
        const data = await response.json();
        setDocuments(data.documents || []);
      } catch (error) {
        console.error('Failed to load documents:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadDocuments();
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(documents.map((doc) => doc.kategori))).sort();
  }, [documents]);

  // Filter and search
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        doc.judul.toLowerCase().includes(searchLower) ||
        (doc.deskripsi?.toLowerCase().includes(searchLower) ?? false);

      if (!matchesSearch) return false;

      // Category filter
      if (selectedCategories.size > 0 && !selectedCategories.has(doc.kategori)) {
        return false;
      }

      // Document type filter
      if (selectedDocType.length > 0 && !selectedDocType.includes(doc.type)) {
        return false;
      }

      return true;
    });
  }, [documents, searchQuery, selectedCategories, selectedDocType]);

  // Sort by date (newest first)
  const sortedDocuments = useMemo(() => {
    return [...filteredDocuments].sort(
      (a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime()
    );
  }, [filteredDocuments]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = new Set(selectedCategories);
    if (checked) {
      newCategories.add(category);
    } else {
      newCategories.delete(category);
    }
    setSelectedCategories(newCategories);
  };

  const handleDocTypeChange = (type: string, checked: boolean) => {
    setSelectedDocType((prev) =>
      checked ? [...prev, type] : prev.filter((t) => t !== type)
    );
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategories(new Set());
    setSelectedDocType([]);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Title & Description */}
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold text-foreground">Dokumen Anda</h2>
            <p className="text-muted-foreground">
              Jelajahi koleksi dokumen PDF dan gambar dengan fitur filter dan pencarian yang mudah.
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* Mobile Filter Toggle */}
          <div className="mb-6 lg:hidden">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full justify-between"
            >
              Filter
              {showFilters ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="mb-8 lg:hidden">
              <FilterSidebar
                categories={categories}
                selectedCategories={selectedCategories}
                selectedDocType={selectedDocType}
                onCategoryChange={handleCategoryChange}
                onDocTypeChange={handleDocTypeChange}
                onReset={handleReset}
              />
            </div>
          )}

          <div className="grid gap-8 lg:grid-cols-4">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <FilterSidebar
                categories={categories}
                selectedCategories={selectedCategories}
                selectedDocType={selectedDocType}
                onCategoryChange={handleCategoryChange}
                onDocTypeChange={handleDocTypeChange}
                onReset={handleReset}
              />
            </div>

            {/* Main content */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-muted-foreground">Memuat dokumen...</div>
                </div>
              ) : sortedDocuments.length > 0 ? (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                  {sortedDocuments.map((doc) => (
                    <DocumentCard key={doc.id} document={doc} />
                  ))}
                </div>
              ) : (
                <Empty
                  title="Tidak ada dokumen"
                  description={
                    searchQuery || selectedCategories.size > 0 || selectedDocType.length > 0
                      ? 'Coba ubah filter atau pencarian Anda'
                      : 'Belum ada dokumen yang tersedia'
                  }
                />
              )}
              
              {/* Result count */}
              {sortedDocuments.length > 0 && (
                <div className="mt-6 text-sm text-muted-foreground">
                  Menampilkan {sortedDocuments.length} dari {documents.length} dokumen
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
