// apps/web/services/auth.ts

import { API_BASE_URL } from '@/lib/config'

export interface AuthMessageResponse {
  domain: any
  types: any
  message: any
}

export async function getAuthMessage(
  address: string,
  chainId: number
): Promise<AuthMessageResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/message?address=${address}&chainId=${chainId}`)
  if (!res.ok) throw new Error('Failed to get auth message')
  return await res.json()
}

export async function verifyAuthSignature(payload: { address: string; signature: string }) {
  const res = await fetch(`${API_BASE_URL}/auth/verify`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) throw new Error('Verification failed')
  return await res.json() // { token: string }
}
