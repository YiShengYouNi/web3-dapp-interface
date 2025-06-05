
// components/wallet/WalletButton.tsx
'use client'

import { useWallet } from '@/features/wallet/hooks/useWallet'

export default function WalletButton() {
  const { address, isConnected, connect, disconnect, connectors } = useWallet()

  if (!isConnected) {
    return (
      <button onClick={() => connect({ connector: connectors[0] })}>
        Connect Wallet
      </button>
    )
  }

  return (
    <div>
      <p>Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
      <button onClick={disconnect}>Disconnect</button>
    </div>
  )
}
