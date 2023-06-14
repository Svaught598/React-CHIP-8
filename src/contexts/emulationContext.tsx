import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { EmulatorState } from "../types";
import { useInterval } from "../hooks/useInterval";
import { processOpcode } from "../core/opcode";

type EmulationContextType = {
  emulatorState: EmulatorState;
  setEmulatorState: Dispatch<SetStateAction<EmulatorState>>
};

const EmulationContext = createContext<EmulationContextType | null>(null)

export const useEmulationContext = () => useContext(EmulationContext)!;

type Props = { children: ReactNode }

export const EmulationProvider: FC<Props> = ({ children }) => {
  const [emulatorState, setEmulatorState] = useState<EmulatorState>(new EmulatorState());

  useInterval(() => {
    setEmulatorState((prevState) => {
      return processOpcode(prevState);
    })
  }, 1000 / 30);

  return (
    <EmulationContext.Provider value={{ emulatorState, setEmulatorState }}>
      { children }
    </EmulationContext.Provider>
  );
}