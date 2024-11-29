import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import RufflePlayerComponent from "@/components/ruffle-player";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`${inter.className} min-h-screen bg-gradient-to-b text-white py-12 px-4`}
    >
      <div className="w-full flex items-center justify-center">
        <RufflePlayerComponent
          swfUrl="/games/POKER-FACE-UP.swf"
          width={800}
          height={600}
          onLoad={() => console.log("SWF loaded")}
          onError={() => console.log("Error loading SWF")}
        />
      </div>
    </main>
  );
}
