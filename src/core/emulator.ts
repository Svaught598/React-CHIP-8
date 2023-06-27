import { CHARS } from "../constants";
import { EmulatorState } from "../types";
import { cls, ret, jp, call, se, sne, seVxVy, ldVx, addVx, ldVxVy, orVxVy, andVxVy, xorVxVy, addVxVy, subVxVy, shrVxVy, subnVxVy, shlVxVy, sneVxVy, ldIAddr, jpV0Addr, rndVxByte, drwVxVyNibble, skpVx, sknpVx, ldVxDT, ldVxK, ldDTVx, ldSTVx, addIVx, ldFVx, ldBVx, ldIVx, ldVxI } from "./opcode";

export const emulatorFromRom = (rom: number[]): EmulatorState => {
  const state = new EmulatorState();
  
  CHARS.forEach((byte, index) => {
    state.memory[index] = byte;
  });
  rom.forEach((byte, index) => {
    state.memory[index + 512] = byte;
  });

  return state;
}

export const processOpcode = (state: EmulatorState): EmulatorState => {
  const opcode = state.memory[state.programCounter] << 8 | state.memory[state.programCounter + 1];
  const firstNibble = (opcode & 0xF000) >> 12;
  const thirdNibble = (opcode & 0x00F0) >> 4;
  const fourthNibble = opcode & 0x000F;

  if (state.delayTimer  > 0)
    state.delayTimer -= 1;
  if (state.soundTimer > 0)
    state.soundTimer -= 1

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
    if (thirdNibble.toHex() === '9' && fourthNibble.toHex() === 'E') {
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

  const newState = new EmulatorState(state);
  return newState;
}