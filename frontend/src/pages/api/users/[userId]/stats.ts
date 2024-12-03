import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const userId = req.query.userId as string;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const userStats = await prisma.userScore.findUnique({
      where: {
        userId: userId,
      },
      include: {
        gamePlays: {
          select: {
            gameId: true,
            gamingActivity: true,
            numberOfGameplays: true,
            totalGamePlayDuration: true,
            keyStrokes: true,
            mouseClicks: true,
          },
        },
      },
    });

    if (!userStats) {
      return res.status(404).json({ message: "User not found" });
    }

    // Transform the data to a more friendly format
    const response = {
      userId: userStats.userId,
      totalScore: userStats.score,
      games: userStats.gamePlays.map((game) => ({
        gameId: game.gameId,
        gamingActivity: game.gamingActivity,
        stats: {
          plays: game.numberOfGameplays,
          duration: game.totalGamePlayDuration,
          keyStrokes: game.keyStrokes,
          mouseClicks: game.mouseClicks,
        },
      })),
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}
