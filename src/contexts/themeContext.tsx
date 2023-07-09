import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { Theme } from "../types";
import { DEFAULT_THEMES } from "../constants";
import { getUiTheme } from "../utils";

type ThemeContextType = {
  theme: Theme,
  uiTheme: Theme,
  setTheme: Dispatch<SetStateAction<Theme>>
};

const ThemeContext = createContext<ThemeContextType | null>(null)
export const useTheme = () => useContext(ThemeContext)!;

type Props = { children: ReactNode }

export const ThemeProvider: FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEMES[0].theme);
  const uiTheme = getUiTheme(theme);

  return (
    <ThemeContext.Provider value={{ theme, uiTheme, setTheme }}>
      { children }
    </ThemeContext.Provider>
  );
}