import { useState } from 'react';
import { useAccount, useBalance, useContractWrite, useNetwork } from 'wagmi';
import { parseEther } from 'viem';
import { polygon } from 'wagmi/chains';

interface SendCryptoMessageProps {
  recipientAddress: string;
  onSend: (amount: string, token: string) => void;
}

const SUPPORTED_TOKENS = [
  { symbol: 'GACA', name: 'GACA Token', address: '0xB6220a9c17b364c5D6ee90C4cF966e1B64fB2D9f' },
];

export default function SendCryptoMessage({ recipientAddress, onSend }: SendCryptoMessageProps) {
  const [amount, setAmount] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const selectedToken = SUPPORTED_TOKENS[0]; // GACA is the only token

  const { address } = useAccount();
  const { chain } = useNetwork();

  const { data: balance } = useBalance({
    address,
    token: selectedToken.address as `0x${string}`,
  });

  const handleSend = async () => {
    if (!amount || !recipientAddress) return;
    
    try {
      // Send GACA tokens
      onSend(amount, selectedToken.symbol);
      setIsOpen(false);
    } catch (error) {
      console.error('Error sending GACA:', error);
    }
  };

  if (!address || chain?.id !== polygon.id) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-[#1F6B3B] hover:text-[#1F6B3B]/80 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-full mb-2 right-0 w-72 bg-black border border-[#1F6B3B]/20 p-4 rounded shadow-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Amount GACA</label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-black border border-[#1F6B3B]/20 rounded p-2 focus:border-[#1F6B3B] focus:ring-1 focus:ring-[#1F6B3B]"
              />
              {balance && (
                <button
                  onClick={() => setAmount(balance.formatted)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#1F6B3B] hover:text-[#1F6B3B]/80"
                >
                  Max
                </button>
              )}
            </div>
            {balance && (
              <p className="text-xs text-gray-400 mt-1">
                Balance: {balance.formatted} GACA
              </p>
            )}
          </div>

          <button
            onClick={handleSend}
            disabled={!amount || Number(amount) <= 0}
            className="w-full bg-[#1F6B3B] text-white py-2 rounded font-medium hover:bg-[#1F6B3B]/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send GACA
          </button>
        </div>
      )}
    </div>
  );
} 