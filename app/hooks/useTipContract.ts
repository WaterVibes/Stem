import { useContractWrite, useContractRead, useAccount, useNetwork } from 'wagmi';
import { parseUnits } from 'viem';
import { TIP_CONTRACT_ABI, getTipContractAddress } from '../constants/contracts';

export function useTipContract() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const contractAddress = chain ? getTipContractAddress(chain.id) : undefined;

  const { data: feePercentage } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: TIP_CONTRACT_ABI,
    functionName: 'feePercentage',
    enabled: !!contractAddress,
  });

  const { writeAsync: sendTip } = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi: TIP_CONTRACT_ABI,
    functionName: 'tip',
  });

  const tip = async (tokenAddress: string, recipient: string, amount: string) => {
    if (!address) throw new Error('Wallet not connected');
    if (!contractAddress) throw new Error('Contract not deployed on this network');
    
    try {
      const tx = await sendTip({
        args: [tokenAddress as `0x${string}`, recipient as `0x${string}`, BigInt(amount)],
      });
      
      return tx;
    } catch (error) {
      console.error('Error sending tip:', error);
      throw error;
    }
  };

  return {
    tip,
    feePercentage: feePercentage ? Number(feePercentage) : undefined,
    contractAddress,
    isSupported: !!contractAddress,
  };
} 