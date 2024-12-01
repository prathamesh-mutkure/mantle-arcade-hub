import { RufflePlayer } from "@/types/ruffle";
import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { attestUserGameScore } from "@/lib/true-network-helper";
import { useWalletStore } from "@/providers/walletStoreProvider";

interface RufflePlayerProps {
  swfUrl: string;
  gameId: string;
  width?: number;
  height?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
}

type TGameMetrics = {
  startTime: Date | null;
  endTime: Date | null;
  keystrokes: number;
  mouseClicks: number;
  totalPlayTime: number;
};

const RufflePlayerComponent: React.FC<RufflePlayerProps> = ({
  swfUrl,
  gameId,
  width = 1000,
  height = 750,
  onStart,
  onEnd,
  onError,
}) => {
  const { connectedWallet, connectedAccount, api } = useWalletStore(
    (state) => state
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<RufflePlayer | null>(null);

  const isGameActiveRef = useRef(false);
  const metricsRef = useRef<TGameMetrics>({
    startTime: null,
    endTime: null,
    keystrokes: 0,
    mouseClicks: 0,
    totalPlayTime: 0,
  });

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
        console.log("SWF loaded");
        handleGameStart();

        window.addEventListener("keyup", handleKeyPress);
        window.addEventListener("mouseup", handleMouseClick);
      } catch (error) {
        console.error("Error loading Ruffle or SWF:", error);
        handleError(
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

      handleGameEnd();

      window.removeEventListener("keyup", handleKeyPress);
      window.removeEventListener("mouseup", handleMouseClick);
    };
  }, []);

  function handleGameStart() {
    console.log("handleGameStart, isGameActive is", isGameActiveRef.current);

    if (isGameActiveRef.current) return;

    isGameActiveRef.current = true;

    metricsRef.current = {
      ...metricsRef.current,
      startTime: new Date(),
      endTime: null,
      keystrokes: 0,
      mouseClicks: 0,
      totalPlayTime: 0,
    };

    console.log("isGameActive is now", isGameActiveRef.current);
  }

  function handleGameEnd() {
    console.log("handleGameEnd, isGameActive is", isGameActiveRef.current);

    if (!isGameActiveRef.current) return;

    isGameActiveRef.current = false;

    const finalMetrics = calculateFinalMetrics(metricsRef.current);
    metricsRef.current = finalMetrics;
    sendMetricsToBackend(finalMetrics);
  }

  function handleError(error: Error) {
    console.error("Error loading SWF: ", error);
    handleGameEnd();
  }

  function handleKeyPress() {
    if (!isGameActiveRef.current) return;

    metricsRef.current = {
      ...metricsRef.current,
      keystrokes: metricsRef.current.keystrokes + 1,
    };
  }

  function handleMouseClick() {
    if (!isGameActiveRef.current) return;

    metricsRef.current = {
      ...metricsRef.current,
      mouseClicks: metricsRef.current.mouseClicks + 1,
    };
  }

  async function sendMetricsToBackend(gameMetrics: TGameMetrics) {
    console.log("Sending metrics to backend: ", gameMetrics);

    if (!connectedAccount?.address) {
      console.log("No connected account, skipping metrics submission");
      return;
    }

    try {
      const txHash = await attestUserGameScore({
        gameId: gameId,
        userId: connectedAccount.address,

        keyStokes: gameMetrics.keystrokes,
        mouseClicks: gameMetrics.mouseClicks,

        // TODO: Fix these once indexer is ready
        totalGamePlayDuration: gameMetrics.totalPlayTime,
        numberOfGameplays: 0,
        gamingActivity: 0,
      });

      console.log("Metrics submitted successfully, txHash: ", txHash);
    } catch (error) {
      console.log("Error attesting:");
      console.log(error);
    }
  }

  function calculateFinalMetrics(prevMetrics: TGameMetrics): TGameMetrics {
    console.log("prevMetrics: ", prevMetrics);

    const endTime = dayjs(new Date());
    const startTime = dayjs(prevMetrics.startTime ?? endTime);
    const diff = endTime.diff(startTime, "seconds");

    return {
      ...prevMetrics,
      endTime: endTime.toDate(),
      totalPlayTime: diff,
    };
  }

  return <div id="ruffle-container" ref={containerRef} />;
};

export default RufflePlayerComponent;
