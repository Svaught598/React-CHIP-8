import { FC, ReactNode, createContext, useCallback, useContext, useState } from "react";
import { EmulatorState } from "../types";
import { useInterval } from "../hooks/useInterval";
import { processOpcode } from "../core/opcode";
import { useChipKeyBoard } from "../hooks/useChipKeyBoard";
import { CLOCK_INTERVAL } from "../constants";

type EmulationContextType = {
  emulatorState: EmulatorState;
  loadRom: (rom: number[]) => void;
  setPaused: React.Dispatch<React.SetStateAction<boolean>>;
};

const EmulationContext = createContext<EmulationContextType | null>(null)

export const useEmulationContext = () => useContext(EmulationContext)!;

type Props = { children: ReactNode }

export const EmulationProvider: FC<Props> = ({ children }) => {
  const [emulatorState, setEmulatorState] = useState<EmulatorState>(new EmulatorState());
  const [paused, setPaused] = useState<boolean>(true);
  const { keyBuffer, clearKeys: clearKeyBuffer } = useChipKeyBoard();

  const emulatorTick = () => {
    if (paused) return;

    emulatorState.keyPressed = keyBuffer;
    clearKeyBuffer();
    const newState = processOpcode(emulatorState);
    setEmulatorState(newState);
  }

  const loadRom = (rom: number[]) => {
    setPaused(true);
    emulatorState.reset();
    emulatorState.loadRom(rom);
    setPaused(false);
    setTimeout(() => setPaused(false))
  }

  useInterval(emulatorTick, CLOCK_INTERVAL);

  return (
    <EmulationContext.Provider value={{ emulatorState, loadRom, setPaused }}>
      { children }
    </EmulationContext.Provider>
  );
}