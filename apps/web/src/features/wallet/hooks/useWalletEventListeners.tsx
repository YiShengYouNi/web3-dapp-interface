// features/wallet/hooks/useWalletEventListeners.ts
'use client'
import { useEffect, useRef } from 'react'
import { useWalletStore } from '../stores/walletStore'
import { showInfo } from '@/lib/toast'
import { useShallow } from 'zustand/react/shallow'

export function useWalletEventListeners() {
  const { address, isConnected, chainId } = useWalletStore(
    useShallow((s) => ({
      address: s.address,
      isConnected: s.isConnected,
      chainId: s.chainId,
    }))
  ) // 选择器订阅模式

  const reset = useWalletStore((state) => state.reset)
  const setWallet = useWalletStore((state) => state.setWallet)
  // 用 ref 追踪上一次状态，避免首次加载误触发
  const prevAddressRef = useRef<string | undefined>(undefined)
  const prevChainIdRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    // 👤 监听账户切换或断开连接
    const prevAddress = prevAddressRef.current

    // 钱包断开
    if (!isConnected && prevAddress) {
      reset() // 钱包状态重置
      showInfo('Wallet disconnected')
    }
    // 账户切换
    if (isConnected && address && address !== prevAddress) {
      setWallet({ address, isConnected: true })
      showInfo(`Switched to ${address}`)
    }

    prevAddressRef.current = address
  }, [address, isConnected, reset, setWallet])

  useEffect(() => {
    // 🌐 监听链 ID 切换
    const prevChainId = prevChainIdRef.current
    if (prevChainId !== undefined && chainId !== prevChainId) {
      setWallet({ chainId })
      showInfo(`Switched to chain ${chainId}`)
    }
    prevChainIdRef.current = chainId
  }, [chainId, setWallet])
}
