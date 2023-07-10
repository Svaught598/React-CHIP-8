import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

type EmulationContextType = {
  paused: boolean;
  rom: number[];
  setPaused: Dispatch<SetStateAction<boolean>>;
  setRom: Dispatch<SetStateAction<number[]>>;
};

type Props = { children: ReactNode }

const EmulationContext = createContext<EmulationContextType | null>(null);
export const useEmulationContext = () => useContext(EmulationContext)!;
export const EmulationProvider: FC<Props> = ({ children }) => {
  const [rom, setRom] = useState<number[]>([]);
  const [paused, setPaused] = useState<boolean>(false);

  return (
    <EmulationContext.Provider value={{ rom, setRom, paused, setPaused }}>
      { children }
    </EmulationContext.Provider>
  );
}