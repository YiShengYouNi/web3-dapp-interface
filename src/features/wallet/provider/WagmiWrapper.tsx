'use client'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig } from '@/features/wallet/wagmi/wagmiClient'
import { ReactNode, useState } from 'react'

export const WagmiWrapper = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        {children}
      </WagmiProvider>
    </QueryClientProvider>
  )
}
