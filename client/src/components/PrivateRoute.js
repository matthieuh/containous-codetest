import React from "react";
import { useGithub } from "../contexts/github";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const [{ user }] = useGithub();
  console.log('user', user);
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/auth" }} />
        )
      }
    />
  );
}

export default PrivateRoute;
