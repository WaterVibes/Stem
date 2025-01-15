'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from './context/auth-context';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { usePathname } from 'next/navigation';
import { WagmiConfig } from 'wagmi';
import { Web3Modal } from '@web3modal/react';
import { wagmiConfig, ethereumClient, projectId } from './lib/web3/wagmi-config';
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ['latin'] });

// Dynamically import Web3Modal to avoid SSR issues
const Web3ModalComponent = dynamic(
  () => import('@web3modal/react').then(mod => mod.Web3Modal),
  { ssr: false }
);

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
        <WagmiConfig config={wagmiConfig}>
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
        </WagmiConfig>
        <Web3ModalComponent
          projectId={projectId}
          ethereumClient={ethereumClient}
          themeMode="dark"
          themeVariables={{
            '--w3m-accent-color': '#1F6B3B',
            '--w3m-background-color': '#1F6B3B',
          }}
        />
      </body>
    </html>
  );
}
