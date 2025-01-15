import { useContractReads, useAccount, erc20ABI } from 'wagmi';
import { formatUnits } from 'viem';

// Supported tokens with actual contract addresses
export const SUPPORTED_TOKENS = {
  GACA: {
    address: '0xe8DF41b8A5D62B91BD5866A4211179e622C912A2',
    symbol: 'GACA',
    name: 'GrassCash',
    decimals: 18,
    logoUrl: '/images/gaca-logo.png', // TODO: Add logo
  },
  USDC: {
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    logoUrl: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
  },
  USDT: {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    logoUrl: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
  },
  DAI: {
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    decimals: 18,
    logoUrl: 'https://assets.coingecko.com/coins/images/9956/small/4943.png',
  },
};

export function useTokenBalances() {
  const { address } = useAccount();
  
  const contracts = Object.values(SUPPORTED_TOKENS).map((token) => ({
    address: token.address as `0x${string}`,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
  }));

  const { data: balances } = useContractReads({
    contracts: address ? contracts : [],
    watch: true,
  });

  const formattedBalances = balances?.map((balance, index) => {
    const token = Object.values(SUPPORTED_TOKENS)[index];
    if (!balance?.result) return { ...token, balance: '0', formatted: '0' };

    const formatted = formatUnits(BigInt(balance.result.toString()), token.decimals);
    return {
      ...token,
      balance: balance.result.toString(),
      formatted,
    };
  });

  return {
    balances: formattedBalances || [],
    tokens: SUPPORTED_TOKENS,
  };
} 