import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { Theme } from "../types";

type ThemeContextType = {
  theme: Theme,
  setTheme: Dispatch<SetStateAction<Theme>>
};

const ThemeContext = createContext<ThemeContextType | null>(null)
export const useTheme = () => useContext(ThemeContext)!;

type Props = { children: ReactNode }

export const ThemeProvider: FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>({
    light: '#7f3400',
    dark : '#326f53',
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      { children }
    </ThemeContext.Provider>
  );
}