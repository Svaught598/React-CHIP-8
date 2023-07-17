import React from "react";
import { Theme } from "../../types";
import { CLASSIC_THEME } from "../../constants";
import { useBreakpoint } from "../../useBreakpoint";

type FontSize = {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

type LayeredTextProps = {
  text: string;
  theme?: Theme;
  fontSize?: string | FontSize;
}

export const LayeredText: React.FC<LayeredTextProps> = ({ text, fontSize, theme }) => {
  const breakpoint = useBreakpoint();
  const { dark, light } = theme ?? CLASSIC_THEME;

  const layers = {
    color: light,
    textShadow: `
      3px 3px 0px ${dark}, 
      -3px 3px 0px ${dark}, 
      -3px -3px 0px ${dark},  
      3px -3px 0px ${dark} 
    `,
  }

  // get fontSize if string, otherwise get fontSize based on breakpoint
  const font = (typeof fontSize === 'string')
    ? fontSize
    : fontSize?.[breakpoint] 
      ?? 'text-2xl';

  return (
    <h1 className="font-futile-pro self-center leading-8" style={{ ...layers, fontSize: font }}>
      { text }
    </h1>
  )
}