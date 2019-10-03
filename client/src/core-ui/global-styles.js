import { createGlobalStyle } from "styled-components";
import css from "@styled-system/css";

export const GlobalStyles = createGlobalStyle(
  css({
    "*": {
      boxSizing: "border-box"
    },
    html: {
      fontSize: 3,
      fontFamily: "normal",
      color: "txt",
      backgroundColor: "bg",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      textRendering: "optimizeLegibility"
    },
    body: {
      margin: 0
    },
    "html, body, #root": {
      height: '100%',
    },
    "input, button, select, textarea": {
      fontFamily: "inherit",
      fontSize: "inherit",
      fontWeight: "normal",
      color: "inherit"
    },
    svg: {
      verticalAlign: "middle",
      display: "block"
    }
  }),
  {
    html: { lineHeight: 1.2 }
  }
);
