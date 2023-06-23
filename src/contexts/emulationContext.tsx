import { FC, ReactNode, createContext, useContext, useState } from "react";
import { EmulatorState } from "../types";
import { usePausableInterval } from "../hooks/useInterval";
import { processOpcode } from "../core/opcode";

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

  usePausableInterval(() => {
    setEmulatorState((prevState) => {
      return {...processOpcode(prevState)} as EmulatorState;
    })
  }, 1000/500, paused);

  const loadRom = (rom: number[]) => {
    setPaused(true);
    emulatorState.reset();
    emulatorState.loadRom(rom);
    setPaused(false);
  }

  return (
    <EmulationContext.Provider value={{ emulatorState, loadRom, setPaused }}>
      { children }
    </EmulationContext.Provider>
  );
}