// features/auth/components/SignInCard.tsx

'use client'

import { useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import { useSignIn } from '../hooks/useSignIn'

export function SignInCard() {
  const { address, isConnected } = useAccount()
  const { signIn, isLoading, error, isSignedIn } = useSignIn()

  if (!isConnected) return null

  return (
    <div className="border rounded-xl p-4 w-full max-w-md shadow-md">
      <p className="mb-2 text-sm text-muted-foreground">
        Address: <span className="font-mono">{address}</span>
      </p>
      {isSignedIn ? (
        <p className="text-green-600 font-semibold">✅ Signed In</p>
      ) : (
        <Button onClick={signIn} disabled={isLoading}>
          {isLoading ? 'Signing...' : 'Sign In with EIP-712'}
        </Button>
      )}
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </div>
  )
}
