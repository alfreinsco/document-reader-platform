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
    // Only return active documents to client
    const activeDocuments = documents.filter((doc: any) => doc.status_aktif === true);
    
    // Remove sensitive paths from client
    const safeDocuments = activeDocuments.map((doc: any) => {
      const { file_path, ...rest } = doc;
      return rest;
    });

    return NextResponse.json({ documents: safeDocuments });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}
