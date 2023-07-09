import { FC } from "react";
import { useTheme } from "../../contexts/themeContext";
import { DEFAULT_THEMES } from "../../constants";
import { Button } from "../common/Button";
import { getUiTheme } from "../../utils";

export const PaletteList: FC = () => {
  const { setTheme } = useTheme();

  return (
    <>
      <div className="flex flex-col justify-evenly w-full my-2 gap-2">
        {
          DEFAULT_THEMES.map(({ name, theme }) => (
            <Button
              key={name}
              text={name}
              theme={getUiTheme(theme)}
              onClick={() => setTheme(theme)}
            />
          ))
        }
      </div>
    </>
  );
}