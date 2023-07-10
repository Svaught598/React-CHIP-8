import { CLASSIC_THEME, CHARS } from "../constants";
import { MetaState } from "../types";
import { KeyBuffer } from "./keyboard";

export class EmulatorState {
  timerTicks = 0;
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
  meta: MetaState = {
    paused: false,
    theme: CLASSIC_THEME,
  };

  loadRom(rom: number[]) {
    this.reset();
    rom.forEach((byte, index) => {
      this.memory[index + 512] = byte;
    });
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
}