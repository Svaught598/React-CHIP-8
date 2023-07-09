import { Theme } from "./types";

export function getUiTheme(theme: Theme): Theme {
  return {
    light: theme.invertOnUI ? theme.dark : theme.light,
    dark: theme.invertOnUI ? theme.light : theme.dark,
    invertOnUI: false,
  }
}