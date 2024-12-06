import React, { use, useRef, useState } from "react";
import GameCard from "./game-card";
import { useRouter } from "next/router";
import { ChevronLeft, ChevronRight, Joystick } from "lucide-react";
import { useWalletStore } from "@/providers/walletStoreProvider";
import { useMetaMask } from "@/providers/metamask-provider";

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
  const { connectedAccount } = useWalletStore((state) => state);
  const { accountAddress: metamaskAddress } = useMetaMask((state) => state);

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) {
      return;
    }

    const scrollAmount = direction === "left" ? -400 : 400;
    carouselRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });

    // Update button visibility after scroll
    setTimeout(() => {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current!;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft + clientWidth < scrollWidth - 10);
    }, 300);
  };

  const handleClick = (item: Game) => {
    const userAddr = metamaskAddress || connectedAccount?.address;

    // if (!userAddr) {
    //   alert("Please connect your wallet to play games.");
    //   return;
    // }

    router.push(`/game?id=${item.id}`);
  };

  return (
    <div className="relative z-10 p-8">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-black text-white mb-8 flex items-center gap-3 arcade-text">
          <Joystick className="w-8 h-8 text-yellow-400" />
          {title}
        </h3>

        <div className="relative">
          {showLeftButton && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition-all"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {showRightButton && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition-all"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          <div
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {games.map((game, index) => (
              <GameCard key={index} item={game} handleClick={handleClick} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameRow;
