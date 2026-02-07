import { Header } from '@/components/header';
import { DocumentViewer } from '@/components/document-viewer';
import { ShareButton } from '@/components/share-button';
import { readFileSync } from 'fs';
import { join } from 'path';

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

export default async function ReadPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

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
