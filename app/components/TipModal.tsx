'use client';

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { useTipContract } from '../hooks/useTipContract';
import { useTokenBalances } from '../hooks/useTokenBalances';
import { useContractWrite, erc20ABI, useNetwork, useSwitchNetwork } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import Image from 'next/image';
import { getPublicClient } from '../lib/wagmi';
import { TIP_CONTRACT_ABI, getTipContractAddress } from '../constants/contracts';
import { SUPPORTED_NETWORKS } from '../lib/wagmi';

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientAddress: string;
  recipientName: string;
}

const NetworkSelector = ({ onSelect }: { onSelect: () => void }) => {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Select Network
      </label>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(SUPPORTED_NETWORKS).map(([name, network]) => (
          <button
            key={network.id}
            onClick={() => {
              switchNetwork?.(network.id);
              onSelect();
            }}
            className={`flex items-center gap-2 p-2 rounded-lg border transition-colors ${
              chain?.id === network.id
                ? 'border-[#1F6B3B] bg-[#1F6B3B]/10'
                : 'border-gray-800 hover:border-[#1F6B3B]/50'
            }`}
          >
            <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
              {chain?.id === network.id && (
                <div className="w-3 h-3 rounded-full bg-[#1F6B3B]" />
              )}
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-white">
                {name}
              </div>
              <div className="text-xs text-gray-400">
                {network.name}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default function TipModal({
  isOpen,
  onClose,
  recipientAddress,
  recipientName,
}: TipModalProps) {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [needsApproval, setNeedsApproval] = useState(false);
  const { tip, feePercentage, contractAddress } = useTipContract();
  const { balances } = useTokenBalances();
  const [gasEstimate, setGasEstimate] = useState<string | null>(null);
  const [isEstimating, setIsEstimating] = useState(false);
  const { chain } = useNetwork();
  const [isNetworkSwitching, setIsNetworkSwitching] = useState(false);

  const { writeAsync: approve } = useContractWrite({
    address: selectedToken as `0x${string}`,
    abi: erc20ABI,
    functionName: 'approve',
  });

  const selectedTokenInfo = balances.find(token => token.address === selectedToken);

  const checkAllowance = async () => {
    if (!selectedToken || !selectedTokenInfo || !amount) return;

    try {
      const allowance = await fetch(`/api/allowance?token=${selectedToken}&owner=${recipientAddress}&spender=${contractAddress}`);
      const { allowance: currentAllowance } = await allowance.json();
      
      const amountInWei = parseUnits(amount, selectedTokenInfo.decimals);
      setNeedsApproval(BigInt(currentAllowance) < amountInWei);
    } catch (error) {
      console.error('Error checking allowance:', error);
    }
  };

  useEffect(() => {
    if (selectedToken && amount) {
      checkAllowance();
    }
  }, [selectedToken, amount]);

  const handleApprove = async () => {
    if (!selectedToken || !selectedTokenInfo || !amount || !contractAddress) return;

    setIsLoading(true);
    try {
      const amountInWei = parseUnits(amount, selectedTokenInfo.decimals);
      await approve({ args: [contractAddress as `0x${string}`, amountInWei] });
      setNeedsApproval(false);
    } catch (error) {
      console.error('Error approving token:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTip = async () => {
    if (!amount || !selectedToken || !selectedTokenInfo) return;

    setIsLoading(true);
    try {
      const amountInWei = parseUnits(amount, selectedTokenInfo.decimals);
      await tip(selectedToken, recipientAddress, amountInWei.toString());
      onClose();
    } catch (error) {
      console.error('Error sending tip:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const estimateGas = async () => {
    if (!selectedToken || !selectedTokenInfo || !amount || !chain) return;
    
    setIsEstimating(true);
    try {
      const publicClient = getPublicClient(chain.id);
      const contractAddress = getTipContractAddress(chain.id);
      
      const amountInWei = parseUnits(amount, selectedTokenInfo.decimals);
      const estimate = await publicClient.estimateContractGas({
        address: contractAddress as `0x${string}`,
        abi: TIP_CONTRACT_ABI,
        functionName: 'tip',
        args: [selectedToken as `0x${string}`, recipientAddress as `0x${string}`, amountInWei],
      });
      
      const gasPrice = await publicClient.getGasPrice();
      const gasCost = BigInt(estimate) * gasPrice;
      setGasEstimate(formatUnits(gasCost, 18));
    } catch (error) {
      console.error('Error estimating gas:', error);
      setGasEstimate(null);
    } finally {
      setIsEstimating(false);
    }
  };

  useEffect(() => {
    if (selectedToken && amount && !needsApproval) {
      estimateGas();
    }
  }, [selectedToken, amount, needsApproval]);

  const calculateTotal = () => {
    if (!amount || !selectedTokenInfo) return null;
    const baseAmount = parseFloat(amount);
    const platformFee = feePercentage ? (baseAmount * feePercentage) / 100 : 0;
    return {
      baseAmount,
      platformFee,
      total: baseAmount + platformFee,
    };
  };

  const handleNetworkChange = () => {
    setIsNetworkSwitching(true);
    setSelectedToken(null);
    setAmount('');
    setGasEstimate(null);
    setTimeout(() => setIsNetworkSwitching(false), 1000);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black border border-[#1F6B3B]/20 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-lg font-medium text-white">
                    Send tip to {recipientName}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <NetworkSelector onSelect={handleNetworkChange} />

                {isNetworkSwitching && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <ArrowPathIcon className="w-8 h-8 text-[#1F6B3B] animate-spin" />
                  </div>
                )}

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select Token
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {balances.map((token) => (
                      <button
                        key={token.address}
                        onClick={() => setSelectedToken(token.address)}
                        className={`flex items-center gap-2 p-2 rounded-lg border transition-colors ${
                          selectedToken === token.address
                            ? 'border-[#1F6B3B] bg-[#1F6B3B]/10'
                            : 'border-gray-800 hover:border-[#1F6B3B]/50'
                        }`}
                      >
                        <Image
                          src={token.logoUrl}
                          alt={token.symbol}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <div className="text-left">
                          <div className="text-sm font-medium text-white">
                            {token.symbol}
                          </div>
                          <div className="text-xs text-gray-400">
                            Balance: {Number(token.formatted).toFixed(4)}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-300">
                    Amount {selectedTokenInfo?.symbol ? `(${selectedTokenInfo.symbol})` : ''}
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="number"
                      step="0.000001"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="block w-full rounded-md bg-black border border-[#1F6B3B]/20 text-white px-3 py-2 focus:border-[#1F6B3B] focus:ring focus:ring-[#1F6B3B]/50"
                      placeholder="0.00"
                    />
                    {selectedTokenInfo && (
                      <button
                        onClick={() => setAmount(selectedTokenInfo.formatted)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#1F6B3B] hover:text-[#1F6B3B]/80"
                      >
                        MAX
                      </button>
                    )}
                  </div>
                  {feePercentage !== undefined && (
                    <p className="mt-2 text-sm text-gray-400">
                      Platform fee: {feePercentage}%
                    </p>
                  )}
                </div>

                <div className="mt-6">
                  {needsApproval ? (
                    <button
                      type="button"
                      onClick={handleApprove}
                      disabled={isLoading}
                      className="w-full rounded-md bg-[#1F6B3B] px-4 py-2 text-white font-medium hover:bg-[#1F6B3B]/80 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Approving...' : 'Approve Token'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleTip}
                      disabled={isLoading || !amount || !selectedToken}
                      className="w-full rounded-md bg-[#1F6B3B] px-4 py-2 text-white font-medium hover:bg-[#1F6B3B]/80 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Sending...' : 'Send Tip'}
                    </button>
                  )}
                </div>

                {feePercentage !== undefined && (
                  <div className="mt-4 p-3 rounded-lg bg-gray-900/50 border border-[#1F6B3B]/20">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-white">Fee Breakdown</h4>
                      <span className="text-xs text-gray-400">
                        Network: {chain?.name || 'Unknown'}
                      </span>
                    </div>
                    {calculateTotal() && (
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between text-gray-400">
                          <span>Base Amount:</span>
                          <span>{calculateTotal()?.baseAmount.toFixed(6)} {selectedTokenInfo?.symbol}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>Platform Fee ({feePercentage}%):</span>
                          <span>{calculateTotal()?.platformFee.toFixed(6)} {selectedTokenInfo?.symbol}</span>
                        </div>
                        <div className="flex justify-between text-white font-medium pt-1 border-t border-gray-800">
                          <span>Total Amount:</span>
                          <span>{calculateTotal()?.total.toFixed(6)} {selectedTokenInfo?.symbol}</span>
                        </div>
                        {gasEstimate && (
                          <div className="flex justify-between text-gray-400 mt-2 pt-2 border-t border-gray-800">
                            <span>Estimated Gas Fee:</span>
                            <span>~{Number(gasEstimate).toFixed(6)} ETH</span>
                          </div>
                        )}
                        {isEstimating && (
                          <div className="text-gray-400 text-xs mt-1">
                            Estimating gas fee...
                          </div>
                        )}
                        <p className="text-gray-400 text-xs mt-2">
                          Note: Gas fees are paid in ETH and may vary depending on network conditions. 
                          The platform fee goes to supporting Stem's development and operations.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 