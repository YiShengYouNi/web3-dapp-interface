// features/wallet/hooks/useAutoConnect.ts
'use client'
import { useEffect } from 'react'
import { useConnect } from 'wagmi'
import { useWalletStore } from '../stores/walletStore'
import { showError } from '@/lib/toast'

export function useAutoConnect() {
  const { connectAsync, connectors } = useConnect()

  const isConnected = useWalletStore((state) => state.isConnected) //  选择器订阅模式

  const lastConnectorId =
    typeof window !== 'undefined' ? localStorage.getItem('lastConnectorId') : null

  useEffect(() => {
    if (isConnected || lastConnectorId) return

    const connector = connectors.find((c) => c.id === lastConnectorId)
    if (!connector) return

    connectAsync({ connector })
      .then(() => {
        // walletStore 更新逻辑在 useSyncWalletToStore（挂载根组件） 统一处理
      })
      .catch((err) => {
        showError('Auto connect failed: ' + err.message)
      })
  }, [isConnected, connectors, lastConnectorId, connectAsync])
}
