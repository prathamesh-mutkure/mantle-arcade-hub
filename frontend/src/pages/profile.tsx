import React from "react";
import {
  Trophy,
  Star,
  Gamepad2,
  Clock,
  ExternalLink,
  Shield,
} from "lucide-react";
import { useWalletStore } from "@/providers/walletStoreProvider";

const profile = {
  name: "CryptoGamer",
  walletAddress: "194663...sUpH",
  gamerScore: 15780,
  level: 42,
  badges: [
    { id: 1, name: "Early Adopter", icon: "🏆" },
    { id: 2, name: "Pro Gamer", icon: "⭐" },
    { id: 3, name: "Champion", icon: "🏅" },
  ],
  games: [
    {
      id: 1,
      name: "4 Table Poker",
      score: 1250,
      level: 8,
      lastPlayed: "2024-03-01",
    },
    {
      id: 2,
      name: "Blobby Physics",
      score: 890,
      level: 5,
      lastPlayed: "2024-02-28",
    },
    {
      id: 3,
      name: "Character Quest",
      score: 2100,
      level: 12,
      lastPlayed: "2024-02-25",
    },
  ],
};

const ProfilePage = () => {
  const { isWalletConnected, accounts } = useWalletStore((state) => state);

  // Mock data - replace with actual data from your backend

  if (!isWalletConnected) {
    return (
      <>
        <p>Connect wallet</p>
      </>
    );
  }

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
                  src="/profile.jpg"
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
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <div className="flex items-center gap-2 text-gray-400">
                <span>{accounts[0]?.address}</span>
                <ExternalLink className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="flex items-center gap-2 text-yellow-500">
                  <Trophy className="w-5 h-5" />
                  <span className="text-xl font-bold">
                    {profile.gamerScore}
                  </span>
                </div>
                <span className="text-sm text-gray-400">Gamer Score</span>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 text-blue-500">
                  <Star className="w-5 h-5" />
                  <span className="text-xl font-bold">{profile.level}</span>
                </div>
                <span className="text-sm text-gray-400">Level</span>
              </div>
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
          {profile.games.map((game) => (
            <div
              key={game.id}
              className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold">{game.name}</h3>
                <div className="flex items-center gap-2 text-green-500">
                  <Star className="w-4 h-4" />
                  <span className="font-bold">{game.level}</span>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4" />
                  <span>{game.score} pts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(game.lastPlayed).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
