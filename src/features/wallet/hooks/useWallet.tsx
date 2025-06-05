

// features/wallet/hooks/useWallet.ts
import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from 'wagmi'
import { supportedChains } from '../wagmi/chains'

export function useWallet() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const { switchChainAsync } = useSwitchChain()

  return {
    address,
    isConnected,
    connect,
    connectors,
    isPending,
    disconnect,
    chainId,
    switchChain: switchChainAsync,
    currentChain: supportedChains.find(c => c.id === chainId)
  }
}
