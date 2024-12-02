import React, { useEffect } from "react";
import RufflePlayerComponent from "@/components/ruffle-player";
import { useRouter } from "next/router";
import useGameStore from "@/zustand/games-store";

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
      className={`h-[calc(100vh-108px)] flex items-center justify-center text-white py-12 px-4`}
    >
      {selectedGame && (
        <RufflePlayerComponent
          swfUrl={selectedGame.flashFile}
          gameId={selectedGame.id}
          gameType={selectedGame.type}
        />
      )}
    </main>
  );
}
