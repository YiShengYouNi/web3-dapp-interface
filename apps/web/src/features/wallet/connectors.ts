import { createConfig, type CreateConnectorFn } from 'wagmi'
import { http } from 'viem'
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors'
import { mainnet, polygon, optimism, sepolia, base, polygonMumbai, arbitrum } from 'wagmi/chains'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID ?? '' // Replace with your actual project ID

const chains = [sepolia, base, polygonMumbai, mainnet, polygon, optimism, arbitrum] as const

const transports = {
  [mainnet.id]: http(),
  [sepolia.id]: http(),
  [base.id]: http(),
  [polygonMumbai.id]: http(),
  [optimism.id]: http(),
  [polygon.id]: http(),
  [arbitrum.id]: http(),
}

// ✅ 👇 connector 创建延迟执行，仅浏览器使用
function getSafeConnectors(): readonly CreateConnectorFn[] {
  if (typeof window === 'undefined') return []
  return [
    injected({ shimDisconnect: true }),
    walletConnect({ projectId }),
    coinbaseWallet({ appName: 'Web3DappInterface' }),
  ]
}

export const wagmiConfig = createConfig({
  chains,
  connectors: getSafeConnectors(),
  transports, // Automatically connect to the last used wallet
  ssr: true, // Enable SSR for wagmi
})
