import React, { useEffect, useState } from "react";
import {
  Trophy,
  Star,
  Gamepad2,
  Clock,
  ExternalLink,
  Shield,
} from "lucide-react";
import { useWalletStore } from "@/providers/walletStoreProvider";
import { getUserStats, UserStatsResponse } from "@/lib/backend-helper";
import { sampleGames } from "@/lib/data";
import { useMetaMask } from "@/providers/metamask-provider";
import { generateRandomImageUrl, truncatedAddress } from "@/lib/utils";

const profile = {
  name: "CryptoGamer",
  walletAddress: "194663...sUpH",
  gamerScore: 15780,
  level: 42,
  badges: [
    { id: 1, name: "Early Adopter", icon: "🏆" },
    { id: 2, name: "Beta Tester", icon: "⭐" },
  ],
};

const ProfilePage = () => {
  const { connectedAccount } = useWalletStore((state) => state);
  const { accountAddress: metamaskAddress } = useMetaMask((state) => state);
  const [accountName, setAccountName] = useState("");

  const [stats, setStats] = useState<UserStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      const userAddr = metamaskAddress || connectedAccount?.address;

      if (!userAddr) {
        setStats(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await getUserStats(userAddr);
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [metamaskAddress, connectedAccount]);

  useEffect(() => {
    function getAccountName() {
      if (metamaskAddress) return truncatedAddress(metamaskAddress);

      if (connectedAccount) {
        return (
          connectedAccount?.name ?? truncatedAddress(connectedAccount.address)
        );
      }

      return "Please connect wallet";
    }

    setAccountName(getAccountName());
  }, [metamaskAddress, connectedAccount]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Section */}
      <div className="bg-gray-800 p-6 rounded-b-xl shadow-lg pt-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-700 overflow-hidden">
                <img
                  src={generateRandomImageUrl(
                    metamaskAddress ?? connectedAccount?.address
                  )}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 right-0 bg-green-500 rounded-full p-2">
                <Shield className="w-4 h-4" />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-grow">
              <h1 className="text-2xl font-bold">{accountName}</h1>
              <div className="flex items-center gap-2 text-gray-400">
                <span>
                  {metamaskAddress && truncatedAddress(metamaskAddress)}
                  {connectedAccount?.address &&
                    truncatedAddress(connectedAccount?.address)}
                  {!metamaskAddress &&
                    !connectedAccount?.address &&
                    "Please connect wallet"}
                </span>
                <ExternalLink className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="flex items-center gap-2 text-yellow-500">
                  <Trophy className="w-5 h-5" />
                  <span className="text-xl font-bold">
                    {stats?.totalScore ?? "-"}
                  </span>
                </div>
                <span className="text-sm text-gray-400">Gamer Score</span>
              </div>
              {/* <div className="text-center">
                <div className="flex items-center gap-2 text-blue-500">
                  <Star className="w-5 h-5" />
                  <span className="text-xl font-bold">
                    {stats?.totalScore ? "1" : "-"}
                  </span>
                </div>
                <span className="text-sm text-gray-400">Level</span>
              </div> */}
            </div>
          </div>

          {/* Badges */}
          <div className="mt-6 flex gap-4">
            {profile.badges.map((badge) => (
              <div
                key={badge.id}
                className="flex items-center gap-2 bg-gray-700 rounded-full px-4 py-2"
              >
                <span className="text-xl">{badge.icon}</span>
                <span className="text-sm">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Games Section */}
      <div className="max-w-6xl mx-auto mt-8 p-6">
        <h2 className="text-xl font-bold mb-6">Gaming History</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats &&
            stats.games.map((game) => {
              const gameInfo = sampleGames.find((g) => g.id === game.gameId);

              return (
                <div
                  key={game.gameId}
                  className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold">{gameInfo?.name}</h3>

                    <div className="flex items-center gap-2 text-green-500">
                      <Clock className="w-4 h-4" />
                      <span>{game.stats.plays}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Gamepad2 className="w-4 h-4" />
                      <span>{game.gamingActivity} pts</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
