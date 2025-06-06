// features/wallet/hooks/useAutoConnect.ts
import { useConnect } from 'wagmi'
import { useEffect } from 'react'

export const useAutoConnect = () => {
  const { connectors, connect } = useConnect()

  useEffect(() => {
    const lastConnectorId = localStorage.getItem('lastConnectorId')
    if (!lastConnectorId) return

    const connector = connectors.find((c) => c.id === lastConnectorId)
    if (connector && connector.ready) {
      connect({ connector })
    }
  }, [connect, connectors])
}
