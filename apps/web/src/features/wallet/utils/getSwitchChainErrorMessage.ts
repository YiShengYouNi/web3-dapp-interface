type SwitchChainError = {
  code?: number
  name?: string
  shortMessage?: string
  message?: string
}

export function getSwitchChainErrorMessage(error: SwitchChainError): string {
  if (error?.code === 4902) {
    return 'This chain is not added to your wallet.'
  }

  if (error?.name === 'ChainNotConfiguredError') {
    return 'This chain is not supported by your current wallet.'
  }

  if (error?.shortMessage) return error.shortMessage

  return error?.message || 'Failed to switch chain'
}
