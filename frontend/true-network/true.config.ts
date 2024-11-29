import { TrueApi, testnet } from "@truenetworkio/sdk";
import { TrueConfig } from "@truenetworkio/sdk/dist/utils/cli-config";

// If you are not in a NodeJS environment, please comment the code following code:
import dotenv from "dotenv";
dotenv.config();

export const getTrueNetworkInstance = async (): Promise<TrueApi> => {
  const trueApi = await TrueApi.create(config.account.secret);

  await trueApi.setIssuer(config.issuer.hash);

  return trueApi;
};

export const config: TrueConfig = {
  network: testnet,
  account: {
    address: "ky1nhZceGybqAfJaHBaZ2p4jWBJcMyP5msmScmHBxuR7pkV",
    secret: process.env.TRUE_NETWORK_SECRET_KEY ?? "",
  },
  issuer: {
    name: "dotcade",
    hash: "0xc4dc0e2ce7ff3034f7d94cfe9cf5e8b90e57168c73b6eab3dbfa22abc637ab55",
  },
  algorithm: {
    id: undefined,
    path: undefined,
    schemas: []
  },
};
