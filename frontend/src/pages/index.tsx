import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import GameRow from "@/components/game-row";
import Main from "@/components/hero";
import useGameStore from "@/zustand/games-store";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const games = useGameStore((state) => state.games);

  const categorizedGames = {
    featured: games.filter((game) => game.featured),
    action: games.filter((game) => game.categories.includes("action")),
    adventure: games.filter((game) => game.categories.includes("adventure")),
    arcade: games.filter((game) => game.categories.includes("arcade")),
    puzzle: games.filter((game) => game.categories.includes("puzzle")),
    strategy: games.filter((game) => game.categories.includes("strategy")),
    sports: games.filter((game) => game.categories.includes("sports")),
    racing: games.filter((game) => game.categories.includes("racing")),
    simulation: games.filter((game) => game.categories.includes("simulation")),
    casino: games.filter((game) => game.categories.includes("casino")),
    other: games.filter((game) => game.categories.includes("other")),
  };

  return (
    <main className="">
      <Main />

      {categorizedGames.featured.length > 0 && (
        <GameRow
          rowId="featured"
          title="Featured Games"
          games={categorizedGames.featured}
        />
      )}

      {Object.entries(categorizedGames).map(
        ([category, categoryGames], index) => {
          // Skip featured category as it's already shown and empty categories
          if (category === "featured" || categoryGames.length === 0)
            return null;

          return (
            <GameRow
              key={category}
              rowId={category}
              title={category.charAt(0).toUpperCase() + category.slice(1)}
              games={categoryGames}
            />
          );
        }
      )}
    </main>
  );
}
