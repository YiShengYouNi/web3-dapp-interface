// ✅ src/features/wallet/stores/walletStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WalletState {
  address?: `0x${string}` | undefined;
  isConnected: boolean;
  connector?: string;
  chainId?: number;
  setWallet: (data: Partial<WalletState>) => void;
  reset: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      address: undefined,
      isConnected: false,
      connector: undefined,
      chainId: undefined,

      setWallet: (data) => set((state) => ({ ...state, ...data })),
      reset: () =>
        set({
          address: undefined,
          isConnected: false,
          connector: undefined,
          chainId: undefined,
        }),
    }),
    {
      name: "wallet-store",
      partialize: (state) => ({
        address: state.address,
        isConnected: state.isConnected,
        connector: state.connector,
        chainId: state.chainId,
      }),
    },
  ),
);
