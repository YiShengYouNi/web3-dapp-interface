import { useEffect } from 'react'
import { useAccount, useDisconnect, useChainId } from 'wagmi'
import { useWalletStore } from '../stores/walletStore'

export function useWalletListeners() {
  const { address, connector, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const setWallet = useWalletStore((s) => s.setWallet)
  const reset = useWalletStore((s) => s.reset)

  useEffect(() => {
    if (isConnected && address && connector) {
      setWallet({
        address,
        connector: connector.name,
        isConnected: true,
        chainId,
      })
    } else {
      disconnect()
      reset()
    }
  }, [address, connector, isConnected, chainId])
}