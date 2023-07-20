import { EmulatorState } from "./emulator";
import { cls, ret, jp, call, se, sne, seVxVy, ldVx, addVx, ldVxVy, orVxVy, andVxVy, xorVxVy, addVxVy, subVxVy, shrVxVy, subnVxVy, shlVxVy, sneVxVy, ldIAddr, jpV0Addr, rndVxByte, drwVxVyNibble, skpVx, sknpVx, ldVxDT, ldVxK, ldDTVx, ldSTVx, addIVx, ldFVx, ldBVx, ldIVx, ldVxI, scrollDown, scrollRight, scrollLeft, exit, lores, hires, ldFVx2, saveFlagsVx, loadFlagsVx } from "./opcode";

/**
 * processes opcode and mutates state in-place
 */
export const processOpcode = (state: EmulatorState): void => {
  state.drawFlag = false;
  const opcode = state.memory[state.programCounter] << 8 | state.memory[state.programCounter + 1];
  const n1 = (opcode & 0xF000) >> 12;
  const n2 = (opcode & 0x0F00) >> 8;
  const n3 = (opcode & 0x00F0) >> 4;
  const n4 = opcode & 0x000F;
  const lowByte = opcode & 0x00FF;

  console.log(`%c
  opcode: ${opcode.toString(16).padStart(4, '0')}
  pc: ${state.programCounter.toString(16).padStart(4, '0')}
  `, 'color: #26bfa5;');

  switch (n1) {
    case 0x0: switch (n2) {
      case 0x0: switch (n3) {
        case 0xC: switch(n4) {
          case 0x0: throw new Error(`fucked opcode: ${opcode}`);
          default: return scrollDown(opcode, state);
        }
        case 0xE: switch (n4) {
          case 0x0: return cls(state);
          case 0xE: return ret(state);
          default: throw new Error(`fucked opcode: ${opcode}`);
        }
        case 0xF: switch (n4) {
          case 0xB: return scrollRight(state);
          case 0xC: return scrollLeft(state);
          case 0xD: return exit(state);
          case 0xE: return lores(state);
          case 0xF: return hires(state);
          default: throw new Error(`fucked opcode: ${opcode}`);
        }
        case 0x0: return;
        default: throw new Error(`fucked opcode: ${opcode}`);
      }
      default: throw new Error(`fucked opcode: ${opcode}`);
    }
    case 0x1: return jp(opcode, state);
    case 0x2: return call(opcode, state);
    case 0x3: return se(opcode, state);
    case 0x4: return sne(opcode, state);
    case 0x5: return seVxVy(opcode, state);
    case 0x6: return ldVx(opcode, state);
    case 0x7: return addVx(opcode, state);
    case 0x8: switch (n4) {
      case 0x0: return ldVxVy(opcode, state);
      case 0x1: return orVxVy(opcode, state);
      case 0x2: return andVxVy(opcode, state);
      case 0x3: return xorVxVy(opcode, state);
      case 0x4: return addVxVy(opcode, state);
      case 0x5: return subVxVy(opcode, state);
      case 0x6: return shrVxVy(opcode, state);
      case 0x7: return subnVxVy(opcode, state);
      case 0xE: return shlVxVy(opcode, state);
      default: throw new Error(`fucked opcode: ${opcode}`);
    }
    case 0x9: return sneVxVy(opcode, state);
    case 0xA: return ldIAddr(opcode, state);
    case 0xB: return jpV0Addr(opcode, state);
    case 0xC: return rndVxByte(opcode, state);
    case 0xD: return drwVxVyNibble(opcode, state);
    case 0xE: switch (n3) {
      case 0x9: return (n4 === 0xE) ? skpVx(opcode, state) : undefined;
      case 0xA: return (n4 === 0x1) ? sknpVx(opcode, state) : undefined;
      default: throw new Error(`fucked opcode: ${opcode}`);
    }
    case 0xF: switch(lowByte) {
      case 0x07: return ldVxDT(opcode, state);
      case 0x0A: return ldVxK(opcode, state);
      case 0x15: return ldDTVx(opcode, state);
      case 0x18: return ldSTVx(opcode, state);
      case 0x1E: return addIVx(opcode, state);
      case 0x29: return ldFVx(opcode, state);
      case 0x30: return ldFVx2(opcode, state);
      case 0x33: return ldBVx(opcode, state);
      case 0x55: return ldIVx(opcode, state);
      case 0x65: return ldVxI(opcode, state);
      case 0x75: return saveFlagsVx(opcode, state);
      case 0x85: return loadFlagsVx(opcode, state);
      default: throw new Error(`fucked opcode: ${opcode}`);
    }
    default: throw new Error(`fucked opcode: ${opcode}`);
  }
}