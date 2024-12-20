import React from "react";
import GameRow from "@/components/game-row";
import useGameStore from "@/zustand/games-store";
import { Star } from "lucide-react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const games = useGameStore((state) => state.games);

  const categorizedGames = {
    featured: games.filter((game) => game.featured),
    arcade: games.filter((game) => game.categories.includes("arcade")),
    mobile: games.filter((game) => game.isMobileFriendly),
    partner: games.filter((game) => game.categories.includes("partner")),
    racing: games.filter((game) => game.categories.includes("racing")),
    action: games.filter((game) => game.categories.includes("action")),
    adventure: games.filter((game) => game.categories.includes("adventure")),
    puzzle: games.filter((game) => game.categories.includes("puzzle")),
    strategy: games.filter((game) => game.categories.includes("strategy")),
    sports: games.filter((game) => game.categories.includes("sports")),
    simulation: games.filter((game) => game.categories.includes("simulation")),
    casino: games.filter((game) => game.categories.includes("casino")),
    other: games.filter((game) => game.categories.includes("other")),
  };

  return (
    <main className="min-h-screen bg-indigo-950 relative overflow-hidden font-mono">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          linear-gradient(to right, #ffffff10 1px, transparent 1px),
          linear-gradient(to bottom, #ffffff10 1px, transparent 1px)
        `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Hero */}
      <div className="relative p-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-black rounded-lg p-1 border-4 border-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.5)]">
            {/* Screen Scanlines Effect */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "repeating-linear-gradient(0deg, rgba(0,0,0,0.2) 0px, rgba(0,0,0,0.2) 1px, transparent 2px, transparent 4px)",
                backgroundSize: "4px 4px",
              }}
            />

            <div className="relative bg-gradient-to-b from-indigo-950 to-purple-950 p-8 rounded">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 font-bold mb-6">
                    <div className="animate-ping">
                      <Star className="w-5 h-5" />
                    </div>
                    TRENDING
                  </div>
                  <h2 className="text-6xl font-black text-white mb-6 arcade-text">
                    Flabby Physics
                  </h2>
                  <p className="text-green-400 text-xl mb-8 font-vt323">
                    CAN YOU BEAT THE FLABBY PHYSICS__
                    <span className="animate-blink">_</span>
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        router.push("/admin");
                      }}
                      className="relative px-8 py-4 bg-gradient-to-r from-green-400 to-cyan-400 text-black font-bold overflow-hidden group"
                    >
                      <span className="relative z-10">ADMIN</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-cyan-300 transform translate-y-full group-hover:translate-y-0 transition-transform" />
                    </button>
                    <button
                      onClick={() => {
                        router.push("/new");
                      }}
                      className="relative px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold overflow-hidden group"
                    >
                      <span className="relative z-10">UPLOAD GAME</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-pink-300 transform translate-y-full group-hover:translate-y-0 transition-transform" />
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src="/400x600.png"
                    alt="Featured Game"
                    className="rounded border-4 border-white shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                  />
                  {/* CRT Corner Effect */}
                  <div
                    className="absolute inset-0 rounded pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 0 0, rgba(0,0,0,0.5) 0%, transparent 50%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {categorizedGames.featured.length > 0 && (
        <GameRow
          rowId="featured"
          title="Featured Games"
          games={categorizedGames.featured}
        />
      )}

      {categorizedGames.partner.length > 0 && (
        <GameRow
          rowId="partner"
          title="Partner Games"
          games={categorizedGames.partner}
        />
      )}

      {categorizedGames.mobile.length > 0 && (
        <GameRow
          rowId="mobile"
          title="Mobile Friendly"
          games={categorizedGames.mobile}
        />
      )}

      {Object.entries(categorizedGames).map(
        ([category, categoryGames], index) => {
          // Skip featured category as it's already shown and empty categories
          if (
            category === "featured" ||
            category === "partner games" ||
            category == "mobile" ||
            categoryGames.length === 0
          )
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

      <div className="w-full text-center items-center justify-center py-4 mt-12 px-2 relative z-10 cursor-pointer text-sm">
        Built by{" "}
        <a
          href="https://x.com/prathamesh_io"
          target="_blank"
          className="hover:underline"
        >
          @prathamesh_io
        </a>{" "}
        on Mantle with {" <3"}
      </div>
    </main>
  );
}
