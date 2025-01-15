'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from './context/auth-context';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isInStudio = pathname?.startsWith('/studio');

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-black text-white">
            <Header />
            <div className="flex">
              {!isInStudio && <Sidebar />}
              <main className={`flex-1 ${!isInStudio ? 'ml-[240px]' : ''}`}>
                {children}
              </main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
