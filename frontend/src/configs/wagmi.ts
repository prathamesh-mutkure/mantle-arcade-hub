import { http, createConfig } from "wagmi";
import { mantleSepoliaTestnet } from "viem/chains";

export const wagmiConfig = createConfig({
  chains: [mantleSepoliaTestnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mantleSepoliaTestnet.id]: http(),
  },
});
