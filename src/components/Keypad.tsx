import { FC } from "react";
import { keyboard } from "../core/core";
import { useThemeContext } from "../contexts/themeContext";

const keys = [
  '1', '2', '3', '4',
  'Q', 'W', 'E', 'R',
  'A', 'S', 'D', 'F',
  'Z', 'X', 'C', 'V',
];

export const Keypad: FC = () => {
  const { uiTheme } = useThemeContext();
  const style = {
    backgroundColor: uiTheme.dark,
    borderColor: uiTheme.light,
    color: uiTheme.light,
  }

  return (
    <div className="grid grid-cols-4 self-center pt-4 gap-2">
      { keys.map((key) => (
        <div className="col-span-1">
          <button
            style={style}
            onTouchStart={() => keyboard.setKeydown(key)}
            onTouchEnd={() => keyboard.setKeyup(key)}
            className="h-20 w-20 bg-slate-500 font-futile-pro text-3xl border-4"
          >
            {key}
          </button>
        </div>
      )) }
    </div>
  )
}