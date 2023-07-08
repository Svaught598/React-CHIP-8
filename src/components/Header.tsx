import { useTheme } from "../contexts/themeContext";
import { LayeredText } from "./common/LayeredText"

export const Header = () => {
  const { theme } = useTheme();
  return (
    <header className="h-24 bg-slate-900 border-slate-600 border-4 flex justify-center align-center">
      <LayeredText theme={theme} fontSize="64px" text="CHIP-8 Emulator" />
    </header>
  )
}