import { NamedTheme } from "./types";

export const CUSTOM_THEMES_KEY = 'custom-themes';

export const DEFAULT_THEMES: NamedTheme[] = [
  {
    name: 'Classic',
    theme: {
      light: '#0c090d',
      dark: '#f0efeb',
      invertOnUI: true,
    }
  },
  {
    name: 'Aqua',
    theme: {
      light: '#90b0ff',
      dark: '#002f23',
      invertOnUI: false,
    }
  },
  {
    name: 'Bumblebee',
    theme: {
      light: '#f1c40f',
      dark: '#2c3e50',
      invertOnUI: false,
    }
  },
  {
    name: 'Magma',
    theme: {
      light: '#bb3e03',
      dark: '#330000',
      invertOnUI: false,
    }
  },
];

export const ROM_LIST = [
  // "TEST",
  // "TEST_FLAGS",
  // "TEST_QUIRKS",
  // "TEST_KEYS",
  // "TEST_IBM",
  "15PUZZLE",
  "BLINKY",
  "BLITZ",
  "BRIX",
  "CONNECT4",
  "GUESS",
  "HIDDEN",
  "INVADERS",
  "KALEID",
  "MAZE",
  "MERLIN",
  "MISSILE",
  "PONG",
  "PONG2",
  "PUZZLE",
  "SYZYGY",
  "TANK",
  "TETRIS",
  "TICTAC",
  "UFO",
  "VBRIX",
  "VERS",
  "WIPEOFF",
] as const;

export const CLASSIC_THEME = {
  dark: '#0c090d',
  light: '#f0efeb',
  invertOnUI: false, 
}

export const CHARS: number[] = [
  0xf0,0x90,0x90,0x90,0xf0, // 0
  0x20,0x60,0x20,0x20,0x70, // 1
  0xf0,0x10,0xf0,0x80,0xf0, // 2
  0xf0,0x10,0xf0,0x10,0xf0, // 3
  0x90,0x90,0xf0,0x10,0x10, // 4
  0xf0,0x80,0xf0,0x10,0xf0, // 5
  0xf0,0x80,0xf0,0x90,0xf0, // 6
  0xf0,0x10,0x20,0x40,0x40, // 7
  0xf0,0x90,0xf0,0x90,0xf0, // 8
  0xf0,0x90,0xf0,0x10,0xf0, // 9
  0xf0,0x90,0xf0,0x90,0x90, // A
  0xe0,0x90,0xe0,0x90,0xe0, // B
  0xf0,0x80,0x80,0x80,0xf0, // C
  0xe0,0x90,0x90,0x90,0xe0, // D
  0xf0,0x80,0xf0,0x80,0xf0, // E
  0xf0,0x80,0xf0,0x80,0x80, // F
];

export const KeyMapping: { [k: string]: number } = {
  '1': 0x1,
  '2': 0x2,
  '3': 0x3,
  '4': 0xC,
  'q': 0x4,
  'w': 0x5,
  'e': 0x6,
  'r': 0xD,
  'a': 0x7,
  's': 0x8,
  'd': 0x9,
  'f': 0xE,
  'z': 0xA,
  'x': 0x0,
  'c': 0xB,
  'v': 0xF,
} as const;

// These numbers are not accurate to the original CHIP8 spec
// because of perf issues with the emulator, but they give
// a good approximation of the CHIP8 feel.
export const CLOCK_FREQ = 500;
export const CLOCK_INTERVAL = 1000 / CLOCK_FREQ;
export const TIMER_FREQ = 30;
export const TIMER_INTERVAL = 1000 / TIMER_FREQ;