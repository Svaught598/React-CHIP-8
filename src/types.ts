import { KeyBuffer } from "./hooks/useChipKeyBoard";

declare global {
  interface CanvasRenderingContext2D {
    renderPixels(pixelBuffer: number[], theme: Theme): void;
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
}

export type NamedTheme = {
  name: string;
  theme: Theme;
}

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
  keydownBuffer: KeyBuffer = { prev: new Array(16).fill(0), curr: new Array(16).fill(0) };
  paused = false;

  constructor(copy?: EmulatorState) {
    if (copy) {
      this.memory = [...copy.memory];
      this.stack = [...copy.stack];
      this.vRegisters = [...copy.vRegisters];
      this.soundTimer = copy.soundTimer;
      this.delayTimer = copy.delayTimer;
      this.programCounter = copy.programCounter;
      this.stackPointer = copy.stackPointer;
      this.pixelBuffer = [...copy.pixelBuffer];
      this.drawFlag = copy.drawFlag;
      this.indexRegister = copy.indexRegister;
      this.keydownBuffer = { prev: [...copy.keydownBuffer.prev], curr: [...copy.keydownBuffer.curr] };
      this.paused = copy.paused;
    }
  }
}