import { useContractWrite, useContractRead, useAccount, useNetwork } from 'wagmi';
import { formatUnits } from 'viem';
import { STEM_REWARDS_ABI, getStemRewardsAddress } from '../constants/contracts';

export function useStemRewards() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const contractAddress = chain ? getStemRewardsAddress(chain.id) : undefined;

  // Daily rewards
  const { data: canClaimDaily } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: STEM_REWARDS_ABI,
    functionName: 'canClaimDailyReward',
    args: [address as `0x${string}`],
    enabled: !!address && !!contractAddress,
  });

  const { data: currentStreak } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: STEM_REWARDS_ABI,
    functionName: 'currentStreak',
    args: [address as `0x${string}`],
    enabled: !!address && !!contractAddress,
  });

  const { data: longestStreak } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: STEM_REWARDS_ABI,
    functionName: 'longestStreak',
    args: [address as `0x${string}`],
    enabled: !!address && !!contractAddress,
  });

  // Stream rewards
  const { data: streamMinutes } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: STEM_REWARDS_ABI,
    functionName: 'streamMinutesWatched',
    args: [address as `0x${string}`],
    enabled: !!address && !!contractAddress,
  });

  const { data: canClaimStream } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: STEM_REWARDS_ABI,
    functionName: 'canClaimStreamReward',
    args: [address as `0x${string}`],
    enabled: !!address && !!contractAddress,
  });

  // Contract writes
  const { writeAsync: claimDailyReward } = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi: STEM_REWARDS_ABI,
    functionName: 'claimDailyReward',
  });

  const { writeAsync: claimStreamReward } = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi: STEM_REWARDS_ABI,
    functionName: 'claimStreamReward',
  });

  const { writeAsync: completeChallenge } = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi: STEM_REWARDS_ABI,
    functionName: 'completeChallenge',
  });

  // Helper functions
  const claimDaily = async () => {
    if (!address) throw new Error('Wallet not connected');
    if (!contractAddress) throw new Error('Contract not deployed on this network');
    if (!canClaimDaily) throw new Error('Cannot claim daily reward yet');
    
    try {
      const tx = await claimDailyReward();
      return tx;
    } catch (error) {
      console.error('Error claiming daily reward:', error);
      throw error;
    }
  };

  const claimStream = async () => {
    if (!address) throw new Error('Wallet not connected');
    if (!contractAddress) throw new Error('Contract not deployed on this network');
    if (!canClaimStream) throw new Error('Cannot claim stream reward yet');
    
    try {
      const tx = await claimStreamReward();
      return tx;
    } catch (error) {
      console.error('Error claiming stream reward:', error);
      throw error;
    }
  };

  const complete = async (challengeId: string) => {
    if (!address) throw new Error('Wallet not connected');
    if (!contractAddress) throw new Error('Contract not deployed on this network');
    
    try {
      const tx = await completeChallenge({
        args: [challengeId as `0x${string}`],
      });
      return tx;
    } catch (error) {
      console.error('Error completing challenge:', error);
      throw error;
    }
  };

  return {
    // State
    canClaimDaily: canClaimDaily || false,
    canClaimStream: canClaimStream || false,
    currentStreak: currentStreak ? Number(currentStreak) : 0,
    longestStreak: longestStreak ? Number(longestStreak) : 0,
    streamMinutes: streamMinutes ? Number(streamMinutes) : 0,
    
    // Actions
    claimDaily,
    claimStream,
    complete,
    
    // Contract info
    contractAddress,
    isSupported: !!contractAddress,
  };
} 