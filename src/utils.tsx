import { Theme } from "./types";

export function getUiTheme(theme: Theme): Theme {
  return {
    light: theme.invertOnUI ? theme.dark : theme.light,
    dark: theme.invertOnUI ? theme.light : theme.dark,
    invertOnUI: false,
  }
}

export async function getRomData(romName: string): Promise<number[]> {
  const romResponse = await fetch(`./roms/${romName}`);
  const romDataRaw = await romResponse.arrayBuffer();
  const romData = Array.from(new Uint8Array(romDataRaw));
  return romData;
}

// convert #RRGGBB to [r, g, b]
export function colorStringToRGBA(color: string): [number, number, number, number] {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  const a = 255;
  return [r, g, b, a];
}

// convert array of 1s & 0s to rgba array
// scaled up for better rendering
export function pixelBufToRGBABuf(
  pixelBuffer: number[],
  theme: Theme,
  oWidth: number, 
  oHeight: number,
  sWidth: number,
  sHeight: number
): Uint8ClampedArray {
  const scaleX = oWidth / sWidth;
  const scaleY = oHeight / sHeight;
  const rgbaBuffer = new Uint8ClampedArray(sWidth * sHeight * 4);
  const lightColors = colorStringToRGBA(theme.dark);
  const darkColors = colorStringToRGBA(theme.light);
  for (let y = 0; y < sHeight; y++) {
    for (let x = 0; x < sWidth; x++) {
      const oX = Math.floor(x * scaleX);
      const oY = Math.floor(y * scaleY);
      const pixelIndex = oY * oWidth + oX
      const pixel = pixelBuffer[pixelIndex];
      const offset = (y * sWidth + x) * 4;
      const color = pixel ? lightColors : darkColors;
      rgbaBuffer[offset] = color[0];
      rgbaBuffer[offset + 1] = color[1];
      rgbaBuffer[offset + 2] = color[2];
      rgbaBuffer[offset + 3] = color[3];
    }
  }
  return rgbaBuffer;
}
