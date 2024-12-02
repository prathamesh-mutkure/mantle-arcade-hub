import React, { useState } from "react";

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
    <div className="group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transform skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
      <div className="relative bg-black border-4 border-purple-500 p-4">
        <div className="relative">
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
        <h4 className="text-xl font-bold text-white mb-2">{item.name}</h4>
        <p className="text-green-400 text-sm font-vt323">{"1000"}</p>
        <button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-400 text-black font-bold transform group-hover:scale-105 transition-transform">
          INSERT COIN TO PLAY
        </button>
      </div>
    </div>
    // <div
    //   className="w-40 sm:w-52 md:w-60 lg:w-72 inline-block cursor-pointer relative p-2 hover:scale-105 transition-transform"
    //   onMouseEnter={() => setIsHovered(true)}
    //   onMouseLeave={() => setIsHovered(false)}
    //   onClick={() => handleClick(item)}
    // >
    //   <img
    //     // onClick={() => handleClick(item)}
    //     className="w-full transform transition duration-500 hover:scale-105"
    //     src={item.poster}
    //     alt={item.name}
    //   />

    //   {/* Game name overlay on hover */}
    //   <div
    //     className={`absolute inset-0 bg-black/70 transition-opacity duration-300 flex items-end p-4
    //     ${isHovered ? "opacity-100" : "opacity-0"}`}
    //   >
    //     <p className="text-white font-semibold text-lg">{item.name}</p>
    //   </div>

    //   <div
    //     onClick={toggleLike}
    //     className="absolute top-4 left-4 z-10 text-gray-300"
    //   >
    //     {like ? (
    //       <Heart className="text-red-500 w-6 h-6 fill-current" />
    //     ) : (
    //       <Heart className="text-gray-300 w-6 h-6" />
    //     )}
    //   </div>
    // </div>
  );
}

export default GameCard;
