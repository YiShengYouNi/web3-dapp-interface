// features/auth/hooks/useLoginExpiry.ts
import { useEffect } from 'react'
import { authStore } from '../stores/authStore'

export function useLoginExpiry(expireInSeconds = 600) {
  const { clearToken } = authStore()

  useEffect(() => {
    const ts = localStorage.getItem('auth.loginTime')
    const expired = ts && Date.now() - Number(ts) > expireInSeconds * 1000

    if (expired) {
      clearToken()
      console.log('🔒 Token expired, user logged out')
    }
  }, [])
}
