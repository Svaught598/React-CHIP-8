import { EmulatorState } from "./emulator";

Array.prototype.getAllIndexes = function<T>(value: T) {
  return this.reduce((acc: number[], curr: T, index: number) => {
    if (curr === value) acc.push(index);
    return acc;
  } , []);
}

// 00CN - Scroll display N lines down
export const scrollDown = (opcode: number, state: EmulatorState): void => {
  const [width, height] = state.getDimensions();
  const linesToScroll = opcode & 0x000F;
  const rowsToKeep = height - linesToScroll;

  const newBuffer = [
    ...new Array(width * linesToScroll).fill(0),
    ...state.pixelBuffer.slice(0, width * rowsToKeep),
  ];

  state.pixelBuffer = newBuffer;
  state.drawFlag = true;
  state.programCounter += 2;
}

// 00E0 - CLS
export const cls = (state: EmulatorState): void => {
  for (let i=0; i<state.pixelBuffer.length; i++) {
    state.pixelBuffer[i] = 0;
  }
  state.drawFlag = true;
  state.programCounter += 2;
}

// 00EE - RET
export const ret = (state: EmulatorState): void => {
  state.stackPointer -= 1;
  state.programCounter = state.stack[state.stackPointer & 0xF];
}

// 00FB - Scroll display 4 pixels right
export const scrollRight = (state: EmulatorState): void => {
  const [width, height] = state.getDimensions();
  const newBuffer = [];
  for (let row = 0; row < height; row++) {
    const rowIndex = row * width;
    const newRow = state.pixelBuffer.slice(rowIndex, rowIndex + width - 4);
    newBuffer.push(...[0,0,0,0]);
    newBuffer.push(...newRow);
  }
  state.pixelBuffer = newBuffer;
  state.drawFlag = true;
  state.programCounter += 2;
}

// 00FC - Scroll display 4 pixels left
export const scrollLeft = (state: EmulatorState): void => {
  const [width, height] = state.getDimensions();
  const newBuffer = [];
  for (let row = 0; row < height; row++) {
    const rowIndex = row * width;
    const newRow = state.pixelBuffer.slice(rowIndex + 4, rowIndex + width);
    newBuffer.push(...newRow);
    newBuffer.push(...[0,0,0,0]);
  }
  state.pixelBuffer = newBuffer;
  state.drawFlag = true;
  state.programCounter += 2;
}

// 00FD - Exit CHIP interpreter
export const exit = (state: EmulatorState): void => {
  state.meta.paused = true;
}

// 00FE - Disable extended screen mode
export const lores = (state: EmulatorState): void => {
  state.meta.extendedMode = false;
  const [width, height] = state.getDimensions();
  state.pixelBuffer = new Array(height * width).fill(0);
  state.programCounter += 2;
}

// 00FF - Enable extended screen mode for full-screen graphics
export const hires = (state: EmulatorState): void => {
  state.meta.extendedMode = true;
  const [width, height] = state.getDimensions();
  state.pixelBuffer = new Array(height * width).fill(0);
  state.programCounter += 2;
}

// 1nnn - JP addr
export const jp = (opcode: number, state: EmulatorState): void => {
  state.programCounter = opcode & 0x0FFF;
}

// 2nnn - CALL addr
export const call = (opcode: number, state: EmulatorState): void => {
  state.stack[state.stackPointer & 0xF] = state.programCounter + 2;
  state.stackPointer += 1;
  state.programCounter = opcode & 0x0FFF;
}

// 3xkk - SE Vx, byte
export const se = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8;
  const kk = opcode & 0x00FF;
  if (state.vRegisters[x] === kk) {
    state.programCounter += 2;
  }
  state.programCounter += 2;
}

// 4xkk - SNE Vx, byte
export const sne = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8;
  const kk = opcode & 0x00FF;
  if (state.vRegisters[x] !== kk) {
    state.programCounter += 2;
  }
  state.programCounter += 2;
}

// 5xy0 - SE Vx, Vy
export const seVxVy = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8;
  const y = (opcode & 0x00F0) >> 4;
  if (state.vRegisters[x] === state.vRegisters[y]) {
    state.programCounter += 2;
  }
  state.programCounter += 2;
}

// 6xkk - LD Vx, byte
export const ldVx = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8;
  const kk = opcode & 0x00FF;
  state.vRegisters[x] = kk;
  state.programCounter += 2;
}

// 7xkk - ADD Vx, byte
export const addVx = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8;
  const kk = opcode & 0x00FF;
  const newVx = (state.vRegisters[x] + kk) & 0xFF;
  state.vRegisters[x] = newVx;
  state.programCounter += 2;
}

