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
  keyPressed: number[] = new Array(16).fill(undefined);
  paused = true;

  reset() {
    this.memory = new Array(4096).fill(0);
    this.stack =  new Array(16).fill(0);
    this.vRegisters = new Array(16).fill(0);
    this.soundTimer = 0;
    this.delayTimer = 0;
    this.programCounter = 512;
    this.stackPointer = 0;
    this.pixelBuffer = new Array(64 * 32).fill(0);
    this.drawFlag = false;
    this.indexRegister = 0;
    this.keyPressed = new Array(16).fill(undefined);
    this.paused = true;
  }

  loadRom(rom: number[]) {
    rom.forEach((byte, index) => {
      this.memory[index + 512] = byte;
    })
  }
}