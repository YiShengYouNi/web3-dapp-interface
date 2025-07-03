import { Router } from 'express'

const router = Router()

router.get('/message', (req, res) => {
  const { address, chainId } = req.query
  const message = {
    domain: {
      name: 'web3-login',
      version: '1',
      chainId,
      verifyingContract: '0x0000000000000000000000000000000000000000',
    },
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      Auth: [
        { name: 'address', type: 'address' },
        { name: 'timestamp', type: 'uint256' },
      ],
    },
    message: {
      address,
      timestamp: Math.floor(Date.now() / 1000),
    },
  }
  res.json(message)
})

router.post('/verify', (req, res) => {
  const { address, signature } = req.body
  // mock 返回 JWT token
  res.json({ token: 'mock.jwt.token.for.' + address })
})

export default router
