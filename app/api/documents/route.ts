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

export async function GET() {
  try {
    const documents = getDocuments();
    const activeDocuments = documents.filter((doc: { status_aktif?: boolean }) => doc.status_aktif === true);
    const safeDocuments = activeDocuments.map((doc: { file_path?: string; [k: string]: unknown }) => {
      const { file_path, ...rest } = doc;
      return rest;
    });

    return NextResponse.json({ documents: safeDocuments });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}
