
// components/wallet/WalletButton.tsx
'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'

export const WalletButton = () => {
  const { isConnected, address } = useAccount()
  const { connect, connectors, error,  status, variables } = useConnect()
  const { disconnect } = useDisconnect()

   const isConnecting = status === 'pending';

   const currentConnectorUid =
    typeof variables?.connector === 'object' && 'uid' in variables.connector
      ? variables.connector.uid
      : undefined


  if (isConnected)
    return (
      <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <div style={{ marginBottom: '0.5rem' }}>🟢 Connected: {address}</div>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      {connectors.map((connector) => {
        const isInjected = connector.name.toLowerCase().includes('meta');
        return (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          disabled={isInjected && !connector.ready}
          style={{ display: 'block', marginBottom: '0.5rem' }}
        >
          {connector.name}
          {isConnecting && currentConnectorUid === connector.id && ' (connecting...)'}
        </button>
)})}

      {error && <div style={{ color: 'red' }}>{error.message}</div>}
    </div>
  )
}

