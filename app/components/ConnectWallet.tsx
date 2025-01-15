'use client';

import { useEffect, useState } from 'react';
import { useWeb3Modal } from '@web3modal/react';
import { useAccount, useDisconnect } from 'wagmi';

export default function ConnectWallet() {
  const [mounted, setMounted] = useState(false);
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleClick = () => {
    if (isConnected) {
      disconnect();
    } else {
      open();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 bg-[#1F6B3B] text-white rounded-lg hover:bg-[#1F6B3B]/80 transition-colors"
    >
      {isConnected
        ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
        : 'Connect Wallet'}
    </button>
  );
} 