# DocReader - Fitur-Fitur Project

## Overview
DocReader adalah platform pembaca dokumen yang aman dan modern dengan fitur filter, pencarian, dan sharing. Aplikasi ini memastikan bahwa file hanya dapat dibaca, tidak dapat diunduh, dan semua akses melalui backend proxy yang aman.

## Fitur Utama

### 1. Manajemen Data Dokumen
- **Sumber Data**: File JSON (`public/data/documents.json`)
- **Format Data**:
  - `id`: Identifier unik dokumen
  - `judul`: Nama dokumen
  - `deskripsi`: Deskripsi optional
  - `tanggal`: Timestamp dokumen
  - `status_aktif`: Boolean untuk mengaktifkan/menonaktifkan dokumen
  - `kategori`: Kategori dokumen (panduan, laporan, kebijakan, dll)
  - `type`: Tipe file (pdf atau image)
  - `file_path`: Path internal file (tidak diekspos ke client)
  - `slug`: URL-friendly identifier untuk sharing

### 2. Halaman Utama (Home)
- **List Dokumen**: Menampilkan semua dokumen aktif dalam grid responsif
- **Search**: Pencarian real-time berdasarkan judul dan deskripsi
- **Filter Sidebar**:
  - Filter berdasarkan kategori (multi-select)
  - Filter berdasarkan tipe dokumen (PDF/Image)
  - Tombol reset untuk menghapus semua filter
  - Toggle filter untuk tampilan mobile
- **Responsive**: Sidebar tersembunyi di mobile, dapat diaktifkan dengan toggle button

### 3. Document Card
- Menampilkan preview dokumen dengan ikon tipe file
- Badge kategori dengan warna berbeda untuk setiap kategori
- Tanggal upload/update
- Tombol "Baca" untuk membuka dokumen
- Tombol "Bagikan" untuk akses sharing page

### 4. Halaman Pembaca Dokumen (`/read/[slug]`)
- **PDF Viewer**: Menampilkan PDF menggunakan iframe
- **Image Viewer**: Menampilkan gambar dengan responsif
- **Metadata Dokumen**: Judul, deskripsi, kategori, dan tanggal
- **Security Measures**:
  - Context menu disabled (right-click protection)
  - Drag-select disabled pada images
  - Content-Disposition: inline (mencegah download)
- **Share Button**: Quick access ke fitur sharing

### 5. Fitur Share/Bagikan
- **Share Link**: URL publik berbasis slug (`/read/{slug}`)
  - Copy to clipboard dengan visual feedback
  - URL publik tetap read-only tanpa akses download
- **QR Code**: Generate QR code dari URL share
  - Tampilkan QR code di dialog dan share page
  - User dapat scan untuk membuka dokumen
- **Social Media Integration**:
  - WhatsApp: Share dengan text preview
  - Facebook: Share dengan og:meta support
  - Instagram: Copy link ke clipboard dan instruksi manual

### 6. Security & Access Control
- **Proxy Endpoint** (`/api/proxy/[slug]`):
  - Validasi dokumen aktif sebelum serve
  - Directory traversal prevention
  - Path validation untuk file safety
  - MIME type detection otomatis
  - Content-Disposition: inline (prevent download)

- **API Endpoints Security**:
  - `/api/documents`: List dokumen aktif saja
  - `/api/documents/[slug]`: Validasi status aktif, hide file_path
  - `/api/proxy/[slug]`: Serve file dengan security checks

### 7. UI/UX Features
- **Modern Design**:
  - Clean, minimalist interface
  - Color scheme: Blue primary (#0091ff), gray neutrals
  - Consistent spacing dan typography

- **Responsive Design**:
  - Mobile-first approach
  - Breakpoints: sm (640px), lg (1024px)
  - Sidebar toggle di mobile
  - Flexible grid layouts
  - Touch-friendly button sizes

- **Empty States**:
  - Custom empty state saat tidak ada dokumen
  - Helpful messages untuk filter/search results

## API Routes

### GET `/api/documents`
Fetch semua dokumen aktif (tanpa file_path).

**Response**:
```json
{
  "documents": [
    {
      "id": "doc-001",
      "judul": "Judul Dokumen",
      "deskripsi": "Deskripsi...",
      "tanggal": "2024-01-15T10:30:00Z",
      "kategori": "panduan",
      "type": "pdf",
      "slug": "judul-dokumen"
    }
  ]
}
```

### GET `/api/documents/[slug]`
Fetch metadata dokumen spesifik.

**Response**:
```json
{
  "id": "doc-001",
  "judul": "Judul Dokumen",
  "deskripsi": "Deskripsi...",
  "tanggal": "2024-01-15T10:30:00Z",
  "kategori": "panduan",
  "type": "pdf",
  "slug": "judul-dokumen"
}
```

### GET `/api/proxy/[slug]`
Serve file dokumen dengan security checks.

**Security**:
- Validasi dokumen aktif
- Prevent directory traversal
- MIME type detection
- Content-Disposition: inline

## Development Setup

### 1. Data Entry
Edit `public/data/documents.json` untuk menambah/edit dokumen:
```json
{
  "id": "doc-xxx",
  "judul": "Judul Dokumen",
  "deskripsi": "Optional description",
  "tanggal": "2024-01-15T10:30:00Z",
  "status_aktif": true,
  "kategori": "panduan",
  "type": "pdf",
  "file_path": "/documents/file-name.pdf",
  "slug": "unique-slug-name"
}
```

### 2. File Storage
- Simpan file di folder `public/documents/`
- Update `file_path` di data JSON sesuai lokasi file
- File path bersifat internal (tidak diekspos ke frontend)

### 3. Running Development Server
```bash
npm run dev
```
Akses aplikasi di `http://localhost:3000`

## Kategori Default
- `panduan`: Documentation & guides
- `laporan`: Reports & analytics
- `kebijakan`: Policies & compliance
- `presentasi`: Presentations
- `screenshot`: Screenshots & mockups
- `desain`: Design assets
- `statistik`: Statistics & data

## Teknologi
- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Shadcn/ui, Tailwind CSS
- **Storage**: JSON file-based (public/data/documents.json)
- **Proxy**: Next.js API Routes with file serving
- **QR Code**: qrcode.react library
- **Date**: date-fns untuk format tanggal
