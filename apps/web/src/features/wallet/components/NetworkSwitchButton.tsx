// features/wallet/components/NetworkSwitchDropdown.tsx

'use client'

import { useSwitchChain } from 'wagmi'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { showError, showInfo } from '@/lib/toast'
import {
  getSwitchChainErrorMessage,
  type SwitchChainError,
} from '../utils/getSwitchChainErrorMessage'
import { useWalletStore } from '../stores/walletStore'
import { useShallow } from 'zustand/react/shallow'

export function NetworkSwitchButton() {
  const { switchChainAsync, chains } = useSwitchChain()

  const { isConnected, chainId } = useWalletStore(
    useShallow((s) => ({ isConnected: s.isConnected, chainId: s.chainId }))
  )

  async function handleSwitch(chainId: number) {
    if (!isConnected) {
      return showError('Please connect your wallet first.')
    }

    try {
      await switchChainAsync({ chainId })
      showInfo(`Switched to chain ${chainId}`)
    } catch (error) {
      showError(getSwitchChainErrorMessage(error as SwitchChainError))
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{'Select Network'}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {chains.map((c) => (
          <DropdownMenuItem
            key={c.id}
            disabled={c.id === chainId}
            onClick={() => handleSwitch(c.id)}
          >
            {c.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
