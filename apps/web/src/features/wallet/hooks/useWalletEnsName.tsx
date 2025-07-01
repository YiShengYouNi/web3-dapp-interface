import { useEnsName, useAccount } from "wagmi";
import { formatAddress } from "../utils/address";

export function useWalletEnsName() {
  /**
   * 问题一：ensName 属于派生属性，源自address，查询是异步的，不应该在 zustand 中存储。
   *
   * 问题二： address 为什么不从 zustand 中获取？因为 address 是 wagmi 的状态，可能会在组件中变化。
   * 如果在 zustand 中存储，可能会导致组件更新不及时。
   * 所以这里直接使用 wagmi 的 useAccount hook 获取 address。
   */
  const { address } = useAccount();
  const { data: ensName, isLoading } = useEnsName({ address });

  return {
    ensName,
    isLoading,
    displayName: ensName || formatAddress(address),
  };
}