// 8xy0 - LD Vx, Vy
export const ldVxVy = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8;
  const y = (opcode & 0x00F0) >> 4;
  state.vRegisters[x] = state.vRegisters[y];
  state.programCounter += 2;
}

// 8xy1 - OR Vx, Vy
export const orVxVy = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8;
  const y = (opcode & 0x00F0) >> 4;
  state.vRegisters[x] |= state.vRegisters[y];
  state.vRegisters[0xF] = 0;
  state.programCounter += 2;
}

// 8xy2 - AND Vx, Vy
export const andVxVy = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8;
  const y = (opcode & 0x00F0) >> 4;
  state.vRegisters[x] &= state.vRegisters[y];
  state.vRegisters[0xF] = 0;
  state.programCounter += 2;
}

// 8xy3 - XOR Vx, Vy
export const xorVxVy = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8;
  const y = (opcode & 0x00F0) >> 4;
  state.vRegisters[x] ^= state.vRegisters[y];
  state.vRegisters[0xF] = 0;
  state.programCounter += 2;
}

// 8xy4 - ADD Vx, Vy
export const addVxVy = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8; 
  const y = (opcode & 0x00F0) >> 4;
  const vx = state.vRegisters[x];
  const vy = state.vRegisters[y];
  state.vRegisters[x] = (vx + vy) & 0xFF;

  // must happen last since vx could be vf
  if ((vx + vy) > 0xFF) {
    state.vRegisters[0xF] = 1;
  } else {
    state.vRegisters[0xF] = 0;
  }
  state.programCounter += 2;
}

// 8xy5 - SUB Vx, Vy
export const subVxVy = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8; 
  const y = (opcode & 0x00F0) >> 4;
  const vx = state.vRegisters[x];
  const vy = state.vRegisters[y];
  state.vRegisters[x] = (vx - vy) & 0xFF;

  // must happen last since vx could be vf
  if (vx >= vy) {
    state.vRegisters[0xF] = 1;
  } else {
    state.vRegisters[0xF] = 0;
  }
  state.programCounter += 2;
}

// 8xy6 - SHR Vx {, Vy}
export const shrVxVy = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8; 
  const vx = state.vRegisters[x];
  state.vRegisters[x] = (vx >> 1) & 0xFF;
  state.vRegisters[0xF] = vx & 0x1;
  state.programCounter += 2;
}

// 8xy7 - SUBN Vx, Vy
// 8xy7 - vX = vY - vX
export const subnVxVy = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8; 
  const y = (opcode & 0x00F0) >> 4;
  const vx = state.vRegisters[x];
  const vy = state.vRegisters[y];
  state.vRegisters[x] = (vy - vx) & 0xFF;

  // must happen last since vx could be vf
  if (vy >= vx) {
    state.vRegisters[0xF] = 1;
  } else {
    state.vRegisters[0xF] = 0;
  }
  state.programCounter += 2;
}

// 8xyE - SHL Vx {, Vy}
export const shlVxVy = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8;
  const vx = state.vRegisters[x];
  state.vRegisters[x] = (vx << 1) & 0xFF;
  state.vRegisters[0xF] = vx >> 7;
  state.programCounter += 2;
}

// 9xy0 - SNE Vx, Vy
export const sneVxVy = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8; 
  const y = (opcode & 0x00F0) >> 4;
  if (state.vRegisters[x] !== state.vRegisters[y]) {
    state.programCounter += 2;
  }
  state.programCounter += 2;
}

// Annn - LD I, addr
export const ldIAddr = (opcode: number, state: EmulatorState): void => {
  state.indexRegister = opcode & 0x0FFF;
  state.programCounter += 2;
}

// Bnnn - JP V0, addr
export const jpV0Addr = (opcode: number, state: EmulatorState): void => {
  state.programCounter = (opcode & 0x0FFF) + state.vRegisters[0];
}

// Cxkk - RND Vx, byte
export const rndVxByte = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8; 
  const kk = opcode & 0x00FF;
  state.vRegisters[x] = Math.floor(Math.random() * 256) & kk;
  state.programCounter += 2;
}

