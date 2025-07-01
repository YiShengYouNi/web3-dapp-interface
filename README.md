# 🧱 web3-dapp-interface

> 一个现代化、工程化的 Web3 钱包与合约交互前端框架，采用 **Monorepo + pnpm workspace + TurboRepo** 架构构建，集成 wagmi v2、viem、shadcn/ui，支持多链、钱包连接、登录签名、Token 交互、事件监听、Permit 授权等核心功能，适用于 Web3 DApp 快速搭建与扩展开发。

---

## 🚀 项目亮点

- ✅ **Monorepo 架构**：统一管理前端、合约与配置模块，支持工程拆分与复用
- ✅ **完整钱包支持**：多钱包连接、自动连接、ENS 解析、合约钱包校验（EIP-1271）
- ✅ **登录认证系统**：支持 EIP-191 / EIP-712 签名登录 + JWT 状态管理
- ✅ **合约交互能力**：支持 ERC20 mint、permit 授权、事件监听与状态同步
- ✅ **模块化工程组织**：支持 Zustand 状态集中管理、shadcn/ui UI 体系、可复用 hooks 封装
- ✅ **跨链适配设计**：支持多链配置、链切换与错误处理
- ✅ **适用于求职作品/真实项目启动/教学演示场景**

---

## 🏗️ 项目结构

```bash
web3-dapp-interface/
├── apps/
│   ├── web/              # DApp 前端（Next.js + wagmi + viem）
│   └── contracts/        # 合约模块（Hardhat 构建）
├── packages/
│   ├── config/           # 跨项目共享配置：链信息、合约地址、常量
│   ├── abi/              # ABI 类型文件（自动生成）
│   ├── sdk/              # 合约调用封装（useXxx hooks）
│   ├── ui/               # UI 组件库（封装后的 shadcn/ui）
│   └── utils/            # 通用工具函数
├── turbo.json            # TurboRepo 配置
├── pnpm-workspace.yaml   # workspace 管理配置
├── tsconfig.base.json    # 全局 tsconfig

```

## 📦 技术栈

|模块 |技术选型|
|---|---|
|前端框架 | Next.js 15 + React 19 + TypeScript |
|钱包连接 | wagmi v2 + viem + ENS + EIP-1271 |
|合约交互 | Hardhat + ethers + viem |
|登录认证 | EIP-712 + EIP-191 + JWT + Zustand |
|UI 框架 | shadcn/ui + TailwindCSS |
|状态管理 | Zustand |
|工程体系 | pnpm workspace + TurboRepo |

## 📲 功能模块

|模块 | 描述 |
|---|---|
|钱包连接 | 多钱包支持、链切换、自动连接、合约钱包校验 |
|登录系统 | 支持签名登录（EIP-712）、状态持久化 |
|Token 模块 | 支持 Mint、余额显示、事件监听 |
|授权模块 | 支持 approve + permit（EIP-2612）|
|状态管理 | 使用 Zustand 管理登录状态、钱包状态 |
|UI 系统 | 基于 shadcn/ui 构建统一交互与展示体系 |

## 🧪 快速启动

```bash
# 克隆项目
git clone https://github.com/YiShengYouNi/web3-dapp-interface.git
cd web3-dapp-interface

# 安装依赖
pnpm install

# 启动合约节点（可选）
cd apps/contracts
pnpm hardhat node

# 编译合约并部署（本地 / sepolia）
pnpm hardhat compile
pnpm hardhat run scripts/deploy.ts --network localhost

# 启动前端
cd ../../apps/web
pnpm dev
```

## 🔗 关联项目

web3-engineering-starter-kit — 本项目架构灵感与结构演化基础

mini-react-hooks-runtime — 结合 React Fiber 模拟 hooks 执行机制

## 📌 适合人群

Web2 向 Web3 转型工程师

需要展示工程能力的求职者

教学/演示 Web3 钱包与合约调用机制

想构建高度模块化 DApp 项目的人

## 📮 联系作者

欢迎通过以下方式联系或交流：

GitHub: YiShengYouNi

X（推特）: @0xhenryxyz

邮箱: <heng.wei1226@gmail.com>
