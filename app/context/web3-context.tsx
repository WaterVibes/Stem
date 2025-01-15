import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers, BrowserProvider } from 'ethers';
import { getProvider } from '../lib/web3/config';

interface Web3ContextType {
  provider: BrowserProvider | null;
  address: string | null;
  chainId: number | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
  error: string | null;
}

const Web3Context = createContext<Web3ContextType>({
  provider: null,
  address: null,
  chainId: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  isConnecting: false,
  error: null,
});

export function Web3Provider({ children }: { children: ReactNode }) {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Connect to MetaMask
  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      setError('Please install MetaMask to use this feature');
      return;
    }

    try {
      setIsConnecting(true);
      setError(null);

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Create provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();
      
      setProvider(provider);
      setAddress(address);
      setChainId(Number(network.chainId));
    } catch (err) {
      console.error('Error connecting to wallet:', err);
      setError('Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setAddress(null);
    setChainId(null);
    setError(null);
  };

  // Handle account changes
  useEffect(() => {
    if (typeof window.ethereum === 'undefined') return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else if (address !== accounts[0]) {
        setAddress(accounts[0]);
      }
    };

    const handleChainChanged = (chainId: string) => {
      setChainId(Number(chainId));
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [address]);

  const value = {
    provider,
    address,
    chainId,
    connectWallet,
    disconnectWallet,
    isConnecting,
    error,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
} 