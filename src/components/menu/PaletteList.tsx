import { FC } from "react";
import { useThemeContext } from "../../contexts/themeContext";
import { Button } from "../common/Button";
import { getUiTheme } from "../../utils";
import { NamedTheme } from "../../types";

type PaletteListProps = {
  themes: NamedTheme[];
}

export const PaletteList: FC<PaletteListProps> = ({ themes }) => {
  const { setTheme } = useThemeContext();

  return (
    <div className="flex flex-col justify-evenly w-full my-2 gap-2">
      {
        themes.map(({ name, theme }, index) => (
          <Button
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