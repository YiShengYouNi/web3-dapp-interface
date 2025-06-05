// features/wallet/wagmi/wagmiClient.ts
import { createConfig } from 'wagmi'
import { connectors} from './connectors';
import  {supportedChains as chains, transports}  from './chains';

export const wagmiConfig = createConfig({
  chains,
  connectors,
  transports,
  ssr: true
})