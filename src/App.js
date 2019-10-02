import React, { useState } from "react";
import merge from "lodash.merge";
import get from "lodash.get";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import baseTheme from "./theme";
import Text from "./components/ui/Text";
import Box from "./components/ui/Text";

import GithubConnectPage from "./components/pages/GithubConnectPage";

const modes = ["light", "dark"];

const getTheme = mode =>
  merge({}, baseTheme, {
    colors: get(baseTheme.colors.modes, mode, baseTheme.colors)
  });

function App() {
  const [mode, setMode] = useState(modes[0]);
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <Box bg="background" color="text" css={{ minHeight: '100vh' }}>
        <input
          type="checkbox"
          onChange={() => setMode(mode === modes[0] ? modes[1] : modes[0])}
        />
        <Router>
          <Switch>
            <Route path="/" component={GithubConnectPage} />
            <Route path="/prs">
              <Text>Containous</Text>
            </Route>
          </Switch>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
