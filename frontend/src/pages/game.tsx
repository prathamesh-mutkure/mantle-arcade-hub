import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import RufflePlayerComponent from "@/components/ruffle-player";
import { useRouter } from "next/router";
import useGameStore from "@/zustand/games-store";

const inter = Inter({ subsets: ["latin"] });

export default function GamePage() {
  const router = useRouter();
  const gameId = router.query.id?.toString();

  const { selectGame, selectedGame } = useGameStore((state) => state);

  useEffect(() => {
    if (gameId) {
      selectGame(gameId);
    }
  }, [gameId]);

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
            onLoad={() => console.log("SWF loaded")}
            onError={() => console.log("Error loading SWF")}
          />
        )}
      </div>
    </main>
  );
}
