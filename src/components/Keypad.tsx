import { FC } from "react";
import { keyboard } from "../core/core";
import { useThemeContext } from "../contexts/themeContext";

Number.prototype.toHex = function() {
  return this.toString(16).toUpperCase();
}

const keys = [
  0x1, 0x2, 0x3, 0xC,
  0x4, 0x5, 0x6, 0xD,
  0x7, 0x8, 0x9, 0xE,
  0xA, 0x0, 0xB, 0xF,
];

export const Keypad: FC = () => {
  const { uiTheme } = useThemeContext();
  const style = {
    backgroundColor: uiTheme.dark,
    borderColor: uiTheme.light,
    color: uiTheme.light,
  }

  return (
    <div className="grid grid-cols-4 self-center pt-4 gap-2 md:hidden">
      { keys.map((key) => (
        <div key={key} className="col-span-1">
          <button
            style={style}
            onTouchStart={() => keyboard.setKeydown(key)}
            onTouchEnd={() => keyboard.setKeyup(key)}
            className="h-20 w-20 bg-slate-500 font-futile-pro text-3xl border-4"
          >
            {key.toHex()}
          </button>
        </div>
      )) }
    </div>
  )
}