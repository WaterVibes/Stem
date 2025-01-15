import { configureChains, createConfig } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { createPublicClient, http } from 'viem';

const projectId = '8ac1dbf45638d25a320e2a7101d7b2dd';
const chains = [mainnet, goerli];

// Configure chains & providers
const { publicClient, webSocketPublicClient } = configureChains(
  chains,
  [w3mProvider({ projectId })]
);

// Create wagmi config
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ 
    chains,
    projectId,
    version: 2 
  }),
  publicClient,
  webSocketPublicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

export { wagmiConfig, ethereumClient, projectId }; 