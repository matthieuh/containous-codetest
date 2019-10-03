import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GithubProvider } from "./contexts/github";

import { CoreUiProvider, Text } from "./core-ui";

import GithubConnectPage from "./pages/GithubConnectPage";

function App() {
  return (
    <GithubProvider>
      <CoreUiProvider>
        <Router>
          <Switch>
            <Route path="/" component={GithubConnectPage} />
            <Route path="/prs">
              <Text>Containous</Text>
            </Route>
          </Switch>
        </Router>
      </CoreUiProvider>
    </GithubProvider>
  );
}

export default App;
