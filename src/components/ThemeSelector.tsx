import { FC } from "react";
import { useTheme } from "../contexts/themeContext";

const themes = [
  {
    name: 'Light',
    theme: {
      light: '#7f3400',
      dark: '#326f53'
    }
  },
  {
    name: 'Dark',
    theme: {
      light: '#f1c40f',
      dark: '#2c3e50',
    }
  },
  {
    name: 'Blue',
    theme: {
      light: '#2980b9',
      dark: '#e74c3c',
    }
  },
  {
    name: 'Purple',
    theme: {
      light: '#8e44ad',
      dark: '#f39c12',
    }
  },
]

export const ThemeSelector: FC = () => {
  const { setTheme } = useTheme();

  return (
    <div className="flex flex-row justify-evenly w-full my-2">
      {
        themes.map(({ name, theme }) => (
          <button
            key={name}
            className="bg-zinc-700 py-2 px-8 rounded-md"
            onClick={() => setTheme(theme)}
          >
            { name }
          </button>
        ))
      }
    </div>
  );
}