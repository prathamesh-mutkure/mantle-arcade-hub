import { useState } from "react";

export default function AdminPage() {
  const [pendingGames, setPendingGames] = useState([
    {
      id: "1",
      name: "Flabby Physics",
      poster: "/placeholder.jpg",
      submitter: "0x1234...5678",
      categories: ["Action", "Arcade"],
    },
    // Add more mock data as needed
  ]);

  const handleApprove = (gameId: string) => {
    // Placeholder for contract interaction
    console.log("Approving game:", gameId);
  };

  const handleReject = (gameId: string) => {
    // Placeholder for contract interaction
    console.log("Rejecting game:", gameId);
  };

  return (
    <div className="min-h-screen bg-[#1a1b2e] text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Pending Approvals</h2>

        <div className="grid grid-cols-1 gap-6">
          {pendingGames.map((game) => (
            <div
              key={game.id}
              className="bg-[#2a2b3e] rounded-lg p-6 flex items-start space-x-6"
            >
              <img
                src={game.poster}
                alt={game.name}
                className="w-48 h-32 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{game.name}</h3>
                <p className="text-gray-400 mb-2">
                  Submitted by: {game.submitter}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {game.categories.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 bg-[#3a3b4e] rounded-full text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => handleApprove(game.id)}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded font-medium transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(game.id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded font-medium transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
