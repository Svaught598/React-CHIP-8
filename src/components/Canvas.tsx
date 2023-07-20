import { FC, useEffect, useRef } from "react";
import { useThemeContext } from "../contexts/themeContext";
import { useEmulationContext } from "../contexts/emulationContext";
import { FRAME_INTERVAL } from "../constants";
import { emulatorState } from "../core/core";
import { getRomData } from "../utils";


export const Canvas: FC = () => {
  const { theme } = useThemeContext();
  const { paused, rom } = useEmulationContext();
  const canvas = useRef<HTMLCanvasElement>(null);
  const ctx = canvas.current?.getContext('2d');

  // setup canvas width/height based on viewport
  const width = window.screen.availWidth < 640 ? window.screen.availWidth : 640
  const height = width / 2;

  useEffect(() => {
    emulatorState.screen = new ImageData(width, height);
  }, [height, width])
  
  // setup emulator to run on component mount
  useEffect(() => {
    const state = setInterval(() => {
      emulatorState.tickFrame(width, height, ctx);
      emulatorState.decrementTimers();
    }, FRAME_INTERVAL);
    return () => clearInterval(state);
  }, [ctx, width, height]);

  // load rom
  useEffect(() => {
    if (!rom) return;
    getRomData(rom.name).then((data) => {
      emulatorState.loadRom(data);
      emulatorState.meta.paused = false;
      emulatorState.meta.romName = rom.name;
      emulatorState.ipf = rom.ipf;
    });
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
        (<>
          <div className="absolute top-0 left-0 bg-black opacity-50 h-full w-full" />
          <div className="font-futile-pro text-4xl absolute top-0 left-0 h-full w-full flex justify-center items-center">
            <h1 className="opacity-100 p-2" style={{ backgroundColor: theme.dark, color: theme.light }}>PAUSED</h1>
          </div>
        </>)
      }
      <div style={{ backgroundColor: theme.light, borderColor: theme.dark }} className="md:border-4 md:p-4">
        <canvas ref={canvas} width={width} height={height} />
      </div>
    </div>
  )
}