import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { Game } from "../types";

type EmulationContextType = {
  paused: boolean;
  rom: Game | undefined;
  setPaused: Dispatch<SetStateAction<boolean>>;
  setRom: Dispatch<SetStateAction<Game | undefined>>;
};

type Props = { children: ReactNode }

const EmulationContext = createContext<EmulationContextType | null>(null);
// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/no-non-null-assertion
export const useEmulationContext = () => useContext(EmulationContext)!;
export const EmulationProvider: FC<Props> = ({ children }) => {
  const [rom, setRom] = useState<Game>();
  const [paused, setPaused] = useState<boolean>(false);

  return (
    <EmulationContext.Provider value={{ rom, setRom, paused, setPaused }}>
      { children }
    </EmulationContext.Provider>
  );
}