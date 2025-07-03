'use client'
import { ReactNode } from 'react'
import WalletWagmiProvider from './WalletWagmiProvider'
import WalletClientProvider from './WalletClientProvider'
import AuthProvider from './AuthProvider'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <WalletWagmiProvider>
      <WalletClientProvider />
      <AuthProvider />
      {children}
    </WalletWagmiProvider>
  )
}
