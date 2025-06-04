# 🧱 web3-dapp-interface

> A modular, scalable Web3 DApp frontend starter built with **Next.js 14+**, **wagmi v2**, and **viem v2**.  
> Designed for real-world Web3 product development & engineering interview readiness.

---

## 🚀 项目简介

`web3-dapp-interface` 是一个为 Web3 前端开发者打造的 DApp 模板项目，具备**清晰的功能边界、模块化组织结构和未来可扩展性**，特别适合：

- Web2 工程师转型 Web3；
- 参与 Hackathon / 项目孵化；
- 面试准备 / 开源作品展示；
- 打造个人 DApp 产品。

---

## 🛠️ 技术栈 & 核心依赖

| 技术 | 用途 |
|------|------|
| [Next.js 14+ (App Router)](https://nextjs.org) | 前端框架 |
| [React 19](https://react.dev) | UI 组件与 Hooks |
| [TypeScript](https://www.typescriptlang.org/) | 类型安全 |
| [wagmi v2](https://wagmi.sh/) + [viem v2](https://viem.sh/) | 钱包连接 + 合约交互 |
| [Zustand](https://zustand-demo.pmnd.rs/) | 全局状态管理 |
| [TailwindCSS + Radix UI](https://tailwindcss.com/) | UI 样式与组件库 |
| [The Graph (选配)](https://thegraph.com/) | 链上数据查询 |
| [Foundry / Hardhat (可扩展)](https://book.getfoundry.sh/) | 智能合约部署与测试 |

---

## 📦 项目功能模块结构

项目采用 **功能驱动（feature-first）模块划分**，便于拓展与协作：

<p align="center">
  <img src="" alt="DApp 架构图" width="80%" />
</p>

```yaml
web3-dapp-interface/
├── app/                         # Next.js App Router 页面
│   ├── page.tsx                 # 首页
│   ├── mint/                    # NFT 铸造页面（示例）
│   ├── bridge/                  # 跨链页面（占位）
│   └── layout.tsx              # 全局布局
│
├── components/                  # 通用 UI 组件
│   ├── wallet/                  # 钱包连接按钮 / 状态提示
│   ├── token/                   # Token 展示组件
│   ├── tx/                      # 交易提示组件（如 TxToast）
│   └── layout/                  # Header、Footer、Sidebar
│
├── features/                    # 🌟 业务功能模块（按职责划分）
│   ├── wallet/                  # 钱包连接与链管理
│   │   ├── wagmi/               # wagmi client, connectors, chains
│   │   ├── hooks/               # useWallet / useChainSwitcher
│   │   └── utils.ts             # 地址格式化、ENS 解析等
│   │
│   ├── tokens/                  # Token 信息（获取 Symbol/Balance）
│   ├── contracts/               # 合约读写、合约 ABI、调用封装
│   ├── events/                  # 合约事件监听、回调
│   ├── metadata/                # NFT Metadata 渲染逻辑
│   ├── account-abstraction/     # ERC-4337 支持模块（占位）
│   ├── gasless/                 # MetaTx / Paymaster（占位）
│   ├── zk/                      # 零知识模块（占位）
│   └── bridge/                  # 跨链 UI 模块（占位）
│
├── stores/                      # Zustand 状态管理
│   ├── walletStore.ts           # 钱包/账户/链状态
│   ├── txStore.ts               # 交易队列 / 状态提示
│   └── uiStore.ts               # UI 控制状态（弹窗、提示）
│
├── services/                    # 后端服务 & 工具函数
│   ├── graphql/                 # TheGraph 查询封装（可选）
│   ├── api/                     # 自建后端接口封装（可选）
│   └── utils/                   # 工具函数集合（时间、地址格式化等）
│
├── config/                      # 配置项
│   ├── chains.ts                # 支持链配置（名称、chainId、RPC）
│   ├── contracts.ts             # 合约地址管理（按网络划分）
│   └── env.ts                   # 环境变量读取封装
│
├── types/                       # 类型定义（接口、合约参数、Tx结构）
│   ├── wallet.d.ts
│   ├── token.d.ts
│   └── contract.d.ts
│
├── public/                      # 静态资源（Logo、架构图等）
│   └── assets/
│       └── architecture.png     # 架构图
│
├── .env.example                 # 环境变量示例模板
├── vercel.json                  # Vercel 自动部署配置
├── README.md                    # 双语入口 README
├── README.zh.md                 # 中文版文档
├── README.en.md                 # 英文版文档
├── next.config.js               # Next.js 配置
├── tsconfig.json                # TypeScript 配置
└── package.json                 # 项目依赖与脚本

```

### 🔗 Connection Layer

- 钱包连接（MetaMask, WalletConnect）
- 多链支持（Ethereum, Base, Scroll 等）
- wagmi client & 自定义 chainConfig 封装

### 📱 Frontend Layer

- 钱包状态组件（连接/切换提示）
- Token 信息展示
- 交易状态提示（loading/pending/success/fail）

### 🧠 Hook & Service Layer

- useWallet / useTokenInfo / useContractWrite
- viem & wagmi 合约交互封装

### 🔐 Smart Contracts Layer

- 合约地址与 ABI 统一管理
- 动态合约读写调用封装
- 合约事件监听（watchEvent）

### 🔍 Data Layer

- The Graph 数据查询（如历史Tx、排行）
- 链下接口（签名验证、白名单、SBT 绑定等）

---

## 🔮 拓展模块（已预设占位）

项目预留未来高级模块，按需启用：

| 模块 | 功能 |
|------|------|
| `features/account-abstraction` | ERC4337 账户抽象 |
| `features/gasless`             | Meta Tx / Paymaster |
| `features/zk`                  | 零知识登录与验证 |
| `features/bridge`              | 跨链 UI + 桥接服务 |

---

## 📚 使用指南

### ✅ 安装依赖

```bash
pnpm install  # 或 yarn / npm
```

🧪 本地开发

```bash
pnpm dev
```

📁 环境变量配置

请参考 .env.example，配置：

```env
NEXT_PUBLIC_PROJECT_ID=xxxxxx   # WalletConnect projectId
NEXT_PUBLIC_RPC_SEPOLIA=https://...
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

🔐 合约部署（选配）

建议使用 Foundry 或 Hardhat 部署合约，并将 ABI + 地址导入 features/contracts/abi 与 config/contracts.ts

👨‍💻 项目作者

Henry（YiShengYouNi）

GitHub: @YiShengYouNi

Web2/Web3 前端工程师转型实践者

🧩 开源许可
MIT License. 自由使用、扩展、欢迎贡献。
