// ✅ features/wallet/index.ts
// 统一导出 wallet 模块中的所有核心功能、hooks、组件

export { useWalletStore } from './stores/walletStore'

// 状态同步器：从 wagmi hooks → walletStore
export { useSyncWalletToStore } from './hooks/useSyncWalletToStore'

// 钱包生命周期事件监听器（切换账号/链、断开连接）
export { useWalletEventListeners } from './hooks/useWalletEventListeners'

// 自动连接hook：在页面加载时自动连接上次使用的钱包
export { useAutoConnect } from './hooks/useAutoConnect'

// 判断是否为合约钱包的hook
export { useIsContractWallet } from './hooks/useIsContractWallet'

// ENS -> Address 转换hook
export { useWalletEnsName } from './hooks/useWalletEnsName'

// 钱包链接 component
export { ConnectWalletButton } from './components/ConnectWalletButton'

// 网络切换 component
export { NetworkSwitchButton } from './components/NetworkSwitchButton'
