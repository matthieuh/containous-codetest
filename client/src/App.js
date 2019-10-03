import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GithubProvider } from "./contexts/github";

import { CoreUiProvider } from "./core-ui";
import PrivateRoute from './components/PrivateRoute';

import GithubConnectPage from "./pages/GithubConnectPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <GithubProvider>
      <CoreUiProvider>
        <Router basename="/">
          <Switch>
            <Route path="/auth" component={GithubConnectPage} />
            <PrivateRoute path="/" component={HomePage} />
          </Switch>
        </Router>
      </CoreUiProvider>
    </GithubProvider>
  );
}

export default App;
