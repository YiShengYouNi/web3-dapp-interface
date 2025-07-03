// features/auth/hooks/useSignIn.ts

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { authStore } from '../stores/authStore'
import { getAuthMessage, verifyAuthSignature } from '@/services/authService'

export function useSignIn() {
  const { address } = useAccount()
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { setToken, setSignedIn } = authStore()
  const isSignedIn = authStore((s) => s.isSignedIn)

  const signIn = async () => {
    if (!address) {
      setError('Wallet not connected')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Step 1: 获取 EIP-712 消息结构
      const { domain, types, message } = await getAuthMessage(address)

      // Step 2: 使用 MetaMask 发起 EIP-712 签名（eth_signTypedData_v4）
      const signature = await window.ethereum.request({
        method: 'eth_signTypedData_v4',
        params: [address, JSON.stringify({ domain, types, message })],
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
