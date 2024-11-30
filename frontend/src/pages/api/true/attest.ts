import type { NextApiRequest, NextApiResponse } from "next";
import { U32, U64 } from "@truenetworkio/sdk";
import { getTrueNetworkInstance } from "@/../true-network/true.config";
import { gameScoreSchema } from "@/../true-network/scheme";

type AttestPayload = {
  gameId: string; // U64
  gameGenre: string; // U64
  startTime: string; // U64
  endTime: string; // U64
  duration: string; // U64
  gameCompleted: number; // U32
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   if (req.method !== "POST") {
  //     return res.status(405).json({ message: "Method not allowed" });
  //   }

  try {
    const payload = req.body as AttestPayload;

    const api = await getTrueNetworkInstance();

    const user = "5CCkwkniDu4VGismTQGjDmHgELXTxZnc11Pn7wDQKxqQgxyj";

    const output = await gameScoreSchema.attest(api, user, {
      gameId: 0,

      startTime: 0,
      endTime: 10,
      duration: 10,

      gameCompleted: 1,
      gameGenre: 0,
    });

    // Output is usually the transaction hash for verification on-chain.
    console.log(output);

    // Make sure to disconnect the network after operation(s) is done.
    await api.network.disconnect();

    return res.status(200).json({ success: true, output });
  } catch (error) {
    return res.status(500).json({ error: "Failed to process attestation" });
  }
}

const attestGamePlayToUser = async () => {};

attestGamePlayToUser();
