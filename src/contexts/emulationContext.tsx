import { FC, ReactNode, createContext, useContext, useState } from "react";
import { EmulatorState } from "../types";
import { useInterval } from "../hooks/useInterval";
import { useChipKeyBoard } from "../hooks/useChipKeyBoard";
import { CLOCK_INTERVAL } from "../constants";
import { emulatorFromRom, processOpcode } from "../core/emulator";

type EmulationContextType = {
  emulatorState: EmulatorState;
  loadRom: (rom: number[]) => void;
  togglePaused: React.Dispatch<React.SetStateAction<boolean>>;
};

const EmulationContext = createContext<EmulationContextType | null>(null)

export const useEmulationContext = () => useContext(EmulationContext)!;

type Props = { children: ReactNode }

export const EmulationProvider: FC<Props> = ({ children }) => {
  const [emulatorState, setEmulatorState] = useState<EmulatorState>(() => new EmulatorState());
  const { keydownBuffer } = useChipKeyBoard(); // buffers keyevents and returns the current buffer

  const emulatorTick = () => {
    if (emulatorState.paused) return;
    emulatorState.keydownBuffer = keydownBuffer;
    const newState = processOpcode(emulatorState); // this function copies all of emulatorState into a new object
    setEmulatorState(newState);
  }

  const loadRom = (rom: number[]) => {
    const state = emulatorFromRom(rom);
    setEmulatorState(state);
  }

  const togglePaused = () => {
    const state = new EmulatorState(emulatorState);
    state.paused = !state.paused;
    setEmulatorState(state);
  }

  useInterval(emulatorTick, CLOCK_INTERVAL);

  return (
    <EmulationContext.Provider value={{ emulatorState, loadRom, togglePaused }}>
      { children }
    </EmulationContext.Provider>
  );
}