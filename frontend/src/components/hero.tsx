import React from "react";

const Main = () => {
  const truncateString = (str: string, num: number) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>

        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original//5O0mkQGfOQM4OktFOCep9YmXK79.jpg`}
          alt="Title"
        />

        <div className="absolute w-full top-[20%] p-4 md:p-8">
          {/* title object */}
          <h1 className="text-3xl md:text-5xl font-bold">4 Table Poker</h1>
          <div className="my-4">
            <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
              Play
            </button>
            <button className="border text-white border-gray-300 py-2 px-5 ml-4">
              Watch Later
            </button>
          </div>
          {/* release date object */}
          <p className="text-gray-400 text-sm">Released: 29/11/2024</p>
          {/* overview object with truncate function to limit characters to 150 */}
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            Test your poker skills, luck and strategy in this poker game.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
