'use client'
import { useAutoConnect } from '@/features/wallet/hooks/useAutoConnect'
import { useWalletEventListeners } from '@/features/wallet/hooks/useWalletEventListeners'

export default function WalletClientProvider() {
  useWalletEventListeners()
  useAutoConnect()
  return null
}
