import React, { useState } from "react";
import GameCard from "./game-card";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Router, useRouter } from "next/router";
import useGameStore from "@/zustand/games-store";

function GameRow({ rowId, title }: { rowId: number; title: string }) {
  const router = useRouter();

  const games = useGameStore((state) => state.games);
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
    router.push(`/game?id=${item.id}}`);
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>

      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          size={40}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />

        <div
          id={"slider" + rowId}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {games.map((item, id) => (
            <GameCard key={id} item={item} handleClick={handleClick} />
          ))}
        </div>

        <MdChevronRight
          onClick={slideRight}
          size={40}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
      </div>

      {/* {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} */}
    </>
  );
}

export default GameRow;