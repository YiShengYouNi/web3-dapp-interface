'use client'
import { useInitAuthState, useSyncAutoWithWallet, useLoginExpiry } from '@/features/auth'

export default function AuthProvider() {
  useInitAuthState()
  useLoginExpiry()
  useSyncAutoWithWallet()
  return null
}
