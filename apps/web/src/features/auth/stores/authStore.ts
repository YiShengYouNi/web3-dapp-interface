import { create } from 'zustand'

interface AuthState {
  token: string | null
  isSignedIn: boolean
  loginTime: number | null

  setToken: (token: string) => void
  clearToken: () => void
  setSignedIn: (v: boolean) => void
}

export const authStore = create<AuthState>((set) => ({
  token: null,
  isSignedIn: false,
  loginTime: null,

  setToken: (token: string) => {
    localStorage.setItem('auth.token', token)
    localStorage.setItem('auth.loginTime', Date.now().toString())
    set({ token, loginTime: Date.now() })
  },

  clearToken: () => {
    localStorage.removeItem('auth.token')
    localStorage.removeItem('auth.loginTime')
    set({ token: null, isSignedIn: false, loginTime: null })
  },

  setSignedIn: (v) => set({ isSignedIn: v }),
}))
