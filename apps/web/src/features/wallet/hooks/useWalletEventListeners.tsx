// features/wallet/hooks/useWalletEventListeners.ts
"use client";
import { useEffect, useRef } from "react";
import { useAccount, useChainId } from "wagmi";
import { useWalletStore } from "../stores/walletStore";
import { showInfo } from "@/lib/toast";

export function useWalletEventListeners() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const reset = useWalletStore((state) => state.reset);
  const setWallet = useWalletStore((state) => state.setWallet);
  // 用 ref 追踪上一次状态，避免首次加载误触发
  const prevAddressRef = useRef<string | undefined>(undefined);
  const prevChainIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // 👤 监听账户切换或断开连接
    const prevAddress = prevAddressRef.current;

    // 钱包断开
    if (!isConnected && prevAddress) {
      reset();
      showInfo("Wallet disconnected");
    }
    // 账户切换
    if (isConnected && address && address !== prevAddress) {
      setWallet({ address, isConnected: true });
      showInfo(`Switched to ${address}`);
    }

    prevAddressRef.current = address;
  }, [address, isConnected, reset]);

  useEffect(() => {
    // 🌐 监听链 ID 切换
    const prevChainId = prevChainIdRef.current;
    if (prevChainId !== undefined && chainId !== prevChainId) {
      setWallet({ chainId });
      showInfo(`Switched to chain ${chainId}`);
    }
    prevChainIdRef.current = chainId;
  }, [chainId, setWallet]);
}
