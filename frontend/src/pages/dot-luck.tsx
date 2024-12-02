import React from "react";

export default function GamePage() {
  return (
    <main
      className={`min-h-screen flex items-center justify-center text-white py-12 px-4`}
    >
      <div className="w-full flex items-center justify-center">
        <div className="w-[800px] h-[600px]">
          <iframe
            src="https://dot-luck.vercel.app/"
            className="h-full w-full"
            allowFullScreen={true}
            frameBorder="0"
          />
        </div>
      </div>
    </main>
  );
}
