// features/wallet/hooks/useWallet.ts
import { useAccount, useDisconnect, useChainId } from 'wagmi'
import { useEffect } from 'react'
import { useWalletStore } from '../store/wallet.store'

export const useWallet = () => {
  const { address, connector, isConnected } = useAccount()
  const chainId = useChainId()
  const { disconnect } = useDisconnect()
  const {  setAddress, setConnector, setChainId, reset} = useWalletStore()

  useEffect(() => {
    setAddress(address ?? null)
    setConnector(connector ?? null)
    setChainId(chainId?? null)
  }, [address, connector, chainId, setAddress, setConnector, setChainId])

  const disconnectWallet = () => {
    disconnect()
    reset()
  }

  return {
    address,
    chainId,
    isConnected,
    disconnectWallet,
  }
}
