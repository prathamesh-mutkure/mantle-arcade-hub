export {};

export interface RufflePlayer extends HTMLElement {
  load(url: string): Promise<void>;
  play(): void;
  pause(): void;
  remove(): void;
}

interface RufflePlayerFactory {
  newest(): {
    createPlayer(): RufflePlayer;
  };
}

declare global {
  interface Window {
    RufflePlayer: RufflePlayerFactory;
  }
}
