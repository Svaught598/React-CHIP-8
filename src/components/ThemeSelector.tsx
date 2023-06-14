import { FC } from "react";
import { useTheme } from "../contexts/themeContext";
import { DEFAULT_THEMES } from "../constants";

export const ThemeSelector: FC = () => {
  const { setTheme } = useTheme();

  return (
    <div className="flex flex-row justify-evenly w-full my-2">
      {
        DEFAULT_THEMES.map(({ name, theme }) => (
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