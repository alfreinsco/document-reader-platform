import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tentang Aplikasi | DocReader',
  description:
    'Kenali DocReader: platform untuk membaca, menjelajahi, dan berbagi dokumen dengan fitur pencarian, filter, dan berbagi link.',
};

export default function TentangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
