import { FC } from "react";
import { useThemeContext } from "../../contexts/themeContext";
import { getUiTheme } from "../../utils";
import { NamedTheme } from "../../types";
import { ThemedButton } from "../common/ThemedButton";

type PaletteListProps = {
  themes: NamedTheme[];
}

export const PaletteList: FC<PaletteListProps> = ({ themes }) => {
  const { setTheme } = useThemeContext();

  return (
    <div className="flex flex-col justify-evenly w-full my-2 gap-2">
      {
        themes.map(({ name, theme }, index) => (
          <ThemedButton
            key={`${name}-${index}`}
            text={name}
            theme={getUiTheme(theme)}
            onClick={() => setTheme(theme)}
          />
        ))
      }
    </div>
  );
}