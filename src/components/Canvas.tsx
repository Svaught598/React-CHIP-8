import { FC, useRef } from "react";
import { Theme } from "../types";

type Props = {
  pixelBuffer: number[];
  theme: Theme;
}

export const Canvas: FC<Props> = ({ pixelBuffer, theme }) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const ctx = canvas.current?.getContext('2d');
  ctx?.renderPixels(pixelBuffer, theme);

  return <canvas ref={canvas} width={640} height={320} />
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