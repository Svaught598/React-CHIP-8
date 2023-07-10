import { CLASSIC_THEME } from "../../constants";
import { Theme } from "../../types";
import { LayeredText } from "./LayeredText";

type ThemedButtonProps = {
  text: string;
  theme?: Theme;
  selected?: boolean;
  onClick?: () => void;
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({ text, onClick, theme }) => {
  theme = theme ?? CLASSIC_THEME;
  const style = {
    borderColor: theme.light,
    backgroundColor: theme.dark,
  }

  return (
    <button
      style={style}
      className="border-4 py-1 px-8"
      onClick={onClick}
    >
      <LayeredText theme={theme} text={text} fontSize="16px" />
    </button>
  );
}