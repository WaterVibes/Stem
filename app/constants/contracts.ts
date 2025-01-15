import { mainnet, polygon, bsc } from 'viem/chains';

// Contract addresses for each network
export const TIP_CONTRACT_ADDRESSES = {
  [mainnet.id]: '0xB6220a9c17b364c5D6ee90C4cF966e1B64fB2D9f',
  [polygon.id]: '', // TODO: Add Polygon contract address
  [bsc.id]: '', // TODO: Add BSC contract address
} as const;

// NFT Contract addresses for each network
export const STEM_NFT_ADDRESSES = {
  [mainnet.id]: '', // TODO: Add deployed NFT contract address
  [polygon.id]: '', // TODO: Add Polygon NFT contract address
  [bsc.id]: '', // TODO: Add BSC NFT contract address
} as const;

// Rewards Contract addresses for each network
export const STEM_REWARDS_ADDRESSES = {
  [mainnet.id]: '', // TODO: Add deployed rewards contract address
  [polygon.id]: '', // TODO: Add Polygon rewards contract address
  [bsc.id]: '', // TODO: Add BSC rewards contract address
} as const;

// Get contract address for current network
export const getTipContractAddress = (chainId: number) => {
  return TIP_CONTRACT_ADDRESSES[chainId as keyof typeof TIP_CONTRACT_ADDRESSES] || TIP_CONTRACT_ADDRESSES[mainnet.id];
};

// Get NFT contract address for current network
export const getStemNFTAddress = (chainId: number) => {
  return STEM_NFT_ADDRESSES[chainId as keyof typeof STEM_NFT_ADDRESSES] || STEM_NFT_ADDRESSES[mainnet.id];
};

// Get rewards contract address for current network
export const getStemRewardsAddress = (chainId: number) => {
  return STEM_REWARDS_ADDRESSES[chainId as keyof typeof STEM_REWARDS_ADDRESSES] || STEM_REWARDS_ADDRESSES[mainnet.id];
};

export const TIP_CONTRACT_ABI = [
  {
    inputs: [
      { name: 'token', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'tip',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feePercentage',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const STEM_NFT_ABI = [
  {
    inputs: [
      { name: 'uri', type: 'string' },
      { name: 'title', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'duration', type: 'uint256' },
      { name: 'isExclusive', type: 'bool' },
      { name: 'collaborators', type: 'address[]' },
      { name: 'shares', type: 'uint256[]' },
    ],
    name: 'mintVideo',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'tokenId', type: 'uint256' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'distributeRevenue',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'tokenId', type: 'uint256' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'unlockExclusiveContent',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'tokenId', type: 'uint256' },
    ],
    name: 'tokenURI',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'tokenId', type: 'uint256' },
    ],
    name: 'videoMetadata',
    outputs: [
      { name: 'title', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'duration', type: 'uint256' },
      { name: 'views', type: 'uint256' },
      { name: 'likes', type: 'uint256' },
      { name: 'isExclusive', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const STEM_REWARDS_ABI = [
  {
    inputs: [
      { name: 'user', type: 'address' },
    ],
    name: 'canClaimDailyReward',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'user', type: 'address' },
    ],
    name: 'canClaimStreamReward',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'user', type: 'address' },
    ],
    name: 'currentStreak',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'user', type: 'address' },
    ],
    name: 'longestStreak',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'user', type: 'address' },
    ],
    name: 'streamMinutesWatched',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimDailyReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimStreamReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'challengeId', type: 'bytes32' },
    ],
    name: 'completeChallenge',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'challengeId', type: 'bytes32' },
    ],
    name: 'getChallenge',
    outputs: [
      { name: 'name', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'reward', type: 'uint256' },
      { name: 'expiryDate', type: 'uint256' },
      { name: 'isActive', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const; 