'use client'

import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '@/features/wallet/connectors'
import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()


export default function WalletWagmiProvider({ children }: { children: ReactNode }) {
  return (
  <WagmiProvider config={wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      {children}
      </QueryClientProvider>
  </WagmiProvider>
  )
} 