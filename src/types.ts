import { KeyMapping } from "./constants";

declare global {
  interface CanvasRenderingContext2D {
    renderPixels(pixelBuffer: number[], theme: Theme): void;
  }
  interface Number {
    toHex(): string;
  }
}

export type Theme = {
  light: string;
  dark: string;
}

export type NamedTheme = {
  name: string;
  theme: Theme;
}

type KeyValue =  typeof KeyMapping[keyof typeof KeyMapping];

export class EmulatorState {
  memory = new Array(4096).fill(0);
  stack =  new Array(16).fill(0);
  vRegisters = new Array(16).fill(0);
  soundTimer = 0;
  delayTimer = 0;
  programCounter = 512;
  stackPointer = 0;
  pixelBuffer = new Array(64 * 32).fill(0);
  drawFlag = false;
  indexRegister = 0;
  keyPressed?: KeyValue;
}