import { FC, useEffect, useRef } from "react";
import { Theme } from "../types";
import { useThemeContext } from "../contexts/themeContext";
import { useEmulationContext } from "../contexts/emulationContext";
import { processOpcode } from "../core/process";
import { CLASSIC_THEME, CLOCK_INTERVAL } from "../constants";
import { Chip8KeyBoard } from "../core/keyboard";
import { Audio } from "../core/audio";
import { EmulatorState } from "../core/emulator";

const emulatorState = new EmulatorState();
const keyboard = new Chip8KeyBoard();
const audio = new Audio();

export const Canvas: FC = () => {
  const { theme } = useThemeContext();
  const { paused, rom } = useEmulationContext();
  const canvas = useRef<HTMLCanvasElement>(null);
  const ctx = canvas.current?.getContext('2d');

  // setup emulator to run on component mount
  useEffect(() => {
    const state = setInterval(() => {
      const isPaused = emulatorState.meta.paused;
      emulatorState.keydownBuffer = keyboard.keydownBuffer;
      if (!isPaused) processOpcode(emulatorState);
      ctx?.renderPixels(emulatorState.pixelBuffer, emulatorState.meta.theme ?? CLASSIC_THEME);
      if (isPaused) ctx?.renderPaused();
    }, CLOCK_INTERVAL);

    const timers = setInterval(() => {
      if (emulatorState.delayTimer > 0) emulatorState.delayTimer -= 1;
      if (emulatorState.soundTimer > 0) emulatorState.soundTimer -= 1;
      if (emulatorState.soundTimer > 0) audio.play();
      else audio.stop();
    }, CLOCK_INTERVAL);

    return () => {
      clearInterval(state);
      clearInterval(timers);
    }
  }, [ctx]);

  // load rom
  useEffect(() => {
    emulatorState.loadRom(rom);
  }, [rom]);

  // pause
  useEffect(() => {
    emulatorState.meta.paused = paused;
  }, [paused]);

  // change theme
  useEffect(() => {
    emulatorState.meta.theme = theme;
  }, [theme]);

  return (
    <div style={{ backgroundColor: theme.light, borderColor: theme.dark }} className="border-4 p-4">
      <canvas ref={canvas} width={640} height={320} />
    </div>
  )
}

CanvasRenderingContext2D.prototype.renderPixels =
  function(pixelBuffer: number[], theme: Theme) {
    for (let x = 0; x < 64; x++) {
      for (let y = 0; y < 32; y++) {
        this.fillStyle = pixelBuffer[y * 64 + x] ? theme.dark : theme.light;
        this.fillRect(x * 10, y * 10, 10, 10);
      }
    }
  }

CanvasRenderingContext2D.prototype.renderPaused =
  function() {
    this.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.fillRect(0, 0, 640, 320);
    this.fillStyle = 'white';
    this.font = '48px futile-pro';
    this.textAlign = 'center';
    this.textBaseline = 'middle';
    this.fillText('Paused', 320, 160);
  }
