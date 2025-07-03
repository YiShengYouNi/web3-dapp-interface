'use client'
// features/wallet/hooks/useSyncWalletToStore.ts
import { useEffect, useState } from 'react'
import { useAccount, useSignTypedData } from 'wagmi'
import { useWalletStore } from '../stores/walletStore'

export function useSyncWalletToStore() {
  const { address, isConnected, connector, chainId } = useAccount()

  useEffect(() => {
    useWalletStore.getState().setWallet({
      address,
      chainId,
      isConnected,
      connectorId: connector?.id,
    })
    // 设置自动重连所需connectorId
    localStorage.setItem('lastConnectorId', connector?.id ?? '')
  }, [address, isConnected, chainId, connector])
}
