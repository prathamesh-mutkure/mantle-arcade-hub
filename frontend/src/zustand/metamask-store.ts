import { createStore } from "zustand";

export interface MetaMaskState {
  accountAddress: string | null;
  isConnected: boolean;
  isLoading: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const createMetaMaskStore = () => {
  return createStore<MetaMaskState>((set) => ({
    accountAddress: null,
    isConnected: false,
    isLoading: false,

    connect: async () => {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      set({ isLoading: true });

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        if (accounts[0]) {
          set({
            accountAddress: accounts[0],
            isConnected: true,
          });
        }
      } catch (error) {
        console.error("Connection error:", error);
      } finally {
        set({ isLoading: false });
      }
    },

    disconnect: () => {
      set({
        accountAddress: null,
        isConnected: false,
      });
    },
  }));
};
