import React, { useEffect, useRef } from "react";

interface RufflePlayerProps {
  swfUrl: string;
  width?: number;
  height?: number;
}

const RufflePlayer: React.FC<RufflePlayerProps> = ({
  swfUrl,
  width = 800,
  height = 600,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Ruffle script dynamically
    const loadRuffle = async () => {
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

      // Initialize Ruffle player
      if (containerRef.current) {
        const ruffle = window.RufflePlayer.newest();
        const player = ruffle.createPlayer();
        player.style.width = `${width}px`;
        player.style.height = `${height}px`;
        containerRef.current.appendChild(player);

        // Load the SWF file
        try {
          await player.load(swfUrl);
        } catch (error) {
          console.error("Error loading SWF:", error);
        }

        // Cleanup
        return () => {
          player.remove();
        };
      }
    };

    loadRuffle();
  }, [swfUrl, width, height]);

  return <div ref={containerRef} />;
};

export default RufflePlayer;
