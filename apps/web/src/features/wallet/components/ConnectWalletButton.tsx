'use client'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { useWalletListeners } from '../hooks/useWalletListeners'

export function ConnectWalletButton() {
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { address, isConnected } = useAccount()
  useWalletListeners()

  if (isConnected) {
    return (
      <Button variant="outline" onClick={() => disconnect()}>
        {address?.slice(0, 6)}...{address?.slice(-4)}
      </Button>
    )
  }

  return (
    <Button
      onClick={() => connect({ connector: connectors[0] })}
      disabled={isPending}
    >
      Connect Wallet
    </Button>
  )
}