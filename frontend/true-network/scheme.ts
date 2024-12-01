import { Text, Schema, U32, U64 } from "@truenetworkio/sdk";

export const userGameScoreSchema = Schema.create({
  gameId: Text,
  userId: Text,

  totalGamePlayDuration: U64,
  numberOfGameplays: U64,

  keyStokes: U64,
  mouseClicks: U64,

  gamingActivity: U64,
});

/*
 * @deprecated - This schema is no longer used.
 */
export const gameScoreSchema = Schema.create({
  gameId: U64,
  gameGenre: U64,

  startTime: U64,
  endTime: U64,
  duration: U64,

  gameCompleted: U32, // 1 for completed, 0 for not completed
});
