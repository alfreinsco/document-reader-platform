'use client';

import { Header } from '@/components/header';
import { DocumentViewer } from '@/components/document-viewer';
import { ShareButton } from '@/components/share-button';
import { use } from 'react';

export default function ReadPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <DocumentViewer slug={slug} />
          <div className="mt-8">
            <ShareButton slug={slug} />
          </div>
        </div>
      </main>
    </>
  );
}
