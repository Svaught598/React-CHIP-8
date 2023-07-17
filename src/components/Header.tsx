import { useThemeContext } from "../contexts/themeContext";
import { LayeredText } from "./common/LayeredText"

export const Header = () => {
  const { theme } = useThemeContext();
  return (
    <header className="hidden md:flex h-24 bg-slate-900 border-slate-600 border-4 justify-center align-center">
      <LayeredText theme={theme} fontSize={{ xs: '42px', md: '64px'}} text="CHIP-8 Emulator" />
    </header>
  )
}