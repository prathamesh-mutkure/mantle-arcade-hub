import { Hash, Schema, U32, U64, U8 } from "@truenetworkio/sdk";

export const gameScoreSchema = Schema.create({
  gameId: U64,
  gameGenre: U64,

  startTime: U64,
  endTime: U64,
  duration: U64,

  gameCompleted: U32, // 1 for completed, 0 for not completed
});
