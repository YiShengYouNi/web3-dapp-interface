'use client'
// ✅ src/features/wallet/components/ConnectWalletButton.tsx
import { useAccount, useConnect, useDisconnect, useChainId } from 'wagmi'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

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
import { useWalletListeners } from '../hooks/useWalletListeners'
import { formatAddress } from '../utils/address'
import { getWalletLabel, walletIcons, visibleConnectors } from '../utils/connectors'

import { chainMeta } from '../utils/chainMeta'



export function ConnectWalletButton() {
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const currentChain = chainMeta[chainId]
  useWalletListeners()
  const [open, setOpen] = useState(false)

  const handleCopy = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      // Toaster.success('Address copied')
    }
  }


  if (isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            {formatAddress(address)} ⬇️
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Wallet</DropdownMenuLabel>
          {currentChain && (
            <div className="flex items-center px-2 py-1 text-sm text-muted-foreground gap-2">
              <Image src={currentChain.icon} alt={currentChain.name} width={16} height={16} />
              <span>{currentChain.name}</span>
            </div>
          )} <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleCopy}>
            <Copy className="w-4 h-4 mr-2" /> Copy Address
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => disconnect()}>
            <LogOut className="w-4 h-4 mr-2" /> Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  visibleConnectors([...connectors]).forEach((c) => {
    console.log(`Connector: ${c.name} (${c.id}) - Ready: ${c.ready}, Pending: ${c.pending}, UID: ${c.uid}`)
  })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Connect Wallet</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Select Wallet</DialogTitle>
          <DialogDescription>
              wallet connect modal
            </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {visibleConnectors([...connectors]).map((c) => {
            const label = getWalletLabel(c)
            const icon = walletIcons[c.id] || '/wallets/default.svg'

            return (
              <Button
                key={c.uid}
                disabled={c.ready === false }
                onClick={() => {
                  connect({ connector:c })
                  setOpen(false)
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