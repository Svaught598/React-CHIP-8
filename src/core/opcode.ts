import { EmulatorState } from "../types"

Number.prototype.toHex = function() {
  return this.toString(16).toUpperCase();
}

export const notImpl = (opcode: number, state: EmulatorState): void => {
  return;
}

// 00E0 - CLS
export const cls = (opcode: number, state: EmulatorState): void => {
  for (let i=0; i<state.pixelBuffer.length; i++) {
    state.pixelBuffer[i] = 0;
  }
  state.drawFlag = true;
  state.programCounter += 2;
}

// 00EE - RET
export const ret = (opcode: number, state: EmulatorState): void => {
  state.programCounter = state.stack[state.stackPointer];
  state.stackPointer -= 1;
}

// 1nnn - JP addr
export const jp = (opcode: number, state: EmulatorState): void => {
  state.programCounter = opcode & 0x0FFF;
}

// 2nnn - CALL addr
export const call = (opcode: number, state: EmulatorState): void => {
  state.stackPointer += 1;
  state.stack[state.stackPointer] = state.programCounter + 2;
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
  state.programCounter += 2;
}

// 8xy2 - AND Vx, Vy
export const andVxVy = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8;
  const y = (opcode & 0x00F0) >> 4;
  state.vRegisters[x] &= state.vRegisters[y];
  state.programCounter += 2;
}

// 8xy3 - XOR Vx, Vy
export const xorVxVy = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8;
  const y = (opcode & 0x00F0) >> 4;
  state.vRegisters[x] ^= state.vRegisters[y];
  state.programCounter += 2;
}

// 8xy4 - ADD Vx, Vy
export const addVxVy = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8; 
  const y = (opcode & 0x00F0) >> 4;
  const sum = state.vRegisters[x] + state.vRegisters[y];
  if (sum > 255) {
    state.vRegisters[0xF] = 1;
  } else {
    state.vRegisters[0xF] = 0;
  }
  state.vRegisters[x] = sum & 0xFF;
  state.programCounter += 2;
}

// 8xy5 - SUB Vx, Vy
export const subVxVy = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8; 
  const y = (opcode & 0x00F0) >> 4;
  if (state.vRegisters[x] > state.vRegisters[y]) {
    state.vRegisters[0xF] = 1;
  } else {
    state.vRegisters[0xF] = 0;
  }
  state.vRegisters[x] = (state.vRegisters[x] - state.vRegisters[y]) & 0xFF;
  state.programCounter += 2;
}

// 8xy6 - SHR Vx {, Vy}
export const shrVxVy = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8; 
  const y = (opcode & 0x00F0) >> 4;
  state.vRegisters[0xF] = state.vRegisters[x] & 0x1;
  state.vRegisters[x] = (state.vRegisters[x] >> 1) & 0xFF;
  state.programCounter += 2;
}

// 8xy7 - SUBN Vx, Vy
// 8xy7 - vX = vY - vX
export const subnVxVy = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8; 
  const y = (opcode & 0x00F0) >> 4;
  if (state.vRegisters[y] > state.vRegisters[x]) {
    state.vRegisters[0xF] = 1;
  } else {
    state.vRegisters[0xF] = 0;
  }
  state.vRegisters[x] = (state.vRegisters[y] - state.vRegisters[x]) & 0xFF;
  state.programCounter += 2;
}

// 8xyE - SHL Vx {, Vy}
export const shlVxVy = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8; 
  const y = (opcode & 0x00F0) >> 4;
  state.vRegisters[0xF] = state.vRegisters[x] >> 7;
  state.vRegisters[x] = (state.vRegisters[x] << 1) & 0xFF;
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
export const drwVxVyNibble = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8; 
  const y = (opcode & 0x00F0) >> 4;
  const height = opcode & 0x000F;
  const xPos = state.vRegisters[x];
  const yPos = state.vRegisters[y];
  state.vRegisters[0xF] = 0;
  for (let yLine = 0; yLine < height; yLine++) {
    const pixel = state.memory[state.indexRegister + yLine];
    for (let xLine = 0; xLine < 8; xLine++) {
      if ((pixel & (0x80 >> xLine)) !== 0) {
        const index = (xPos + xLine + ((yPos + yLine) * 64));
        if (state.pixelBuffer[index] === 1) {
          state.vRegisters[0xF] = 1;
        }
        state.pixelBuffer[index] ^= 1;
      }
    }
  }
  state.drawFlag = true;
  state.programCounter += 2;
}

// Ex9E - SKP Vx
export const skpVx = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8;
  if (state.keyPressed[state.vRegisters[x]]) {
    state.programCounter += 2;
  }
  state.programCounter += 2;
}

