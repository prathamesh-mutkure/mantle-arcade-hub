import React from "react";

export default function GamePage() {
  return (
    <main
      className={`h-[calc(100vh-108px)] flex items-center justify-center text-white py-12 px-4`}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[800px] h-[600px]">
          <iframe
            src="https://slowroads.io"
            className="h-full w-full"
            allowFullScreen={true}
            frameBorder="0"
          />
        </div>
      </div>
    </main>
  );
}
