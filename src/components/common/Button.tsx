import { CLASSIC_THEME } from "../../constants";
import { Theme } from "../../types";
import { LayeredText } from "./LayeredText";

type ButtonProps = {
  text: string;
  theme?: Theme;
  selected?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick, theme, selected }) => {
  const bg = selected ? 'bg-slate-700 border-slate-400' : 'bg-slate-900 border-slate-600';
  theme = theme ?? CLASSIC_THEME;

  return (
    <button
      className={ "border-4 py-1 px-8 hover:border-slate-400 hover:bg-slate-700 " + bg }
      onClick={onClick}
    >
      <LayeredText theme={theme} text={text} fontSize="16px" />
    </button>
  );
}