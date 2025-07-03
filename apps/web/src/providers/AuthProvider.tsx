'use client'
import { useInitAuthState } from '@/features/auth/hooks/useInitAuthState'
import { useLoginExpiry } from '@/features/auth/hooks/useLoginExpiry'

export default function AuthProvider() {
  useInitAuthState()
  useLoginExpiry()
  return null
}
