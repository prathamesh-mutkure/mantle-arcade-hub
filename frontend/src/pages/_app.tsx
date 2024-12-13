import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WalletStoreProvider } from "@/providers/walletStoreProvider";
import dynamic from "next/dynamic";
import walletAggregator from "@/providers/walletProviderAggregator";
import { MetaMaskProvider } from "@/providers/metamask-provider";
import { GoogleAnalytics } from "@next/third-parties/google";

const PolkadotWalletsContextProvider = dynamic(
  () =>
    import("@/providers/PolkadotWalletsContext").then(
      (mod) => mod.PolkadotWalletsContextProvider
    ),
  { ssr: false }
);

const Header = dynamic(() => import("@/components/Header"), { ssr: false });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PolkadotWalletsContextProvider walletAggregator={walletAggregator}>
      <WalletStoreProvider>
        <MetaMaskProvider>
          <Header />
          <Component {...pageProps} />
          <GoogleAnalytics gaId="G-9SSE6ELV91" />

          <style jsx global>{`
            @keyframes slide {
              from {
                transform: translateX(0);
              }
              to {
                transform: translateX(100px);
              }
            }

            @keyframes blink {
              0%,
              100% {
                opacity: 1;
              }
              50% {
                opacity: 0;
              }
            }

            .arcade-text {
              text-transform: uppercase;
              letter-spacing: 2px;
              -webkit-text-stroke: 2px currentColor;
            }

            .font-vt323 {
              font-family: monospace;
              letter-spacing: 1px;
            }

            .animate-blink {
              animation: blink 1s step-end infinite;
            }
          `}</style>
        </MetaMaskProvider>
      </WalletStoreProvider>
    </PolkadotWalletsContextProvider>
  );
}
