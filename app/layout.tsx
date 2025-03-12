import type { Metadata } from 'next'
import './globals.css'
import { generateSeoMetadata } from "@/lib/metadata"
export const metadata: Metadata = {
  ...generateSeoMetadata({
    title: 'Soi - あなたが読んだ記事をAIが整理',
    description: 'Soiは、あなたが読んだ記事をAIが自動的にテーマごとに整理し、必要な時にすぐに見つけられるようにするツールです。',
    url: 'https://soi-launch-waitlist.vercel.app',
  }),
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
