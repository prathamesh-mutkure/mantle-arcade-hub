import { ApiPromise, WsProvider } from "@polkadot/api";

export interface ChainConfig {
  name: string;
  rpcUrl: string;
  wsUrl: string;
  logo: string;
  contractAddress?: string;
  prefix: number;
}

export const chainsConfig: ChainConfig[] = [
  {
    name: "Polkadot",
    rpcUrl: "https://rpc.polkadot.io",
    wsUrl: "wss://rpc.polkadot.io",
    logo: "/images/polkadot-logo.svg",
    prefix: 0,
  },
  {
    name: "Kusama",
    rpcUrl: "https://kusama-rpc.polkadot.io",
    wsUrl: "wss://kusama-rpc.polkadot.io",
    logo: "/images/kusama-logo.svg",
    prefix: 2,
  },
  {
    name: "Westend",
    rpcUrl: "https://westend-rpc.polkadot.network",
    wsUrl: "wss://westend-rpc.polkadot.io",
    logo: "/images/polkadot-logo.svg",
    prefix: 42,
  },
  {
    name: "True Network",
    rpcUrl: "https://raman.truenetwork.io/ws",
    wsUrl: "wss://raman.truenetwork.io/ws",
    logo: "/images/polkadot-logo.svg",
    prefix: 7,
  },
  {
    name: "Kilt",
    rpcUrl: "",
    wsUrl: "wss://peregrine.kilt.io",
    logo: "/images/kilt-icon.svg",
    prefix: 8,
  },
  // Add more chains as needed
];

export const getApiForChain = async (
  chainConfig: ChainConfig
): Promise<ApiPromise> => {
  const provider = new WsProvider(chainConfig.wsUrl);
  return await ApiPromise.create({ provider });
};
