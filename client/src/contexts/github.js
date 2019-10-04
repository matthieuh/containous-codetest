import React, { createContext, useContext, useReducer } from "react";
import GithubClient from "../lib/github";

const {
  REACT_APP_GITHUB_CLIENT_ID,
  REACT_APP_GITHUB_CLIENT_SECRET
} = process.env;

export const GithubContext = createContext();

const initialState = {
  client: new GithubClient({
    clientId: REACT_APP_GITHUB_CLIENT_ID,
    clientSecret: REACT_APP_GITHUB_CLIENT_SECRET
  })
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user
      };

    case "SET_TOKEN":
      return {
        ...state,
        token: action.token
      };

    default:
      return state;
  }
};

export const GithubProvider = ({ children }) => (
  <GithubContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </GithubContext.Provider>
);
export const useGithub = () => useContext(GithubContext);
