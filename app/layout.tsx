import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Soi - あなたが読んだ記事をAIが整理',
  description: 'Soiは、あなたが読んだ記事をAIが自動的にテーマごとに整理し、必要な時にすぐに見つけられるようにするツールです。',
  openGraph: {
    title: 'Soi - あなたが読んだ記事をAIが整理',
    description: 'Soiは、あなたが読んだ記事をAIが自動的にテーマごとに整理し、必要な時にすぐに見つけられるようにするツールです。',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Soi - あなたが読んだ記事をAIが整理',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soi - あなたが読んだ記事をAIが整理',
    description: 'Soiは、あなたが読んだ記事をAIが自動的にテーマごとに整理し、必要な時にすぐに見つけられるようにするツールです。',
    images: ['/og.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
