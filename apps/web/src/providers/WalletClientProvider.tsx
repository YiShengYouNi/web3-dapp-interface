'use client'
import { useAutoConnect } from '@/features/wallet/hooks/useAutoConnect'
import { useSyncWalletToStore } from '@/features/wallet/hooks/useSyncWalletToStore'
import { useWalletEventListeners } from '@/features/wallet/hooks/useWalletEventListeners'

export default function WalletClientProvider() {
  useAutoConnect()
  useSyncWalletToStore()
  useWalletEventListeners()
  return null
}
