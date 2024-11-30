import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import RufflePlayerComponent from "@/components/ruffle-player";
import { useRouter } from "next/router";
import useGameStore from "@/zustand/games-store";
import dayjs from "dayjs";

type TGameMetrics = {
  startTime: Date | null;
  endTime: Date | null;
  keystrokes: number;
  mouseClicks: number;
  totalPlayTime: number;
};

export default function GamePage() {
  const router = useRouter();
  const gameId = router.query.id?.toString();

  const { selectGame, selectedGame } = useGameStore((state) => state);

  const [isGameActive, setIsGameActive] = useState(false);
  const [metrics, setMetrics] = useState<TGameMetrics>({
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

  function handleGameStart() {
    if (isGameActive) return;

    console.log("Game started");

    setMetrics((prev) => ({
      ...prev,
      startTime: new Date(),
      endTime: null,
      keystrokes: 0,
      mouseClicks: 0,
      totalPlayTime: 0,
    }));

    setIsGameActive(true);
  }

  function handleGameEnd() {
    console.log("helo", isGameActive);

    if (!isGameActive) return;

    console.log("Game ended");

    const endTime = dayjs(new Date());

    setMetrics((prev) => {
      const startTime = dayjs(prev.startTime ?? endTime);

      const diff = endTime.diff(startTime, "seconds");

      console.log("endTime: ");
      console.log(endTime);
      console.log(endTime.toDate());

      const data = {
        ...prev,
        endTime: endTime.toDate(),
        totalPlayTime: diff,
      };

      // sendMetricsToBackend(data);

      return data;
    });

    console.log("Metrics: ", metrics);

    sendMetricsToBackend(metrics);
  }

  function handleError(error: Error) {
    console.error("Error loading SWF: ", error);
    handleGameEnd();
  }

  function handleKeyPress() {
    if (!isGameActive) return;

    setMetrics((prev) => ({ ...prev, keystrokes: prev.keystrokes + 1 }));
  }

  function handleMouseClick() {
    if (!isGameActive) return;

    setMetrics((prev) => ({ ...prev, mouseClicks: prev.mouseClicks + 1 }));
  }

  const sendMetricsToBackend = async (gameMetrics: TGameMetrics) => {
    console.log("Sending metrics to backend: ", gameMetrics);

    // try {
    //   await fetch("/api/true/attest", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       ...gameMetrics,
    //       gameId: selectedGame?.id!,
    //     }),
    //   });
    // } catch (error) {
    //   console.error("Failed to send metrics:", error);
    // }
  };

  if (!gameId) {
    return <h1>Game ID is required</h1>;
  }

  return (
    <main
      className={`min-h-screen flex items-center justify-center text-white py-12 px-4`}
    >
      <div className="w-full flex items-center justify-center">
        {selectedGame && (
          <RufflePlayerComponent
            swfUrl={selectedGame.flashFile}
            width={800}
            height={600}
            // onStart={handleGameStart}
            // onEnd={handleGameEnd}
            // onError={handleError}
          />
        )}
      </div>
    </main>
  );
}
