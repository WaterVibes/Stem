import { createConfig, configureChains } from 'wagmi';
import { polygon, mainnet, bsc } from 'wagmi/chains';
import { w3mConnectors, w3mProvider } from '@web3modal/ethereum';

export const projectId = '8ac1dbf45638d25a320e2a7101d7b2dd';

const { chains, publicClient } = configureChains(
  [polygon, mainnet, bsc], // Put polygon first to make it default
  [w3mProvider({ projectId })]
);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

export { chains }; 