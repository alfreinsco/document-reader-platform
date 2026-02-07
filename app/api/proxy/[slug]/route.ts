import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';

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

    // Security: Validate document exists and is active
    const document = getDocumentBySlug(slug);
    if (!document || !document.status_aktif) {
      return NextResponse.json(
        { error: 'Document not found or inactive' },
        { status: 404 }
      );
    }

    // Security: Prevent directory traversal
    const file_path = document.file_path;
    if (file_path.includes('..') || file_path.includes('//')) {
      return NextResponse.json(
        { error: 'Invalid file path' },
        { status: 400 }
      );
    }

    // Serve file from public directory
    const fullPath = path.join(process.cwd(), 'public', file_path);
    
    // Security: Verify file is within public directory
    const publicDir = path.join(process.cwd(), 'public');
    if (!fullPath.startsWith(publicDir)) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // Read file
    const fileContents = fs.readFileSync(fullPath);
    const mimeType = mime.lookup(fullPath) || 'application/octet-stream';

    // Set appropriate headers
    const headers = new Headers();
    headers.set('Content-Type', mimeType);
    headers.set('Content-Disposition', 'inline'); // Display in browser, not download
    headers.set('Cache-Control', 'public, max-age=3600');
    
    return new Response(fileContents, { headers });
  } catch (error) {
    console.error('[File Proxy Error]', error);
    return NextResponse.json(
      { error: 'Failed to serve file' },
      { status: 500 }
    );
  }
}
