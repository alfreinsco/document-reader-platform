import { Header } from '@/components/header';
import { QRCodeGenerator } from '@/components/qr-code';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Share2 } from 'lucide-react';
import { readFileSync } from 'fs';
import { join } from 'path';
import { SharePageClient } from './share-page-client';

function getDocumentSlugs(): string[] {
  try {
    const path = join(process.cwd(), 'public', 'data', 'documents.json');
    const data = readFileSync(path, 'utf-8');
    const json = JSON.parse(data) as { documents: { slug: string }[] };
    return (json.documents ?? []).map((d) => d.slug);
  } catch {
    return [];
  }
}

export function generateStaticParams() {
  return getDocumentSlugs().map((slug) => ({ slug }));
}

export default async function SharePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <SharePageClient slug={slug} />;
}
