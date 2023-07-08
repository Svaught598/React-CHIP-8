import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { Theme } from "../types";
import { CLASSIC_THEME, DEFAULT_THEMES } from "../constants";

type ThemeContextType = {
  theme: Theme,
  setTheme: Dispatch<SetStateAction<Theme>>
};

const ThemeContext = createContext<ThemeContextType | null>(null)
export const useTheme = () => useContext(ThemeContext)!;

type Props = { children: ReactNode }

export const ThemeProvider: FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEMES[0].theme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      { children }
    </ThemeContext.Provider>
  );
}