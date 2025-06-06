'use client'
// features/wallet/components/WalletNetworkSwitcher.tsx
import { useChainId, useChains, useSwitchChain } from 'wagmi'

export default function WalletNetworkSwitcher() {
  const currentChainId = useChainId()
  const { switchChain } = useSwitchChain()
  const chains = useChains()

  return (
    <div className="space-y-1 text-sm">
      <p className="font-medium">当前链: {currentChainId}</p>
      {chains.map((chain) => (
        <button
          key={chain.id}
          onClick={() => switchChain({ chainId: chain.id })}
          className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
        >
          切换到 {chain.name}
        </button>
      ))}
    </div>
  )
}
