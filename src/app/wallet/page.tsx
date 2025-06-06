'use client'

import WalletConnectButton from '@/features/wallet/components/WalletConnectButton'
import WalletStatus from '@/features/wallet/components/WalletStatus'
import WalletNetworkSwitcher from '@/features/wallet/components/WalletNetworkSwitcher'

export default function WalletPage() {
  return (
    <div className="max-w-xl mx-auto mt-12 space-y-6 p-6 rounded-xl border bg-white shadow">
      <h1 className="text-2xl font-bold text-gray-800">🦊 钱包连接测试页</h1>
      <WalletConnectButton />
      <WalletStatus />
      <WalletNetworkSwitcher />
    </div>
  )
}
