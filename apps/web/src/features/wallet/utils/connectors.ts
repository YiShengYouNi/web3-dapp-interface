import type { Connector } from 'wagmi'

export const walletIcons: Record<string, string> = {
  injected: '/wallets/metamask.svg',
  walletConnect: '/wallets/walletconnect.svg',
  coinbaseWallet: '/wallets/coinbase.svg',
  phantom: '/wallets/phantom.svg',
  okxWallet: '/wallets/okx.svg',
  bitget: '/wallets/bitget.svg',
}

export const visibleConnectors = (connectors: Connector[]) => {
  const seen = new Set<string>()
  return connectors.filter((connector) => {
    const label = getWalletLabel(connector).toLowerCase()
    if (seen.has(label)) return false
    seen.add(label)
    return true
  })
}

export const getWalletLabel = (connector: Connector) => {
  if (connector.id === 'injected') {
    if (typeof window !== 'undefined' && window.ethereum?.isMetaMask) {
      return 'MetaMask'
    }
    return 'Injected'
  }

  return connector.name
}
