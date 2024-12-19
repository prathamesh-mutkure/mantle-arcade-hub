import "@/styles/globals.css";
import Navbar from "@/components/nav-bar";
import type { AppProps } from "next/app";
import { GoogleAnalytics } from "@next/third-parties/google";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { DYNAMIC_ENV_ID } from "@/lib/constants";
import { wagmiConfig } from "@/configs/wagmi";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: DYNAMIC_ENV_ID,
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <Navbar />
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
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
