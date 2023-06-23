import { FC, useRef } from "react";
import { Theme } from "../types";
import { useTheme } from "../contexts/themeContext";
import { useEmulationContext } from "../contexts/emulationContext";

export const Canvas: FC = () => {
  const { theme } = useTheme();
  const canvas = useRef<HTMLCanvasElement>(null);
  const ctx = canvas.current?.getContext('2d');
  const { emulatorState, setPaused } = useEmulationContext();
  ctx?.renderPixels(emulatorState.pixelBuffer, theme);

  return (
  <>
    <canvas ref={canvas} width={640} height={320} />
    <button 
      className="bg-zinc-700 py-2 px-8 rounded-md my-2"
      onClick={() => setPaused(isPaused => !isPaused)}
    >
      Toggle Pause
    </button>
  </>
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