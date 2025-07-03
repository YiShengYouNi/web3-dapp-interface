import { useEnsName } from 'wagmi'
import { formatAddress } from '../utils/address'
import { useWalletStore } from '../stores/walletStore'

export function useWalletEnsName() {
  const address = useWalletStore((s) => s.address) // 选择器订阅模式
  const { data: ensName, isLoading } = useEnsName({ address })

  return {
    ensName,
    isLoading,
    displayName: ensName || formatAddress(address),
  }
}
