import { Dispatch, FC, ReactNode, SetStateAction, createContext, useCallback, useContext, useMemo, useState } from "react";
import { NamedTheme, Theme } from "../types";
import { CUSTOM_THEMES_KEY, DEFAULT_THEMES } from "../constants";
import { getUiTheme } from "../utils";

type ThemeContextType = {
  theme: Theme;
  uiTheme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  customThemes: NamedTheme[];
  saveNewCustomTheme: (theme: NamedTheme) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null)
export const useThemeContext = () => useContext(ThemeContext)!;

type Props = { children: ReactNode }

export const ThemeProvider: FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEMES[0].theme);
  const [customThemes, setCustomThemes] = useState<NamedTheme[]>(() => {
    return JSON.parse(localStorage.getItem(CUSTOM_THEMES_KEY) || '[]');
  })

  const saveNewCustomTheme = useCallback((theme: NamedTheme) => {
    setCustomThemes(themes => {
      localStorage.setItem(CUSTOM_THEMES_KEY, JSON.stringify([...themes, theme]));
      return [...themes, theme];
    });
  }, []);

  const ctxValues = useMemo(() => {
    return {
      theme,
      uiTheme: getUiTheme(theme),
      setTheme,
      customThemes, 
      saveNewCustomTheme,
    }
  }, [theme, customThemes, saveNewCustomTheme]);

  return (
    <ThemeContext.Provider value={ctxValues}>
      { children }
    </ThemeContext.Provider>
  );
}