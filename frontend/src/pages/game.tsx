import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import RufflePlayerComponent from "@/components/ruffle-player";
import { useRouter } from "next/router";
import useGameStore from "@/zustand/games-store";
import dayjs from "dayjs";

const inter = Inter({ subsets: ["latin"] });

export default function GamePage() {
  const router = useRouter();
  const gameId = router.query.id?.toString();

  const { selectGame, selectedGame } = useGameStore((state) => state);

  const [isGameActive, setIsGameActive] = useState(false);
  const [metrics, setMetrics] = useState<{
    startTime: Date | null;
    endTime: Date | null;
    keystrokes: number;
    mouseClicks: number;
    totalPlayTime: number;
  }>({
    startTime: null,
    endTime: null,
    keystrokes: 0,
    mouseClicks: 0,
    totalPlayTime: 0,
  });

  useEffect(() => {
    if (gameId) {
      selectGame(gameId);
    }
  }, [gameId]);

  const handleGameStart = () => {
    if (isGameActive) return;

    setMetrics((prev) => ({
      ...prev,
      startTime: new Date(),
      endTime: null,
      keystrokes: 0,
      mouseClicks: 0,
      totalPlayTime: 0,
    }));

    setIsGameActive(true);
  };

  const handleGameEnd = () => {
    if (!isGameActive) return;

    setMetrics((prev) => {
      const endTime = dayjs();
      const startTime = dayjs(metrics.startTime ?? endTime);

      const diff = endTime.diff(startTime, "seconds");

      return {
        ...prev,
        endTime: endTime.toDate(),
        totalPlayTime: diff,
      };
    });
  };

  const handleError = (error: Error) => {
    console.error("Error loading SWF: ", error);
    handleGameEnd();
  };

  const handleKeyPress = () => {
    if (!isGameActive) return;

    setMetrics((prev) => ({ ...prev, keystrokes: prev.keystrokes + 1 }));
  };

  const handleMouseClick = () => {
    if (!isGameActive) return;

    setMetrics((prev) => ({ ...prev, mouseClicks: prev.mouseClicks + 1 }));
  };

  if (!gameId) {
    return <h1>Game ID is required</h1>;
  }

  return (
    <main
      className={`${inter.className} min-h-screen flex items-center justify-center text-white py-12 px-4`}
    >
      <div className="w-full flex items-center justify-center">
        {selectedGame && (
          <RufflePlayerComponent
            swfUrl={selectedGame.flashFile}
            width={800}
            height={600}
            onStart={handleGameStart}
            onEnd={handleGameEnd}
            onError={handleError}
          />
        )}
      </div>
    </main>
  );
}
