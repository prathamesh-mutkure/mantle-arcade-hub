import React from "react";
import { Wallet } from "lucide-react";
import Link from "next/link";
import { generateRandomImageUrl } from "@/lib/utils";
import { useRouter } from "next/router";
import {
  DynamicConnectButton,
  DynamicUserProfile,
  DynamicWidget,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";

const PacmanSVG = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    className="text-yellow-400 fill-current"
  >
    <path d="M20,0 A20,20 0 1 1 20,40 A20,20 0 1 1 20,0 L20,20 Z">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 20 20"
        to="360 20 20"
        dur="0.5s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

export default function Navbar() {
  const router = useRouter();
  const { user, primaryWallet, setShowAuthFlow } = useDynamicContext();

  return (
    <div className="relative z-20 bg-black border-b-8 border-t-8 border-yellow-400 max-w-[100vw]">
      <div className="absolute inset-0 overflow-hidden">
        {/* Retro moving lines effect */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              #ff00ff20 0px,
              #00ffff20 50px
            )`,
            backgroundSize: "100px 100px",
            animation: "slide 3s linear infinite",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto p-4 relative">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-4">
              <PacmanSVG />
              <h1
                className="text-6xl font-black text-white"
                style={{
                  textShadow: `
                    4px 0 0 #FF0000,
                    -4px 0 0 #00FF00,
                    0 4px 0 #0000FF,
                    0 -4px 0 #FF00FF
                  `,
                }}
              >
                PlayMantle
              </h1>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            {!user && (
              <DynamicConnectButton>
                <div className="hidden md:flex relative px-6 py-3 flex-row items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold transform hover:scale-105 transition-all overflow-hidden group">
                  <Wallet size={16} className="relative z-10" />
                  <span className="relative z-10">Connect Wallet</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 transform translate-y-full group-hover:translate-y-0 transition-transform" />
                </div>
              </DynamicConnectButton>
            )}

            {!!user && <DynamicWidget />}

            <DynamicUserProfile />

            <button
              onClick={() => {
                if (user) {
                  router.push("/profile");
                  return;
                }

                setShowAuthFlow(true);
              }}
            >
              <div className="w-14 h-14 rounded-full bg-gray-700 overflow-hidden">
                <img
                  src={generateRandomImageUrl(primaryWallet?.address)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
