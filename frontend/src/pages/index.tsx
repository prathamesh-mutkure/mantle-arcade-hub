import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import GameRow from "@/components/game-row";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`${inter.className} min-h-screen bg-gradient-to-b text-white py-12 px-4`}
    >
      <GameRow rowId={1} title="Action" />
      <GameRow rowId={2} title="Pokers" />
      <GameRow rowId={3} title="Arcade" />
      <GameRow rowId={4} title="Multiplayer" />
      <GameRow rowId={5} title="Kids" />
    </main>
  );
}
