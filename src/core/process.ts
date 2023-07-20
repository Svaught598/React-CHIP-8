import { EmulatorState } from "./emulator";
import { cls, ret, jp, call, se, sne, seVxVy, ldVx, addVx, ldVxVy, orVxVy, andVxVy, xorVxVy, addVxVy, subVxVy, shrVxVy, subnVxVy, shlVxVy, sneVxVy, ldIAddr, jpV0Addr, rndVxByte, drwVxVyNibble, skpVx, sknpVx, ldVxDT, ldVxK, ldDTVx, ldSTVx, addIVx, ldFVx, ldBVx, ldIVx, ldVxI, scrollDown, scrollRight, scrollLeft, exit, disableExtended, enableExtended, ldFVx2, saveFlagsVx, loadFlagsVx } from "./opcode";

/**
 * processes opcode and mutates state in-place
 */
export const processOpcode = (state: EmulatorState): void => {
  const opcode = state.memory[state.programCounter] << 8 | state.memory[state.programCounter + 1];
  const firstNibble = (opcode & 0xF000) >> 12;
  const thirdNibble = (opcode & 0x00F0) >> 4;
  const fourthNibble = opcode & 0x000F;

  if (firstNibble === 0x0) {
    if (fourthNibble === 0x0) {
      return cls(state)
    }
    if (thirdNibble === 0xC) {
      return scrollDown(opcode, state)
    }
    if (fourthNibble === 0xE) {
      return ret(state)
    }
    if (thirdNibble === 0xF && fourthNibble === 0xB) {
      return scrollRight(state);
    }
    if (thirdNibble === 0xF && fourthNibble === 0xC) {
      return scrollLeft(state);
    }
    if (thirdNibble === 0xF && fourthNibble === 0xD) {
      return exit(state)
    }
    if (thirdNibble === 0xF && fourthNibble === 0xE) {
      return disableExtended(state)
    }
    if (thirdNibble === 0xF && fourthNibble === 0xF) {
      return enableExtended(state)
    }
  }
  if (firstNibble === 0x1) {
    return jp(opcode, state)
  }
  if (firstNibble === 0x2) {
    return call(opcode, state)
  }
  if (firstNibble === 0x3) {
    return se(opcode, state)
  }
  if (firstNibble === 0x4) {
    return sne(opcode, state)
  }
  if (firstNibble === 0x5) {
    return seVxVy(opcode, state)
  }
  if (firstNibble === 0x6) {
    return ldVx(opcode, state)
  }
  if (firstNibble === 0x7) {
    return addVx(opcode, state)
  }
  if (firstNibble === 0x8) {
    if (fourthNibble === 0x0) {
      return ldVxVy(opcode, state)
    }
    if (fourthNibble === 0x1) {
      return orVxVy(opcode, state)
    }
    if (fourthNibble === 0x2) {
      return andVxVy(opcode, state)
    }
    if (fourthNibble === 0x3) {
      return xorVxVy(opcode, state)
    }
    if (fourthNibble === 0x4) {
      return addVxVy(opcode, state)
    }
    if (fourthNibble === 0x5) {
      return subVxVy(opcode, state)
    }
    if (fourthNibble === 0x6) {
      return shrVxVy(opcode, state)
    }
    if (fourthNibble === 0x7) {
      return subnVxVy(opcode, state)
    }
    if (fourthNibble === 0xE) {
      return shlVxVy(opcode, state)
    }
  }
  if (firstNibble === 0x9) {
    return sneVxVy(opcode, state)
  }
  if (firstNibble === 0xA) {
    return ldIAddr(opcode, state)
  }
  if (firstNibble === 0xB) {
    return jpV0Addr(opcode, state)
  }
  if (firstNibble === 0xC) {
    return rndVxByte(opcode, state)
  }
  if (firstNibble === 0xD) {
    return drwVxVyNibble(opcode, state)
  }
  if (firstNibble === 0xE) {
    if (thirdNibble === 0x9 && fourthNibble === 0xE) {
      return skpVx(opcode, state)
    }
    if (thirdNibble === 0xA && fourthNibble === 0x1) {
      return sknpVx(opcode, state)
    }
  }
  if (firstNibble === 0xF) {
    if (thirdNibble === 0x0 && fourthNibble === 0x7) {
      return ldVxDT(opcode, state)
    }
    if (thirdNibble === 0x0 && fourthNibble === 0xA) {
      return ldVxK(opcode, state)
    }
    if (thirdNibble === 0x1 && fourthNibble === 0x5) {
      return ldDTVx(opcode, state)
    }
    if (thirdNibble === 0x1 && fourthNibble === 0x8) {
      return ldSTVx(opcode, state)
    }
    if (thirdNibble === 0x1 && fourthNibble === 0xE) {
      return addIVx(opcode, state)
    }
    if (thirdNibble === 0x2 && fourthNibble === 0x9) {
      return ldFVx(opcode, state)
    }
    if (thirdNibble === 0x3 && fourthNibble === 0x0) {
      return ldFVx2(opcode, state)
    }
    if (thirdNibble === 0x3 && fourthNibble === 0x3) {
      return ldBVx(opcode, state)
    }
    if (thirdNibble === 0x5 && fourthNibble === 0x5) {
      return ldIVx(opcode, state)
    }
    if (thirdNibble === 0x6 && fourthNibble === 0x5) {
      return ldVxI(opcode, state)
    }
    if (thirdNibble === 0x7 && fourthNibble === 0x5) {
      return saveFlagsVx(opcode, state)
    }
    if (thirdNibble === 0x8 && fourthNibble === 0x5) {
      return loadFlagsVx(opcode, state)
    }
  }
}