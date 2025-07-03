// features/auth/hooks/useInitAuthState.tsx

'use client'

import { useEffect } from 'react'
import { authStore } from '../stores/authStore'

export function useInitAuthState() {
  const { setToken, setSignedIn } = authStore()

  useEffect(() => {
    const token = localStorage.getItem('auth.token')
    const ts = localStorage.getItem('auth.loginTime')
    const expired = ts ? Date.now() - Number(ts) > 1000 * 60 * 10 : true

    if (token && !expired) {
      setToken(token)
      setSignedIn(true)
    }
  }, [])

  return null
}
