// components/RufflePlayer.tsx
import { RufflePlayer } from "@/types/ruffle";
import React, { useEffect, useRef } from "react";

interface RufflePlayerProps {
  swfUrl: string;
  width?: number;
  height?: number;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

const RufflePlayerComponent: React.FC<RufflePlayerProps> = ({
  swfUrl,
  width = 800,
  height = 600,
  onLoad,
  onError,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<RufflePlayer | null>(null);

  useEffect(() => {
    const loadRuffle = async () => {
      try {
        if (!window.RufflePlayer) {
          const script = document.createElement("script");
          script.src = "https://unpkg.com/@ruffle-rs/ruffle";
          script.async = true;

          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        if (!containerRef.current) {
          return;
        }

        // Initialize Ruffle player
        const ruffle = window.RufflePlayer.newest();
        const player = ruffle.createPlayer();

        player.style.width = `${width}px`;
        player.style.height = `${height}px`;

        if (containerRef.current.firstChild) {
          console.log("Container already has a child, removing...");
          containerRef.current.firstChild.remove();
        }

        containerRef.current.appendChild(player);
        playerRef.current = player;

        // Load the SWF file
        await player.load(swfUrl);
        onLoad?.();
      } catch (error) {
        console.error("Error loading Ruffle or SWF:", error);
        onError?.(
          error instanceof Error
            ? error
            : new Error("Failed to load Ruffle player")
        );
      }
    };

    loadRuffle();

    // Cleanup
    return () => {
      if (playerRef.current) {
        playerRef.current.remove();
        playerRef.current = null;
      }
    };
  }, [swfUrl, width, height, onLoad, onError]);

  return <div id="ruffle-container" ref={containerRef} />;
};

export default RufflePlayerComponent;
