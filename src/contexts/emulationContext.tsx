import { FC, ReactNode, createContext, useCallback, useContext, useState } from "react";
import { EmulatorState } from "../types";
import { useInterval } from "../hooks/useInterval";
import { useChipKeyBoard } from "../hooks/useChipKeyBoard";
import { CLOCK_INTERVAL, TIMER_INTERVAL } from "../constants";
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
  const { keydownBuffer } = useChipKeyBoard(); 

  const emulatorTick = useCallback(() => {
    if (emulatorState.paused) return;
    emulatorState.keydownBuffer = keydownBuffer;
    const newState = processOpcode(emulatorState); // this function copies all of emulatorState into a new object
    setEmulatorState(newState);
  }, [emulatorState, keydownBuffer]);

  const loadRom = useCallback((rom: number[]) => {
    const state = emulatorFromRom(rom);
    setEmulatorState(state);
  }, []);

  const togglePaused = useCallback(() => {
    const state = new EmulatorState(emulatorState);
    state.paused = !state.paused;
    setEmulatorState(state);
  }, [emulatorState]);

  const decrementTimers = useCallback(() => {
    const newState = new EmulatorState(emulatorState);
    if (newState.delayTimer > 0) newState.delayTimer -= 1;
    if (newState.soundTimer > 0) newState.soundTimer -= 1;
    setEmulatorState(newState);
  }, [emulatorState]);

  useInterval(emulatorTick, CLOCK_INTERVAL);
  useInterval(decrementTimers, TIMER_INTERVAL);

  return (
    <EmulationContext.Provider value={{ emulatorState, loadRom, togglePaused }}>
      { children }
    </EmulationContext.Provider>
  );
}