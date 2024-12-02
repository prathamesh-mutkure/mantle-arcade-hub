import React, { useState } from "react";
import GameCard from "./game-card";
import { useRouter } from "next/router";
import { Joystick } from "lucide-react";

function GameRow({
  rowId,
  title,
  games,
}: {
  rowId: string;
  title: string;
  games: Game[];
}) {
  const router = useRouter();

  const [trailerUrl, setTrailerUrl] = useState("");

  const slideLeft = () => {
    let slider = document.getElementById("slider" + rowId);
    slider && (slider.scrollLeft = slider.scrollLeft - 500);
  };

  const slideRight = () => {
    let slider = document.getElementById("slider" + rowId);

    slider && (slider.scrollLeft = slider.scrollLeft + 500);
  };

  const handleClick = (item: Game) => {
    router.push(`/game?id=${item.id}`);
  };

  return (
    <div className="relative z-10 p-8">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-black text-white mb-8 flex items-center gap-3 arcade-text">
          <Joystick className="w-8 h-8 text-yellow-400" />
          {title}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <GameCard key={index} handleClick={handleClick} item={game} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GameRow;
