'use client'
// features/wallet/components/WalletConnectButton.tsx
import { useAccount, useConnect, useDisconnect } from 'wagmi'

export default function WalletConnectButton() {
  const { isConnected } = useAccount()
  const { connect, connectors, status, variables } = useConnect()
  const { disconnect } = useDisconnect()

   const isConnecting = status === 'pending';

    const currentConnectorUid =
    typeof variables?.connector === 'object' && 'uid' in variables.connector
      ? variables.connector.uid
      : undefined


  if (isConnected) {
    return (
      <button
        className="px-4 py-2 bg-red-600 text-white rounded-xl shadow hover:bg-red-700"
        onClick={() => disconnect()}
      >
        Disconnect
      </button>
    )
  }

  return (
    <div className="space-y-2">
      {connectors.map((connector) => {
        const isInjected = connector.name.toLowerCase().includes('meta');
        return (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          disabled={isInjected && !connector.ready}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 disabled:bg-gray-400"
        >
          {connector.name}
          {isConnecting && currentConnectorUid === connector.uid && ' (connecting...)'}
        </button>
      )
      })}
    </div>
  )
}
