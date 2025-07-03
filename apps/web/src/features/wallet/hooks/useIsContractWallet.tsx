'use client'
import { usePublicClient } from 'wagmi'
import { useEffect, useState } from 'react'
import { useWalletStore } from '../stores/walletStore'
import { useShallow } from 'zustand/react/shallow'

export function useIsContractWallet(): boolean | undefined {
  const { address, chainId } = useWalletStore(
    useShallow((s) => ({
      address: s.address,
      chainId: s.chainId,
    }))
  ) // 选择器订阅模式

  const client = usePublicClient()
  const [isContract, setIsContract] = useState<boolean | undefined>()

  useEffect(() => {
    if (!address || !chainId || !client) return

    client
      .getBytecode({ address })
      .then((bytecode) => {
        setIsContract(!!bytecode)
      })
      .catch(() => {
        setIsContract(undefined)
      })
  }, [address, chainId, client])

  return isContract
}
