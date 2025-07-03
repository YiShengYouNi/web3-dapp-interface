'use client'
import { useInitAuthState } from '@/features/auth/hooks/useInitAuthState'
import { useLoginExpiry } from '@/features/auth/hooks/useLoginExpiry'
import { useSyncAutoWithWallet } from '@/features/auth/hooks/useSyncAuthWithWallet'

export default function AuthProvider() {
  useInitAuthState()
  useLoginExpiry()
  useSyncAutoWithWallet()
  return null
}
