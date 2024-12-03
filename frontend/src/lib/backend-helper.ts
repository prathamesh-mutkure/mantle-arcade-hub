// lib/game-api.ts
import axios from "axios";

// Types
export interface GamePlayInput {
  userId: string;
  gameId: string;
  gamePlayDuration: number;
  keyStrokes: number;
  mouseClicks: number;
  gamingActivity: number;
  overallScore: number;
}

export interface GamePlay extends GamePlayInput {
  id: string;
  numberOfGameplays: number;
  totalGamePlayDuration: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserScore {
  userId: string;
  score: number;
  createdAt: string;
  updatedAt: string;
}

export interface GamePlayResponse {
  gameplay: GamePlay;
  userScore: UserScore;
}

export async function storeAttestationInBackend(
  gamePlayData: GamePlayInput
): Promise<GamePlayResponse> {
  try {
    const { data } = await axios.post<GamePlayResponse>(
      "/api/gameplay",
      gamePlayData
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }

    throw new Error("Failed to submit gameplay data");
  }
}

export interface GameStats {
  plays: number;
  duration: number;
  keyStrokes: number;
  mouseClicks: number;
}

export interface GameActivity {
  gameId: string;
  gamingActivity: number;
  stats: GameStats;
}

export interface UserStatsResponse {
  userId: string;
  totalScore: number;
  games: GameActivity[];
}

export async function getUserStats(userId: string): Promise<UserStatsResponse> {
  try {
    const response = await axios.get<UserStatsResponse>(
      `/api/users/${userId}/stats`
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch user stats"
      );
    }

    throw error;
  }
}
