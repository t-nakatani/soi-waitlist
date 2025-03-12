import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Soi - あなたが読んだ記事をAIが整理',
  description: 'Soiは、あなたが読んだ記事をAIが自動的にテーマごとに整理し、必要な時にすぐに見つけられるようにするツールです。',
  generator: 'v0.dev',
  icons: {
    icon: '/favicon.ico',
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
