import { ROM_LIST } from "./constants";

declare global {
  interface CanvasRenderingContext2D {
    renderPixels(pixelBuffer: number[], theme: Theme, height: number, width: number, pixelSize: number): void;
    renderPaused(): void;
    renderSplash(): void;
  }
  interface Number {
    toHex(): string;
  }
  interface Array<T> {
    getAllIndexes(value: T): number[];
  }
}

export type Theme = {
  light: string;
  dark: string;
  invertOnUI: boolean;
}

export type NamedTheme = {
  name: string;
  theme: Theme;
}

export type MetaState = {
  theme?: Theme;
  paused?: boolean;
  extendedMode?: boolean;
  romName?: string;
}

export type Game = {
  name: string;
  type: 'CHIP8' | 'SCHIP' | 'CHIP48';
}