import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useWallets } from "@/providers/PolkadotWalletsContext";
import { useWalletStore } from "@/providers/walletStoreProvider";
import { Wallet, LogOut, ChevronDown, X } from "lucide-react";
import type { BaseWallet, WalletMetadata } from "@polkadot-onboard/core";
import { ExternalLink } from "lucide-react";
import { extensionConfig } from "@/configs/extensionConnectConfig";
import { type ChainConfig, chainsConfig } from "@/configs/chainsConfig";
import Link from "next/link";

const WalletModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  wallets: BaseWallet[];
  onSelectWallet: (wallet: BaseWallet) => Promise<void>;
  isConnecting: boolean;
  connectingWallet: string | null;
}> = ({
  isOpen,
  onClose,
  wallets,
  onSelectWallet,
  isConnecting,
  connectingWallet,
}) => {
  if (!isOpen) return null;

  const walletConnect = wallets.find((w) => w.type === "WALLET_CONNECT");

  const allWallets = extensionConfig.supported;
  const installedWallets = new Set(
    wallets.map((wallet) => wallet.metadata.title)
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Select a Wallet</h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isConnecting}
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {allWallets?.map((wallet) => {
            const isInstalled = installedWallets.has(wallet.title);
            return (
              <div
                key={wallet.id}
                className="flex flex-col items-center justify-center p-4 border rounded-lg relative"
              >
                {wallet.iconUrl && (
                  <img
                    src={wallet.iconUrl}
                    alt={`${wallet.title} icon`}
                    className="w-12 h-12 mb-2"
                  />
                )}
                <span className="text-sm font-medium text-gray-800">
                  {wallet.title}
                </span>
                {isInstalled ? (
                  <button
                    type="button"
                    onClick={() =>
                      onSelectWallet(
                        wallets.find(
                          (w) => w.metadata.title === wallet.title
                        ) as BaseWallet
                      )
                    }
                    className="mt-2 px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200"
                    disabled={isConnecting}
                  >
                    Connect
                  </button>
                ) : (
                  <a
                    href={wallet.urls?.browsers?.chrome || wallet.urls?.main}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-200 flex items-center"
                  >
                    Install <ExternalLink size={14} className="ml-1" />
                  </a>
                )}
                {isConnecting && connectingWallet === wallet.title && (
                  <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {walletConnect && (
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4 text-center text-black">
              Other Connection Methods
            </h3>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => onSelectWallet(walletConnect)}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                disabled={isConnecting}
              >
                <img
                  src="/images/wallet-connect.svg"
                  alt="WalletConnect"
                  className="w-6 h-6 mr-2"
                />
                Connect with WalletConnect
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// SVG for Pacman animation
const PacmanSVG = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    className="text-yellow-400 fill-current"
  >
    <path d="M20,0 A20,20 0 1 1 20,40 A20,20 0 1 1 20,0 L20,20 Z">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 20 20"
        to="360 20 20"
        dur="0.5s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

const Header: React.FC = () => {
  const {
    connectedWallet,
    connectedAccount,
    disconnectWallet,
    disconnectAccount,
    accounts,
    connectAccount,
    connectWallet,
    currentChain,
    changeChain,
  } = useWalletStore((state) => state);

  const { wallets } = useWallets();

  const [showWalletModal, setShowWalletModal] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [showAccounts, setShowAccounts] = useState<boolean>(false);
  const [showChains, setShowChains] = useState<boolean>(false);
  const [isChangingChain, setIsChangingChain] = useState<boolean>(false);

  const toggleWalletModal = useCallback(
    () => setShowWalletModal((prev) => !prev),
    []
  );
  const toggleAccounts = useCallback(
    () => setShowAccounts((prev) => !prev),
    []
  );

  useEffect(() => {
    const lastUsedWalletMetadataStr = localStorage.getItem("selectedWallet");

    if (!lastUsedWalletMetadataStr) return;

    try {
      const lastUsedWalletMetadata = JSON.parse(
        lastUsedWalletMetadataStr
      ) as WalletMetadata;

      const lastUsedWallet = wallets?.find(
        (wallet) => wallet.metadata.id === lastUsedWalletMetadata.id
      );

      if (!lastUsedWallet) return;

      handleConnectWallet(lastUsedWallet);
    } catch (error) {
      console.error("Error connecting last used wallet:", error);
    }
  }, [wallets]);

  const handleConnectWallet = useCallback(
    async (wallet: BaseWallet) => {
      setIsConnecting(true);
      setConnectingWallet(wallet.metadata.title);

      localStorage.setItem("selectedWallet", JSON.stringify(wallet.metadata));

      try {
        await connectWallet(wallet);
        const walletAccounts = await wallet.getAccounts();
        if (walletAccounts && walletAccounts.length > 0) {
          await connectAccount(walletAccounts[0]);
        }
      } catch (error) {
        console.error("Error connecting wallet:", error);
      } finally {
        setIsConnecting(false);
        setConnectingWallet(null);
        setShowWalletModal(false);
      }
    },
    [connectWallet, connectAccount]
  );

  const handleDisconnect = useCallback(() => {
    localStorage.removeItem("selectedWallet");
    disconnectWallet();
    disconnectAccount();
    setShowAccounts(false);
  }, [disconnectWallet, disconnectAccount]);

  const truncatedAddress = useMemo(
    () =>
      connectedAccount?.address
        ? `${connectedAccount.address.slice(
            0,
            6
          )}...${connectedAccount.address.slice(-4)}`
        : "",
    [connectedAccount]
  );

  const handleChangeChain = async (chain: ChainConfig) => {
    setIsChangingChain(true);
    try {
      await changeChain(chain);
    } catch (error) {
      console.error("Error changing chain:", error);
    } finally {
      setIsChangingChain(false);
      setShowChains(false);
    }
  };

  return (
    <div className="relative z-20 bg-black border-b-8 border-t-8 border-yellow-400">
      <div className="absolute inset-0 overflow-hidden">
        {/* Retro moving lines effect */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              #ff00ff20 0px,
              #00ffff20 50px
            )`,
            backgroundSize: "100px 100px",
            animation: "slide 3s linear infinite",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto p-4 relative">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-4">
              <PacmanSVG />
              <h1
                className="text-6xl font-black text-white"
                style={{
                  textShadow: `
                    4px 0 0 #FF0000,
                    -4px 0 0 #00FF00,
                    0 4px 0 #0000FF,
                    0 -4px 0 #FF00FF
                  `,
                }}
              >
                .CADE
              </h1>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            {connectedWallet?.isConnected && connectedAccount ? (
              <>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowChains(!showChains)}
                    className="relative hidden  md:flex flex-row items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold transform hover:scale-105 transition-all overflow-hidden group"
                    disabled={isChangingChain}
                  >
                    <img
                      src={currentChain?.logo || "/images/polkadot-logo.svg"}
                      alt={currentChain?.name || "Polkadot"}
                      width={24}
                      height={24}
                      className="relative z-10"
                    />

                    <span className="relative z-10">
                      {currentChain?.name || "Polkadot"}
                    </span>

                    {isChangingChain ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white relative z-10" />
                    ) : (
                      <ChevronDown size={16} className="relative z-10" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 transform translate-y-full group-hover:translate-y-0 transition-transform" />
                  </button>

                  {showChains && !isChangingChain && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1" role="menu">
                        {chainsConfig.map((chain) => (
                          <button
                            type="button"
                            key={chain.name}
                            onClick={() => handleChangeChain(chain)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-200"
                          >
                            <div className="flex items-center space-x-2">
                              <img
                                src={chain.logo}
                                alt={chain.name}
                                width={24}
                                height={24}
                              />
                              <span>{chain.name}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative hidden md:block">
                  <button
                    type="button"
                    onClick={toggleAccounts}
                    className="flex items-center gap-2 relative px-6 py-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold transform hover:scale-105 transition-all overflow-hidden group"
                  >
                    {connectedWallet?.metadata?.iconUrl && (
                      <img
                        src={connectedWallet.metadata.iconUrl}
                        alt="wallet icon"
                        className="w-5 h-5 rounded-full relative z-10"
                      />
                    )}
                    <span className="relative z-10">{truncatedAddress}</span>
                    <ChevronDown size={16} className="relative z-10" />

                    <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-pink-400 transform translate-y-full group-hover:translate-y-0 transition-transform" />
                  </button>
                  {showAccounts && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1 max-h-60 overflow-auto" role="menu">
                        {accounts.map((account) => (
                          <button
                            type="button"
                            key={account.address}
                            onClick={() => {
                              connectAccount(account);
                              setShowAccounts(false);
                            }}
                            className={`block px-4 py-2 text-sm w-full text-left transition duration-200 ${
                              connectedAccount.address === account.address
                                ? "bg-gray-200 text-gray-900"
                                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                          >
                            <div className="font-medium">
                              {account.name || "Unnamed Account"}
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                              {account.address}
                            </div>
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={handleDisconnect}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition duration-200 flex items-center space-x-2"
                        >
                          <LogOut size={16} />
                          <span>Disconnect Wallet</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={toggleWalletModal}
                className="relative px-6 py-3 flex flex-row items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold transform hover:scale-105 transition-all overflow-hidden group"
              >
                <Wallet size={16} className="relative z-10" />
                <span className="relative z-10">Connect</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 transform translate-y-full group-hover:translate-y-0 transition-transform" />
              </button>
            )}

            <Link href="/profile">
              <div className="w-14 h-14 rounded-full bg-gray-700 overflow-hidden">
                <img
                  src="/profile.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <WalletModal
        isOpen={showWalletModal}
        onClose={() => !isConnecting && setShowWalletModal(false)}
        wallets={wallets || []}
        onSelectWallet={handleConnectWallet}
        isConnecting={isConnecting}
        connectingWallet={connectingWallet}
      />
    </div>
  );
};

export default Header;
