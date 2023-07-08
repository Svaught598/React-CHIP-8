import { FC, useRef } from "react";
import { Theme } from "../types";
import { useTheme } from "../contexts/themeContext";
import { useEmulationContext } from "../contexts/emulationContext";

export const Canvas: FC = () => {
  const { theme } = useTheme();
  const canvas = useRef<HTMLCanvasElement>(null);
  const ctx = canvas.current?.getContext('2d');
  const { emulatorState } = useEmulationContext();
  ctx?.renderPixels(emulatorState.pixelBuffer, theme);
  if (emulatorState.paused) ctx?.renderPaused();
  // if (emulatorState.pixelBuffer.every(pixel => pixel === 0)) ctx?.renderSplash();

  return (
  <div className="border-slate-600 border-4">
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

CanvasRenderingContext2D.prototype.renderSplash =
  function() {
    this.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.fillRect(0, 0, 640, 320);
    this.fillStyle = 'white';
    this.font = '48px futile-pro';
    this.textAlign = 'center';
    this.textBaseline = 'middle';
    this.fillText('CHIP-8 Emulator', 320, 160);
  }