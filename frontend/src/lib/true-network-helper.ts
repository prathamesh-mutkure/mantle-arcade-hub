import { U32, U64 } from "@truenetworkio/sdk";
import { getTrueNetworkInstance } from "@/../true-network/true.config";
import { gameScoreSchema, userGameScoreSchema } from "@/../true-network/scheme";

export type TUserGameScoreSchema = {
  gameId: string;
  userId: string;

  totalGamePlayDuration: number;
  numberOfGameplays: number;

  keyStokes: number;
  mouseClicks: number;

  gamingActivity: number;
};

export async function attestUserGameScore(payload: TUserGameScoreSchema) {
  const api = await getTrueNetworkInstance();

  const user = payload.gameId;

  const txHash = await userGameScoreSchema.attest(api, user, {
    ...payload,
  });

  if (!txHash) {
    throw new Error("Failed to attest game play");
  }

  await api.network.disconnect();

  return txHash;
}

/*
 * @deprecated - This schema is no longer used.
 */
type TGameScoreSchema = {
  gameId: string; // U64
  gameGenre: string; // U64
  startTime: string; // U64
  endTime: string; // U64
  duration: string; // U64
  gameCompleted: number; // U32
};

/*
 * @deprecated - This schema is no longer used.
 */
async function attestGameScore(payload: TGameScoreSchema) {
  const api = await getTrueNetworkInstance();

  const user = "5CCkwkniDu4VGismTQGjDmHgELXTxZnc11Pn7wDQKxqQgxyj";

  const txHash = await gameScoreSchema.attest(api, user, {
    gameId: 0,

    startTime: 0,
    endTime: 10,
    duration: 10,

    gameCompleted: 1,
    gameGenre: 0,
  });

  if (!txHash) {
    throw new Error("Failed to attest game play");
  }

  await api.network.disconnect();

  return txHash;
}
