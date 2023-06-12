declare global {
  interface CanvasRenderingContext2D {
    renderPixels(pixelBuffer: number[], theme: Theme): void;
  }
}

export type Theme = {
  light: string;
  dark: string;
}