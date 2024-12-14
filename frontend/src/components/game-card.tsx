import React, { useState } from "react";
import { Smartphone } from "lucide-react";

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
    <div className="group relative overflow-hidden min-w-[320px] mx-2">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transform skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
      <div className="relative bg-black border-4 border-purple-500 p-4">
        <div className="relative">
          {item.isMobileFriendly && (
            <div className="absolute top-2 right-2 z-10 inline-flex items-center gap-1 bg-yellow-400 backdrop-blur-sm px-3 py-1 rounded-full border border-white">
              <Smartphone className="w-4 h-4 text-black" />
              {/* <span className="text-black text-sm font-vt323">
                Mobile Friendly
              </span> */}
            </div>
          )}
          <img
            src={item.poster}
            alt={item.name}
            className="w-full h-48 object-cover mb-4 border-2 border-white"
          />
          {/* Scanline effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(0deg, rgba(0,0,0,0.2) 0px, rgba(0,0,0,0.2) 1px, transparent 2px, transparent 4px)",
              backgroundSize: "4px 4px",
            }}
          />
        </div>
        <h4
          className="text-xl font-bold text-white mb-2 truncate whitespace-nowrap overflow-hidden"
          title={item.name}
        >
          {item.name}
        </h4>
        <button
          onClick={() => handleClick(item)}
          className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-400 text-black font-bold transform group-hover:scale-105 transition-transform"
        >
          PLAY
        </button>
      </div>
    </div>
  );
}

export default GameCard;
