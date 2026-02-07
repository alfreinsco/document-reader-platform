import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import { Footer } from '@/components/footer'

const geist = Geist({ 
  variable: '--font-sans',
  subsets: ['latin'] 
})
const geistMono = Geist_Mono({ 
  variable: '--font-mono',
  subsets: ['latin'] 
})

export const metadata: Metadata = {
  title: 'DocReader - Secure Document Platform',
  description: 'Read, share, and manage your documents securely with advanced filtering and sharing features',
  generator: 'v0.app',
  metadataBase: new URL('https://docreader.vercel.app'),
  openGraph: {
    title: 'DocReader - Secure Document Platform',
    description: 'Read, share, and manage your documents securely',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        {children}
        <Footer />
      </body>
    </html>
  )
}
