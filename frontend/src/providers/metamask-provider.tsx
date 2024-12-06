import { createMetaMaskStore, MetaMaskState } from "@/zustand/metamask-store";
import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useStore, type StoreApi } from "zustand";

const MetaMaskContext = createContext<StoreApi<MetaMaskState> | null>(null);

interface MetaMaskProviderProps {
  children: ReactNode;
}

export const MetaMaskProvider = ({ children }: MetaMaskProviderProps) => {
  const store = createMetaMaskStore();

  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      const state = store.getState();

      if (accounts.length === 0) {
        state.disconnect();
      } else if (state.accountAddress !== accounts[0]) {
        store.setState({
          accountAddress: accounts[0],
          isConnected: true,
        });
      }
    };

    // Handle chain changes
    const handleChainChanged = () => {
      window.location.reload();
    };

    // Check initial connection
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            store.setState({
              accountAddress: accounts[0],
              isConnected: true,
            });
          }
        } catch (error) {
          console.error("Error checking connection:", error);
        }
      }
    };

    checkConnection();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, [store]);

  return (
    <MetaMaskContext.Provider value={store}>
      {children}
    </MetaMaskContext.Provider>
  );
};

export const useMetaMask = <T,>(selector: (state: MetaMaskState) => T): T => {
  const store = useContext(MetaMaskContext);

  if (!store) {
    throw new Error("useMetaMask must be used within MetaMaskProvider");
  }

  return useStore(store, selector);
};
