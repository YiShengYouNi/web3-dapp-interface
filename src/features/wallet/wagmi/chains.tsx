// features/wallet/wagmi/chains.ts
import { http } from 'viem';
import { sepolia, mainnet, base, polygonMumbai } from 'viem/chains'

export const supportedChains = [sepolia, base, polygonMumbai, mainnet] as const;
export const defaultChain = sepolia;

export  const transports = {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
    [polygonMumbai.id]: http()
  };

