import { CLASSIC_THEME, CHARS } from "../constants";
import { MetaState } from "../types";
import { pixelBufToRGBABuf } from "../utils";
import { audio, keyboard } from "./core";
import { KeyBuffer } from "./keyboard";
import { processOpcode } from "./process";

export class EmulatorState {
  timerTicks = 0;
  memory = new Array<number>(4096).fill(0);
  stack =  new Array<number>(16).fill(0);
  vRegisters = new Array<number>(16).fill(0);
  flags = new Array<number>(16).fill(0);
  soundTimer = 0;
  delayTimer = 0;
  programCounter = 512;
  stackPointer = 0;
  pixelBuffer = new Array<number>(64 * 32).fill(0);
  drawFlag = false;
  indexRegister = 0;
  keydownBuffer: KeyBuffer = { prev: new Array(16).fill(0), curr: new Array(16).fill(0) };
  screen = new ImageData(64, 32);
  meta: MetaState = {
    paused: false,
    theme: CLASSIC_THEME,
    extendedMode: false,
    romName: undefined,
  };

  loadRom(rom: number[]) {
    this.reset();
    rom.forEach((byte, index) => {
      this.memory[index + 512] = byte;
    });
    this.meta.extendedMode = false;
  }

  getDimensions(): [number, number] {
    return (this.meta.extendedMode) ? [128, 64] : [64, 32];
  }

  getScreenBuffer(width: number, height: number): ImageData {
    const theme = this.meta.theme || CLASSIC_THEME;
    this.screen.data.set(
      pixelBufToRGBABuf(
        this.pixelBuffer, 
        theme, 
        ...this.getDimensions(), 
        width, 
        height
      )
    );
    return this.screen;
  }

  reset() {
    CHARS.forEach((byte, index) => {
      this.memory[index] = byte;
    });
    this.programCounter = 512;
    this.stackPointer = 0;
    this.indexRegister = 0;
    this.vRegisters = new Array(16).fill(0);
    this.stack = new Array(16).fill(0);
    this.pixelBuffer = new Array(64 * 32).fill(0);
    this.keydownBuffer = { prev: new Array(16).fill(0), curr: new Array(16).fill(0) };
  }

  decrementTimers() {
    if (this.delayTimer > 0) this.delayTimer -= 1;
    if (this.soundTimer > 0) this.soundTimer -= 1;
    if (this.soundTimer > 0) audio.play();
    else audio.stop();
  }

  tick(width: number, height: number, ctx?: CanvasRenderingContext2D | null) {
    const isPaused = this.meta.paused;
    this.keydownBuffer = keyboard.keydownBuffer;
    if (!isPaused) {
      processOpcode(this);
    }
    if (this.drawFlag && !isPaused) {
      ctx?.putImageData(this.getScreenBuffer(width, height), 0, 0);
    }
  }
}