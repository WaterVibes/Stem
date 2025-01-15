import { useContractWrite, useContractRead, useAccount, useNetwork } from 'wagmi';
import { parseUnits } from 'viem';
import { STEM_NFT_ABI, getStemNFTAddress } from '../constants/contracts';

export function useStemNFT() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const contractAddress = chain ? getStemNFTAddress(chain.id) : undefined;

  const { writeAsync: mintVideo } = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi: STEM_NFT_ABI,
    functionName: 'mintVideo',
  });

  const { writeAsync: distributeRevenue } = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi: STEM_NFT_ABI,
    functionName: 'distributeRevenue',
  });

  const { writeAsync: unlockExclusiveContent } = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi: STEM_NFT_ABI,
    functionName: 'unlockExclusiveContent',
  });

  const mint = async (
    uri: string,
    title: string,
    description: string,
    duration: number,
    isExclusive: boolean,
    collaborators: string[],
    shares: number[]
  ) => {
    if (!address) throw new Error('Wallet not connected');
    if (!contractAddress) throw new Error('Contract not deployed on this network');
    
    try {
      const tx = await mintVideo({
        args: [
          uri,
          title,
          description,
          BigInt(duration),
          isExclusive,
          collaborators,
          shares.map(share => BigInt(share)),
        ],
      });
      
      return tx;
    } catch (error) {
      console.error('Error minting NFT:', error);
      throw error;
    }
  };

  const distribute = async (tokenId: number, amount: string) => {
    if (!address) throw new Error('Wallet not connected');
    if (!contractAddress) throw new Error('Contract not deployed on this network');
    
    try {
      const tx = await distributeRevenue({
        args: [BigInt(tokenId), parseUnits(amount, 18)],
      });
      
      return tx;
    } catch (error) {
      console.error('Error distributing revenue:', error);
      throw error;
    }
  };

  const unlock = async (tokenId: number, amount: string) => {
    if (!address) throw new Error('Wallet not connected');
    if (!contractAddress) throw new Error('Contract not deployed on this network');
    
    try {
      const tx = await unlockExclusiveContent({
        args: [BigInt(tokenId), parseUnits(amount, 18)],
      });
      
      return tx;
    } catch (error) {
      console.error('Error unlocking content:', error);
      throw error;
    }
  };

  return {
    mint,
    distribute,
    unlock,
    contractAddress,
    isSupported: !!contractAddress,
  };
} 