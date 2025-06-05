// features/wallet/wagmi/connectors.ts
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;

export const connectors = [
  injected({ }),
  walletConnect({  projectId }),
  coinbaseWallet({ appName: 'Web3DappInterface' })
]
