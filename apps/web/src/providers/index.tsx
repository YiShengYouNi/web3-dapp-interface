'use client'
import { ReactNode } from 'react'
import WalletWagmiProvider from './WalletWagmiProvider'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <WalletWagmiProvider>
    { children }
    </WalletWagmiProvider>

  )
}