// ExA1 - SKNP Vx
export const sknpVx = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8;
  if (!state.keyPressed[state.vRegisters[x]]) {
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
  if (state.keyPressed.includes(x)) {
    state.vRegisters[x] = state.keyPressed[x];
    return;
  }
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
  state.programCounter += 2;
}

// Fx65 - LD Vx, [I]
export const ldVxI = (opcode: number, state: EmulatorState): void => {
  const x = (opcode & 0x0F00) >> 8; 
  for (let i=0; i<=x; i++) {
    state.vRegisters[i] = state.memory[state.indexRegister + i];
  }
  state.programCounter += 2;
}

export const processOpcode = (state: EmulatorState): EmulatorState => {
  const opcode = state.memory[state.programCounter] << 8 | state.memory[state.programCounter + 1];
  const firstNibble = (opcode & 0xF000) >> 12;
  const thirdNibble = (opcode & 0x00F0) >> 4;
  const fourthNibble = opcode & 0x000F;
  console.log('%copcode.ts line:324 opcode.toHex()', 'color: #26bfa5;', opcode.toHex());

  if (firstNibble.toHex() === '0') {
    if (fourthNibble.toHex() === '0') {
      cls(opcode, state)
    }
    if (fourthNibble.toHex() === 'E') {
      ret(opcode, state)
    }
  }
  if (firstNibble.toHex() === '1') {
    jp(opcode, state)
  }
  if (firstNibble.toHex() === '2') {
    call(opcode, state)
  }
  if (firstNibble.toHex() === '3') {
    se(opcode, state)
  }
  if (firstNibble.toHex() === '4') {
    sne(opcode, state)
  }
  if (firstNibble.toHex() === '5') {
    seVxVy(opcode, state)
  }
  if (firstNibble.toHex() === '6') {
    ldVx(opcode, state)
  }
  if (firstNibble.toHex() === '7') {
    addVx(opcode, state)
  }
  if (firstNibble.toHex() === '8') {
    if (fourthNibble.toHex() === '0') {
      ldVxVy(opcode, state)
    }
    if (fourthNibble.toHex() === '1') {
      orVxVy(opcode, state)
    }
    if (fourthNibble.toHex() === '2') {
      andVxVy(opcode, state)
    }
    if (fourthNibble.toHex() === '3') {
      xorVxVy(opcode, state)
    }
    if (fourthNibble.toHex() === '4') {
      addVxVy(opcode, state)
    }
    if (fourthNibble.toHex() === '5') {
      subVxVy(opcode, state)
    }
    if (fourthNibble.toHex() === '6') {
      shrVxVy(opcode, state)
    }
    if (fourthNibble.toHex() === '7') {
      subnVxVy(opcode, state)
    }
    if (fourthNibble.toHex() === 'E') {
      shlVxVy(opcode, state)
    }
  }
  if (firstNibble.toHex() === '9') {
    sneVxVy(opcode, state)
  }
  if (firstNibble.toHex() === 'A') {
    ldIAddr(opcode, state)
  }
  if (firstNibble.toHex() === 'B') {
    jpV0Addr(opcode, state)
  }
  if (firstNibble.toHex() === 'C') {
    rndVxByte(opcode, state)
  }
  if (firstNibble.toHex() === 'D') {
    drwVxVyNibble(opcode, state)
  }
  if (firstNibble.toHex() === 'E') {
    if (thirdNibble.toHex() === '9' && fourthNibble.toHex() === 'A') {
      skpVx(opcode, state)
    }
    if (thirdNibble.toHex() === 'A' && fourthNibble.toHex() === '1') {
      sknpVx(opcode, state)
    }
  }
  if (firstNibble.toHex() === 'F') {
    if (thirdNibble.toHex() === '0' && fourthNibble.toHex() === '7') {
      ldVxDT(opcode, state)
    }
    if (thirdNibble.toHex() === '0' && fourthNibble.toHex() === 'A') {
      ldVxK(opcode, state)
    }
    if (thirdNibble.toHex() === '1' && fourthNibble.toHex() === '5') {
      ldDTVx(opcode, state)
    }
    if (thirdNibble.toHex() === '1' && fourthNibble.toHex() === '8') {
      ldSTVx(opcode, state)
    }
    if (thirdNibble.toHex() === '1' && fourthNibble.toHex() === 'E') {
      addIVx(opcode, state)
    }
    if (thirdNibble.toHex() === '2' && fourthNibble.toHex() === '9') {
      ldFVx(opcode, state)
    }
    if (thirdNibble.toHex() === '3' && fourthNibble.toHex() === '3') {
      ldBVx(opcode, state)
    }
    if (thirdNibble.toHex() === '5' && fourthNibble.toHex() === '5') {
      ldIVx(opcode, state)
    }
    if (thirdNibble.toHex() === '6' && fourthNibble.toHex() === '5') {
      ldVxI(opcode, state)
    }
  }

  state.keyPressed = new Array(16).fill(0);
  return state;
}