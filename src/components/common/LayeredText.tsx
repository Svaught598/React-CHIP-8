import React from "react";
import { Theme } from "../../types";
import { CLASSIC_THEME } from "../../constants";


type LayeredTextProps = {
  text: string;
  theme?: Theme;
  fontSize?: string;
}

export const LayeredText: React.FC<LayeredTextProps> = ({ text, fontSize, theme }) => {
  const { dark, light } = theme ?? CLASSIC_THEME;
  const layers = {
    color: light,
    fontSize: fontSize ?? '48px',
    textShadow: `
      3px 3px 0px ${dark}, 
      -3px 3px 0px ${dark}, 
      -3px -3px 0px ${dark},  
      3px -3px 0px ${dark} 
    `,
    }

  return (
    <h1 className="font-futile-pro self-center" style={layers}>
      { text }
    </h1>
  )
}