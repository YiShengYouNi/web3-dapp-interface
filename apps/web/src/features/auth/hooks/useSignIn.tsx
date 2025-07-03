// features/auth/hooks/useSignIn.ts
'use client'
import { useState } from 'react'
import { useSignTypedData } from 'wagmi'
import { useWalletStore } from '@/features/wallet/stores/walletStore'
import { authStore } from '@/features/auth/stores/authStore'
import { getAuthMessage, verifyAuthSignature } from '@/services/authService'
import { useShallow } from 'zustand/react/shallow'

export function useSignIn() {
  const { address, chainId } = useWalletStore(
    useShallow((s) => ({
      address: s.address,
      chainId: s.chainId,
    }))
  )
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { setToken, setSignedIn } = authStore()

  const isSignedIn = authStore((s) => s.isSignedIn)

  const { signTypedDataAsync } = useSignTypedData()

  const signIn = async () => {
    if (!address || !chainId) {
      setError('Wallet not connected')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Step 1: 获取 EIP-712 消息结构
      const { domain, types, message } = await getAuthMessage(address, chainId)

      // Step 2: 使用 MetaMask 发起 EIP-712 签名（eth_signTypedData_v4）
      const signature = await signTypedDataAsync({
        domain,
        types,
        primaryType: 'Auth',
        message,
      })

      // Step 3: 发送签名和地址到服务端进行验证
      const { token } = await verifyAuthSignature({ address, signature })

      // Step 4: 保存 token 状态（+ localStorage）
      setToken(token)
      setSignedIn(true)
    } catch (err: any) {
      console.error('Sign-in error:', err)
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return { signIn, isLoading, error, isSignedIn }
}
