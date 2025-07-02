'use client'
import { ReactNode } from 'react'
import WalletWagmiProvider from './WalletWagmiProvider'
import WalletClientProvider from './WalletClientProvider'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <WalletWagmiProvider>
      <WalletClientProvider />
      {children}
    </WalletWagmiProvider>
  )
}
