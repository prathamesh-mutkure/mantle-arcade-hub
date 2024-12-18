import React, { FormEventHandler, useState } from "react";

const categories = [
  "Featured",
  "Action",
  "Adventure",
  "Arcade",
  "Puzzle",
  "Strategy",
  "Sports",
  "Racing",
  "Simulation",
  "Casino",
  "Partner",
  "Other",
];

type TGameType = "Flash" | "IFrame";

export default function GameUploadPage() {
  const [formData, setFormData] = useState<{
    id: string;
    name: string;
    poster: string;
    flashFile: string;
    categories: string[];
    description: string;
    isMobileFriendly: boolean;
    gameType: TGameType;
  }>({
    id: "",
    name: "",
    poster: "",
    flashFile: "",
    categories: [],
    description: "",
    isMobileFriendly: false,
    gameType: "Flash",
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    // Placeholder for contract interaction
    console.log("Submitting game:", formData);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#1a1b2e] text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Upload New Game</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Game ID</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-[#2a2b3e] border border-[#3a3b4e] focus:outline-none focus:border-pink-500"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Game Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-[#2a2b3e] border border-[#3a3b4e] focus:outline-none focus:border-pink-500"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Game File (SWF/HTML)
            </label>
            <input
              type="file"
              className="w-full px-4 py-2 rounded bg-[#2a2b3e] border border-[#3a3b4e] focus:outline-none focus:border-pink-500"
              onChange={(e) =>
                setFormData({ ...formData, flashFile: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Poster Image
            </label>
            <input
              type="file"
              className="w-full px-4 py-2 rounded bg-[#2a2b3e] border border-[#3a3b4e] focus:outline-none focus:border-pink-500"
              onChange={(e) =>
                setFormData({ ...formData, poster: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Categories</label>
            <div className="grid grid-cols-3 gap-4">
              {categories.map((category) => (
                <label key={category} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox text-pink-500"
                    onChange={(e) => {
                      const newCategories = e.target.checked
                        ? [...formData.categories, category]
                        : formData.categories.filter((c) => c !== category);
                      setFormData({ ...formData, categories: newCategories });
                    }}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 rounded bg-[#2a2b3e] border border-[#3a3b4e] focus:outline-none focus:border-pink-500 h-32"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox text-pink-500"
                checked={formData.isMobileFriendly}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isMobileFriendly: e.target.checked,
                  })
                }
              />
              <span>Mobile Friendly</span>
            </label>

            <div className="flex items-center space-x-2">
              <label>Game Type:</label>
              <select
                className="px-4 py-2 rounded bg-[#2a2b3e] border border-[#3a3b4e] focus:outline-none focus:border-pink-500"
                value={formData.gameType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gameType: e.target.value as TGameType,
                  })
                }
              >
                <option value="Flash">Flash</option>
                <option value="IFrame">IFrame</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-pink-500 hover:bg-pink-600 rounded font-medium transition-colors"
        >
          Upload Game
        </button>
      </form>
    </div>
  );
}
