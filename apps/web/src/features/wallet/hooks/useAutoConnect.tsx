// features/wallet/hooks/useAutoConnect.ts
'use client'
import { useEffect } from 'react'
import { useConnect, useAccount } from 'wagmi'
import { useWalletStore } from '../stores/walletStore'
import { showError } from '@/lib/toast'

export function useAutoConnect() {
  const { connectAsync, connectors } = useConnect()
  const { isConnected: wagmiIsConnected } = useAccount()

  const isConnected = useWalletStore((state) => state.isConnected)

  const lastConnectorId =
    typeof window !== 'undefined' ? localStorage.getItem('lastConnectorId') : null

  useEffect(() => {
    if (isConnected || lastConnectorId) return

    const connector = connectors.find((c) => c.id === lastConnectorId)
    if (!connector) return

    connectAsync({ connector })
      .then((result) => {
        useWalletStore.setState({
          address: result.accounts[0],
          chainId: result.chainId,
          isConnected: true,
          connectorId: connector.id,
          connector: connector.name,
        })
      })
      .catch((err) => {
        showError('Auto connect failed: ' + err.message)
        useWalletStore.setState({ isConnected: false })
      })
  }, [wagmiIsConnected, isConnected, connectors, lastConnectorId, connectAsync])
}
