import React from "react";
import { useGithub } from "../contexts/github";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const [{ client }] = useGithub();

  return (
    <Route
      {...rest}
      render={props =>
        client.token ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/auth" }} />
        )
      }
    />
  );
}

export default PrivateRoute;
