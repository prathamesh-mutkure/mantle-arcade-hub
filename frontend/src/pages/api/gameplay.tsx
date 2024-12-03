import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ResponseData = {
  gameplay?: any;
  userScore?: any;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      userId,
      gameId,
      gamePlayDuration,
      keyStrokes,
      mouseClicks,
      gamingActivity,
      overallScore,
    } = req.body;

    // Input validation
    if (!userId || !gameId) {
      return res.status(400).json({ error: "userId and gameId are required" });
    }

    // Start a transaction to update both tables
    const result = await prisma.$transaction(async (tx) => {
      // First ensure UserScore exists
      await tx.userScore.upsert({
        where: { userId },
        create: {
          userId,
          score: 0, // Initial score
        },
        update: {}, // No update needed if exists
      });

      // Create or update gameplay stats
      const gameplay = await tx.gamePlay.upsert({
        where: {
          userId_gameId: {
            userId,
            gameId,
          },
        },
        create: {
          userId,
          gameId,
          totalGamePlayDuration: gamePlayDuration,
          keyStrokes,
          mouseClicks,
          gamingActivity,
        },
        update: {
          numberOfGameplays: { increment: 1 },
          totalGamePlayDuration: { increment: gamePlayDuration },
          keyStrokes: { increment: keyStrokes },
          mouseClicks: { increment: mouseClicks },
          gamingActivity: { increment: gamingActivity },
        },
      });

      // Update user's overall score
      const userScore = await tx.userScore.upsert({
        where: { userId },
        create: {
          userId,
          score: overallScore,
        },
        update: {
          score: { increment: overallScore },
        },
      });

      return { gameplay, userScore };
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error processing gameplay:", error);
    console.log(error);

    return res.status(500).json({ error: "Failed to process gameplay" });
  } finally {
    // Optional: Disconnect PrismaClient if not using global instance
    await prisma.$disconnect();
  }
}
