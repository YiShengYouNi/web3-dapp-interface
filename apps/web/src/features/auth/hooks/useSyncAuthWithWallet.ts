'use client'

import { useEffect, useRef } from 'react'
import { authStore } from '../stores/authStore'
import { useWalletStore } from '@/features/wallet/stores/walletStore'
import { useShallow } from 'zustand/react/shallow'

export function useSyncAutoWithWallet() {
  const { address, isConnected, chainId } = useWalletStore(
    useShallow((s) => ({
      address: s.address,
      isConnected: s.isConnected,
      chainId: s.chainId,
    }))
  )

  const prevAddressRef = useRef<string | undefined>(undefined)
  const prevChainIdRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const prevAddress = prevAddressRef.current
    const prevChainId = prevChainIdRef.current

    const shouldResetAuth =
      (!isConnected && prevAddress) || // 断开连接
      (isConnected && address && address !== prevAddress) || // 切换账户
      (isConnected && chainId && chainId !== prevChainId) // 切换网络

    if (shouldResetAuth) {
      authStore.getState().clearToken() // ✅ 清除登录信息
    }

    prevAddressRef.current = address
    prevChainIdRef.current = chainId
  }, [address, isConnected, chainId])
}
