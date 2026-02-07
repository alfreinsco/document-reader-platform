import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Load documents from JSON
function getDocuments() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'documents.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return data.documents;
  } catch {
    return [];
  }
}

// Get document by slug with security checks
function getDocumentBySlug(slug: string) {
  const documents = getDocuments();
  const doc = documents.find((d: any) => d.slug === slug);
  return doc;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // Validate document exists and is active
    const document = getDocumentBySlug(slug);
    if (!document || !document.status_aktif) {
      return NextResponse.json(
        { error: 'Document not found or inactive' },
        { status: 404 }
      );
    }

    // Return document metadata (not the file itself)
    const { file_path, ...safeData } = document;
    return NextResponse.json(safeData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch document' },
      { status: 500 }
    );
  }
}
