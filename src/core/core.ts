import { EmulatorState } from "./emulator";
import { Chip8KeyBoard } from "./keyboard";
import { Audio } from "./audio";

export const emulatorState = new EmulatorState();
export const keyboard = new Chip8KeyBoard();
export const audio = new Audio();