import { KeyMapping } from "../constants";

export type KeyBuffer = {
  prev: number[];
  curr: number[];
}

const KEYS = Object.keys(KeyMapping);

export class Chip8KeyBoard {
  public keydownBuffer: KeyBuffer = {
    curr: new Array(16).fill(0),
    prev: new Array(16).fill(0),
  };

  constructor() {
    window.addEventListener('keydown', (e) => this.handleKeydown(e));
    window.addEventListener('keyup', (e) => this.handleKeyup(e));
  }

  private handleKeydown = (event: KeyboardEvent) => {
    if (!KEYS.includes(event.key)) return;
    const index = KeyMapping[event.key];
    const newKeydownBuffer = [...this.keydownBuffer.curr];
    newKeydownBuffer[index] = 1;
    this.keydownBuffer.prev = this.keydownBuffer.curr;
    this.keydownBuffer.curr = newKeydownBuffer;
  }

  private handleKeyup = (event: KeyboardEvent) => {
    if (!KEYS.includes(event.key)) return;
    const index = KeyMapping[event.key];
    const newKeydownBuffer = [...this.keydownBuffer.curr];
    newKeydownBuffer[index] = 0;
    this.keydownBuffer.prev = this.keydownBuffer.curr;
    this.keydownBuffer.curr = newKeydownBuffer;
  }

  public setKeydown = (key: string) => {
    const index = KeyMapping[key];
    const newKeydownBuffer = [...this.keydownBuffer.curr];
    newKeydownBuffer[index] = 1;
    this.keydownBuffer.prev = this.keydownBuffer.curr;
    this.keydownBuffer.curr = newKeydownBuffer;
  }

  public setKeyup = (key: string) => {
    const index = KeyMapping[key];
    const newKeydownBuffer = [...this.keydownBuffer.curr];
    newKeydownBuffer[index] = 0;
    this.keydownBuffer.prev = this.keydownBuffer.curr;
    this.keydownBuffer.curr = newKeydownBuffer;
  }
}