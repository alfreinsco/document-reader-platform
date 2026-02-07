// Simple script to create sample PDF files
// Run: node scripts/create-sample-pdfs.js

const fs = require('fs');
const path = require('path');

// Create documents directory if it doesn't exist
const docsDir = path.join(__dirname, '..', 'public', 'documents');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
  console.log(`Created directory: ${docsDir}`);
}

// Create minimal valid PDF files (very basic PDF structure)
const pdfs = [
  {
    name: 'user-guide.pdf',
    title: 'Panduan Pengguna Sistem',
  },
  {
    name: 'financial-report-q1.pdf',
    title: 'Laporan Keuangan Q1 2024',
  },
  {
    name: 'privacy-policy.pdf',
    title: 'Kebijakan Privasi Perusahaan',
  },
  {
    name: 'backend-manual.pdf',
    title: 'Manual Teknis Sistem Backend',
  },
  {
    name: 'strategic-plan.pdf',
    title: 'Presentasi Rencana Strategis',
  },
];

// Minimal PDF content
function createMinimalPDF(title) {
  const pdf = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 100
>>
stream
BT
/F1 24 Tf
50 750 Td
(${title}) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000244 00000 n
0000000393 00000 n
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
490
%%EOF`;
  return pdf;
}

// Create PDF files
pdfs.forEach((pdf) => {
  const filePath = path.join(docsDir, pdf.name);
  const content = createMinimalPDF(pdf.title);
  fs.writeFileSync(filePath, content);
  console.log(`✓ Created ${pdf.name}`);
});

console.log('\nAll sample PDFs created successfully!');
