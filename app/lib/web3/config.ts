import { ethers, JsonRpcProvider, formatEther, parseEther } from 'ethers';

// Network configurations
export const NETWORKS = {
  mainnet: {
    name: 'Ethereum Mainnet',
    chainId: 1,
    rpcUrl: process.env.NEXT_PUBLIC_MAINNET_RPC_URL || 'https://mainnet.infura.io/v3/your-project-id',
    blockExplorer: 'https://etherscan.io'
  },
  goerli: {
    name: 'Goerli Testnet',
    chainId: 5,
    rpcUrl: process.env.NEXT_PUBLIC_GOERLI_RPC_URL || 'https://goerli.infura.io/v3/your-project-id',
    blockExplorer: 'https://goerli.etherscan.io'
  }
};

// Default network
export const DEFAULT_NETWORK = 'goerli';

// Get provider for the specified network
export const getProvider = (network = DEFAULT_NETWORK) => {
  const { rpcUrl } = NETWORKS[network as keyof typeof NETWORKS];
  return new JsonRpcProvider(rpcUrl);
};

// Get signer if wallet is connected
export const getSigner = (provider: ethers.BrowserProvider) => {
  return provider.getSigner();
};

// Convert wei to ether
export const weiToEther = (wei: string) => {
  return formatEther(wei);
};

// Convert ether to wei
export const etherToWei = (ether: string) => {
  return parseEther(ether);
}; 