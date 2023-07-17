import { FormEventHandler, useState } from "react";
import { NamedTheme } from "../types";
import { LayeredText } from "./common/LayeredText";
import { Button } from "./common/Button";
import { useThemeContext } from "../contexts/themeContext";

type PaletteMakerProps = {
  closeModal: () => void;
}

export const PaletteMaker: React.FC<PaletteMakerProps> = ({ closeModal }) => {
  const [darkColor, setDarkColor] = useState('#000000');
  const [lightColor, setLightColor] = useState('#ffffff');
  const [invertOnUI, setInvertOnUI] = useState(true);
  const [themeName, setThemeName] = useState('');
  const { saveNewCustomTheme } = useThemeContext();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const theme: NamedTheme = {
      name: themeName,
      theme: {
        dark: darkColor,
        light: lightColor,
        invertOnUI: false,
      },
    };
    saveNewCustomTheme(theme);
    closeModal();
  };

  return (
    <div className="absolute top-0 left-0 h-screen w-screen grid z-20">
      <div className="absolute opacity-80 bg-slate-950 w-full h-full"/>
      <form className="relative flex flex-col gap-4 bg-slate-900 self-center border-slate-700 border-4 justify-self-center w-11/12 md:w-1/3 opacity-100 z-30 py-4 px-8" onSubmit={handleSubmit}>
        <button type="button" className="absolute top-0 right-2" onClick={closeModal}>
          <LayeredText fontSize="24px" text="X" />
        </button>

        <LayeredText fontSize="36px" text="Create a Custom Palette" />

        <label className="grid grid-cols-2 justify-between align-center">
          <LayeredText fontSize="28px" text="Palette Name" />
          <input
          className="p-2 text-black font-futile-pro"
            type="text"
            name="themeName"
            value={themeName}
            onChange={(e) => setThemeName(e.target.value)}
          />
        </label>
        <label className="grid grid-cols-2 cursor-pointer">
          <LayeredText fontSize="28px" text="Dark Color" />
          <input
            className="w-full h-full"
            type="color"
            name="dark"
            value={darkColor}
            onChange={(e) => setDarkColor(e.target.value)}
          />
        </label>
        <label className="grid grid-cols-2 cursor-pointer">
          <LayeredText fontSize="28px" text="Light Color" />
          <input
            className="w-full h-full"
            type="color"
            name="light"
            value={lightColor}
            onChange={(e) => setLightColor(e.target.value)}
          />
        </label>
        <label className="flex flex-row justify-between align-center cursor-pointer">
          <LayeredText fontSize="28px" text="Invert colors on UI?" />
          <input
            className="h-8 w-8"
            type="checkbox"
            name="invertOnUI"
            checked={invertOnUI}
            onChange={(e) => setInvertOnUI(e.target.checked)}
          />
        </label>
        <span className="flex-auto"></span>
        <Button text="Save Theme" />
      </form>
    </div>
  );
};