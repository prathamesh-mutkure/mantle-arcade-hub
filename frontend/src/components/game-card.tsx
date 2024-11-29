import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function GameCard({
  item,
  handleClick,
}: {
  item: Game;
  handleClick: (item: Game) => void;
}) {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleLike = async () => {
    setLike((val) => !val);
  };

  return (
    <div className="w-[160px] sm:w-[200px] md:w[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        onClick={() => handleClick(item)}
        className="transform transition inline-block duration-500 hover:scale-105"
        src={item.poster}
        alt={item.name}
      />

      <div>
        <p onClick={toggleLike}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p>
      </div>
    </div>
  );
}

export default GameCard;
