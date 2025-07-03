'use client'
// ✅ src/features/wallet/components/ConnectWalletButton.tsx
import { useConnect, useDisconnect, type Connector } from 'wagmi'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useShallow } from 'zustand/react/shallow'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Copy, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useWalletEnsName } from '../hooks/useWalletEnsName'
import { useIsContractWallet } from '../hooks/useIsContractWallet'
import { NetworkSwitchButton } from './NetworkSwitchButton'
import { getWalletLabel, walletIcons, visibleConnectors } from '../utils/connectors'

import { chainMeta } from '../utils/chainMeta'
import { showError, showSuccess } from '@/lib/toast'
import { SignInCard } from '@/features/auth/components/SignInCard'
import { useWalletStore } from '../stores/walletStore'

export function ConnectWalletButton() {
  const { connectors, connectAsync } = useConnect()
  const { disconnect } = useDisconnect()
  const { address, isConnected, chainId } = useWalletStore(
    useShallow((s) => ({
      address: s.address,
      isConnected: s.isConnected,
      chainId: s.chainId,
    }))
  ) // 选择器订阅模式
  const { displayName } = useWalletEnsName()
  const isContractWallet = useIsContractWallet()
  const [open, setOpen] = useState(false)

  const currentChain = chainMeta[chainId ?? 0]

  const handleCopy = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      showSuccess('Address copied')
    }
  }

  const handleConnect = async (connector: Connector) => {
    try {
      await connectAsync({ connector })
      // walletStore 更新逻辑在 useSyncWalletToStore（挂载根组件） 统一处理
      setOpen(false)
    } catch (err) {
      console.error('Connect error:', err)
      showError('Failed to connect wallet')
    }
  }

  const handleDisConnect = () => {
    disconnect()
    // 移除自动重连的 connectorId
    localStorage.removeItem('lastConnectorId')
  }

  if (isConnected) {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {displayName} ⬇️
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Wallet</DropdownMenuLabel>
            {isContractWallet && <span className="text-xs text-muted-foreground">合约钱包</span>}
            {currentChain && (
              <div className="flex items-center px-2 py-1 text-sm text-muted-foreground gap-2">
                <Image src={currentChain.icon} alt={currentChain.name} width={16} height={16} />
                <span>{currentChain.name}</span>
              </div>
            )}{' '}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-2" /> Copy Address
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleDisConnect()}>
              <LogOut className="w-4 h-4 mr-2" /> Disconnect
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="px-2 py-1">
              <NetworkSwitchButton />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <SignInCard />
      </>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Connect Wallet</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Select Wallet</DialogTitle>
          <DialogDescription>wallet connect modal</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {visibleConnectors([...connectors]).map((c) => {
            const label = getWalletLabel(c)
            const icon = walletIcons[c.id] || '/wallets/default.svg'

            return (
              <Button
                key={c.uid}
                disabled={c.ready === false}
                onClick={() => {
                  handleConnect(c)
                }}
                className="w-full flex items-center justify-start gap-3"
                variant="ghost"
              >
                <Image src={icon} alt={label} width={24} height={24} />
                {label}
              </Button>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
