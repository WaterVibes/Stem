"use client";

import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from './components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-black text-white min-h-screen">
        <Sidebar />
        <main className="ml-[240px]">
          {children}
        </main>
      </body>
    </html>
  );
}
