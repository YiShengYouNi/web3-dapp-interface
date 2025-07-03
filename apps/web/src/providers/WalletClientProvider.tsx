'use client'
import { useAutoConnect, useSyncWalletToStore, useWalletEventListeners } from '@/features/wallet'
export default function WalletClientProvider() {
  useAutoConnect()
  useSyncWalletToStore()
  useWalletEventListeners()
  return null
}
