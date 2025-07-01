import { useAccount, usePublicClient } from "wagmi";
import { useEffect, useState } from "react";
import { getPublicClient } from "wagmi/actions";

export function useIsContractWallet(): boolean | undefined {
  /**
   * 为什么不用 zustand 存储 address 和 chainId？
   * 使用原则：以响应式依赖为主，以 store 为状态集中为辅
   * useAccount() 是 wagmi 内部响应式状态，自动跟踪更新
   */
  const { address, chainId } = useAccount();
  const client = usePublicClient();
  const [isContract, setIsContract] = useState<boolean | undefined>();

  useEffect(() => {
    if (!address || !chainId || !client) return;

    client
      .getBytecode({ address })
      .then((bytecode) => {
        setIsContract(!!bytecode);
      })
      .catch(() => {
        setIsContract(undefined);
      });
  }, [address, chainId]);

  return isContract;
}
