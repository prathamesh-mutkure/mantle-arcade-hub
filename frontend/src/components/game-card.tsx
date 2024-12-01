import React, { useState } from "react";
import { Heart } from "lucide-react";

function GameCard({
  item,
  handleClick,
}: {
  item: Game;
  handleClick: (item: Game) => void;
}) {
  const [like, setLike] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleLike = async () => {
    setLike((val) => !val);
  };

  return (
    <div
      className="w-40 sm:w-52 md:w-60 lg:w-72 inline-block cursor-pointer relative p-2 hover:scale-105 transition-transform"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleClick(item)}
    >
      <img
        // onClick={() => handleClick(item)}
        className="w-full transform transition duration-500 hover:scale-105"
        src={item.poster}
        alt={item.name}
      />

      {/* Game name overlay on hover */}
      <div
        className={`absolute inset-0 bg-black/70 transition-opacity duration-300 flex items-end p-4
        ${isHovered ? "opacity-100" : "opacity-0"}`}
      >
        <p className="text-white font-semibold text-lg">{item.name}</p>
      </div>

      <div
        onClick={toggleLike}
        className="absolute top-4 left-4 z-10 text-gray-300"
      >
        {like ? (
          <Heart className="text-red-500 w-6 h-6 fill-current" />
        ) : (
          <Heart className="text-gray-300 w-6 h-6" />
        )}
      </div>
    </div>
  );
}

export default GameCard;