// Dxyn - DRW Vx, Vy, nibble
// If N=0 and extended mode, show 16x16 sprite.
export const drwVxVyNibble = (opcode: number, state: EmulatorState): void => {
  const [width, height] = state.getDimensions();
  const x = (opcode & 0x0F00) >> 8; 
  const y = (opcode & 0x00F0) >> 4;
  const drawHeight = opcode & 0x000F;
  const xPos = state.vRegisters[x] & (width - 1);
  const yPos = state.vRegisters[y] & (height - 1);

  // super chip 16x16 sprites
  if (drawHeight === 0) {
    state.vRegisters[0xF] = 0;
    for (let yLine = 0; yLine < 16; yLine++) {
      const pixelLeft = state.memory[state.indexRegister + yLine*2] & 0xFF;
      const pixelRight = state.memory[state.indexRegister + yLine*2 + 1] & 0xFF;
      const pixel = pixelRight + (pixelLeft << 8);
      for (let xLine = 0; xLine < 16; xLine++) {
        if ((pixel & (0x8000 >> xLine)) !== 0) {
          const index = ((xPos + xLine) % width) + (((yPos + yLine) % height) * width);
          if (state.pixelBuffer[index] === 1) {
            state.vRegisters[0xF] = 1;
          }
          state.pixelBuffer[index] ^= 1;
        }
      }
    }
  }

  // normal chip8 draw
  else {
    state.vRegisters[0xF] = 0;
    for (let yLine = 0; yLine < drawHeight; yLine++) {
      const pixel = state.memory[state.indexRegister + yLine];
      for (let xLine = 0; xLine < 8; xLine++) {
        if ((pixel & (0x80 >> xLine)) !== 0) {
          const index = ((xPos + xLine) % width) + (((yPos + yLine) % height) * width);
          if (state.pixelBuffer[index] === 1) {
            state.vRegisters[0xF] = 1;
          }
          state.pixelBuffer[index] ^= 1;
        }
      }
    }
  }
  state.drawFlag = true;
  state.programCounter += 2;
}

// Ex9E - SKP Vx
export const skpVx = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8;
  const vx = state.vRegisters[x];
  if (state.keydownBuffer.curr[vx] === 1) {
    state.programCounter += 2;
  }
  state.programCounter += 2;
}

// ExA1 - SKNP Vx
export const sknpVx = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8;
  const vx = state.vRegisters[x];
  if (state.keydownBuffer.curr[vx] === 0) {
    state.programCounter += 2;
  }
  state.programCounter += 2;
}

// Fx07 - LD Vx, DT
export const ldVxDT = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8;
  state.vRegisters[x] = state.delayTimer;
  state.programCounter += 2;
}

// Fx0A - LD Vx, K
export const ldVxK = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8;
  const prevKeys = state.keydownBuffer.prev.getAllIndexes(1);
  const currKeys = state.keydownBuffer.curr.getAllIndexes(1);
  const changedKeys = prevKeys.filter(k => currKeys.includes(k))
  if (changedKeys.length === 0) return;

  state.vRegisters[x] = changedKeys[0];
  state.programCounter += 2;
}

// Fx15 - LD DT, Vx
export const ldDTVx = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8;
  state.delayTimer = state.vRegisters[x];
  state.programCounter += 2;
}

// Fx18 - LD ST, Vx
export const ldSTVx = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8;
  state.soundTimer = state.vRegisters[x];
  state.programCounter += 2;
}

// Fx1E - ADD I, Vx
export const addIVx = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8;
  state.indexRegister += state.vRegisters[x];
  state.programCounter += 2;
}

// Fx29 - LD F, Vx
export const ldFVx = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8; 
  state.indexRegister = state.vRegisters[x] * 5;
  state.programCounter += 2;
}

// FX30 - Point I to 10-byte font sprite for digit VX (0..9)
export const ldFVx2 = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8; 
  state.indexRegister = 0x50 + (state.vRegisters[x] * 10);
  state.programCounter += 2;
}

// Fx33 - LD B, Vx
export const ldBVx = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8; 
  const value = state.vRegisters[x];
  state.memory[state.indexRegister] = Math.floor(value / 100);
  state.memory[state.indexRegister + 1] = Math.floor((value % 100) / 10);
  state.memory[state.indexRegister + 2] = Math.floor(value % 10);
  state.programCounter += 2;
}

// Fx55 - LD [I], Vx
export const ldIVx = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8; 
  for (let i=0; i<=x; i++) {
    state.memory[state.indexRegister + i] = state.vRegisters[i];
  }
  state.indexRegister += x + 1;
  state.programCounter += 2;
}

// Fx65 - LD Vx, [I]
export const ldVxI = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8; 
  for (let i=0; i<=x; i++) {
    state.vRegisters[i] = state.memory[state.indexRegister + i];
  }
  state.indexRegister += x + 1;
  state.programCounter += 2;
}

// FX75 - (saveflags vx) Save v0-vX to flag registers.
export const saveFlagsVx = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8;
  for (let i=0; i<=x; i++) {
    state.flags[i] = state.vRegisters[i];
  }
  state.programCounter += 2;
}

// FX85 - (loadflags vx) Restore v0-vX from flag registers.
export const loadFlagsVx = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8;
  for (let i=0; i<=x; i++) {
    state.vRegisters[i] = state.flags[i];
  }
  state.programCounter += 2;
}
