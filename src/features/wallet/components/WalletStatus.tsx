// features/wallet/components/WalletStatus.tsx
import { useAccount } from 'wagmi'
import { useWalletStore } from '../store/wallet.store'

export default function WalletStatus() {
  const { isConnected } = useAccount()
  const { address, chainId } = useWalletStore()

  if (!isConnected || !address) return null

  return (
    <div className="p-3 rounded-xl bg-gray-100 text-sm text-gray-800">
      <p>🧾 Address: <span className="font-mono">{address.slice(0, 6)}...{address.slice(-4)}</span></p>
      <p>🌐 Chain ID: {chainId}</p>
    </div>
  )
}
