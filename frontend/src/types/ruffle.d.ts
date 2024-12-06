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

  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, handler: (...args: any[]) => void) => void;
      removeListener: (
        event: string,
        handler: (...args: any[]) => void
      ) => void;
    };
  }
}
