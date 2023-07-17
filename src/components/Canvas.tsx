import { FC, useEffect, useRef } from "react";
import { Theme } from "../types";
import { useThemeContext } from "../contexts/themeContext";
import { useEmulationContext } from "../contexts/emulationContext";
import { processOpcode } from "../core/process";
import { CLASSIC_THEME, CLOCK_INTERVAL } from "../constants";
import { audio, emulatorState, keyboard } from "../core/core";


export const Canvas: FC = () => {
  const { theme } = useThemeContext();
  const { paused, rom } = useEmulationContext();
  const canvas = useRef<HTMLCanvasElement>(null);
  const ctx = canvas.current?.getContext('2d');

  // setup canvas width/height based on viewport
  const width = window.screen.availWidth < 640 ? window.screen.availWidth : 640
  const height = width / 2;
  const pixelSize = width / 64;

  // setup emulator to run on component mount
  useEffect(() => {
    const state = setInterval(() => {
      const isPaused = emulatorState.meta.paused;
      emulatorState.keydownBuffer = keyboard.keydownBuffer;
      if (!isPaused) processOpcode(emulatorState);
      ctx?.renderPixels(emulatorState.pixelBuffer, emulatorState.meta.theme ?? CLASSIC_THEME, pixelSize);
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
  }, [ctx, pixelSize]);

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
    <div className="relative mt-4 md:mt-0">
      { paused && 
        <div className="font-futile-pro text-4xl absolute top-0 left-0 bg-black opacity-50 h-full w-full flex justify-center items-center">
          <h1>PAUSED</h1>
        </div>
      }
      <div style={{ backgroundColor: theme.light, borderColor: theme.dark }} className="md:border-4 md:p-4">
        <canvas ref={canvas} width={width} height={height} />
      </div>
    </div>
  )
}

CanvasRenderingContext2D.prototype.renderPixels =
  function(pixelBuffer: number[], theme: Theme, pixelSize: number) {
    for (let x = 0; x < 64; x++) {
      for (let y = 0; y < 32; y++) {
        this.fillStyle = pixelBuffer[y * 64 + x] ? theme.dark : theme.light;
        this.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
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
