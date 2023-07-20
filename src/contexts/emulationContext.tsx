import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

type EmulationContextType = {
  paused: boolean;
  rom: string | undefined;
  setPaused: Dispatch<SetStateAction<boolean>>;
  setRom: Dispatch<SetStateAction<string | undefined>>;
};

type Props = { children: ReactNode }

const EmulationContext = createContext<EmulationContextType | null>(null);
// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/no-non-null-assertion
export const useEmulationContext = () => useContext(EmulationContext)!;
export const EmulationProvider: FC<Props> = ({ children }) => {
  const [rom, setRom] = useState<string>();
  const [paused, setPaused] = useState<boolean>(false);

  return (
    <EmulationContext.Provider value={{ rom, setRom, paused, setPaused }}>
      { children }
    </EmulationContext.Provider>
  );
}