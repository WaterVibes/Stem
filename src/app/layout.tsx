import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stem - Medical Cannabis Community',
  description: 'Share and discover medical cannabis experiences in a TikTok-style feed',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <ErrorBoundary>
          <main className="pb-16">
            {children}
          </main>
          <Navbar />
        </ErrorBoundary>
      </body>
    </html>
  )
} 