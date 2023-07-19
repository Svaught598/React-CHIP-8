import { Game, NamedTheme } from "./types";

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

export const ROM_LIST: readonly Game[] = [
  // { name: "TEST", type: 'CHIP8' },
  // { name: "TEST_FLAGS", type: 'CHIP8' },
  // { name: "TEST_QUIRKS", type: 'CHIP8' },
  // { name: "TEST_KEYS", type: 'CHIP8' },
  // { name: "TEST_IBM", type: 'CHIP8' },
  { name: "BRIX", type: 'CHIP8' },
  { name: "INVADERS", type: 'CHIP8' },
  { name: "MISSILE", type: 'CHIP8' },
  { name: "PONG2", type: 'CHIP8' },
  { name: "PUZZLE", type: 'CHIP8' },
  { name: "TICTAC", type: 'CHIP8' },
  { name: "UFO", type: 'CHIP8' },

  { name: "RACE", type: 'SCHIP' },
  { name: "ALIEN", type: 'SCHIP' },
//   { name: "WORM3" , type: 'SCHIP' },
//   { name: "BLINKY" , type: 'SCHIP' },
//   { name: "FIELD" , type: 'SCHIP' },
//   { name: "JOUST" , type: 'SCHIP' },
//   { name: "PIPER" , type: 'SCHIP' },
  { name: "SPACEFIG " , type: 'SCHIP' },
//   { name: "UBOAT" , type: 'SCHIP' },
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

  // High res characters (16 x 16)
  0x3C, 0x7E, 0xE7, 0xC3, 0xC3, 0xC3, 0xC3, 0xE7, 0x7E, 0x3C, // 0
  0x18, 0x38, 0x58, 0x18, 0x18, 0x18, 0x18, 0x18, 0x18, 0x3C, // 1
  0x3E, 0x7F, 0xC3, 0x06, 0x0C, 0x18, 0x30, 0x60, 0xFF, 0xFF, // 2
  0x3C, 0x7E, 0xC3, 0x03, 0x0E, 0x0E, 0x03, 0xC3, 0x7E, 0x3C, // 3
  0x06, 0x0E, 0x1E, 0x36, 0x66, 0xC6, 0xFF, 0xFF, 0x06, 0x06, // 4
  0xFF, 0xFF, 0xC0, 0xC0, 0xFC, 0xFE, 0x03, 0xC3, 0x7E, 0x3C, // 5
  0x3E, 0x7C, 0xC0, 0xC0, 0xFC, 0xFE, 0xC3, 0xC3, 0x7E, 0x3C, // 6
  0xFF, 0xFF, 0x03, 0x06, 0x0C, 0x18, 0x30, 0x60, 0x60, 0x60, // 7
  0x3C, 0x7E, 0xC3, 0xC3, 0x7E, 0x7E, 0xC3, 0xC3, 0x7E, 0x3C, // 8
  0x3C, 0x7E, 0xC3, 0xC3, 0x7F, 0x3F, 0x03, 0x03, 0x3E, 0x7C, // 9
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
// because of perf issues with the emulator
// I just kinda made them up
export const CLOCK_FREQ = 1000;
export const CLOCK_INTERVAL = 1000 / CLOCK_FREQ;
export const TIMER_FREQ = 500;
export const TIMER_INTERVAL = 1000 / TIMER_FREQ;