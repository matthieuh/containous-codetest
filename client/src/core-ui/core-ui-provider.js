import React from "react";
import { ThemeProvider } from "styled-components";
import merge from "lodash.merge";
import get from "lodash.get";

import { GlobalStyles } from "./global-styles";
import { theme as baseTheme } from "./theme";

const modes = ["light", "dark"];

const getTheme = mode =>
  merge({}, baseTheme, {
    colors: get(baseTheme.colors.modes, mode, baseTheme.colors)
  });

export const CoreUiProvider = ({ children }) => {
  const [mode, setMode] = React.useState(modes[0]);
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <>
        <input
          type="checkbox"
          onChange={() => setMode(modes[mode === modes[0] ? 1 : 0])}
          style={{
            position: "absolute",
            top: 0,
            right: 0
          }}
        />
        <GlobalStyles />
        {children}
      </>
    </ThemeProvider>
  );
};
