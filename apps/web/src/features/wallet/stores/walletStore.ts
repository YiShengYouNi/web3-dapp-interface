// ✅ src/features/wallet/stores/walletStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WalletState {
  address?: `0x${string}` | undefined;
  isConnected: boolean;
  connector?: string;
  connectorId: string | undefined;
  chainId?: number;
  setWallet: (data: Partial<WalletState>) => void;
  reset: () => void;
}

export const useWalletStore = create<WalletState>()(
  (set) => ({
    address: undefined,
    isConnected: false,
    connector: undefined,
    connectorId: undefined,
    chainId: undefined,
    setWallet: (data) => set((state) => ({ ...state, ...data })),
    reset: () =>
      set({
        address: undefined,
        isConnected: false,
        connector: undefined,
        connectorId: undefined,
        chainId: undefined,
      }),
  }),
  // persist(
  //   (set) => ({
  //     address: undefined,
  //     isConnected: false,
  //     connector: undefined,
  //     connectorId: undefined,
  //     chainId: undefined,
  //     hasHydrated: false,
  //     setHydrated: () => set({ hasHydrated: true }),
  //     setWallet: (data) => set((state) => ({ ...state, ...data })),
  //     reset: () =>
  //       set({
  //         address: undefined,
  //         isConnected: false,
  //         connector: undefined,
  //         connectorId: undefined,
  //         chainId: undefined,
  //       }),
  //   }),
  //   {
  //     name: "wallet-store",
  //     partialize: (state) => ({
  //       address: state.address,
  //       isConnected: state.isConnected,
  //       connector: state.connector,
  //       connectorId: state.connectorId,
  //       chainId: state.chainId,

  //     }),
  //     onRehydrateStorage: () => (state) => {
  //       state?.setHydrated(); // ✅ hydration 完成后标记
  //     },
  //   },
  // ),
);
