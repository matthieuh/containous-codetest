import React from "react";
import qs from "query-string";
import { useHistory } from "react-router";
import useCookie from "@devhammed/use-cookie";
import { Page, Button, Flex, Box, Text } from "../core-ui";
import { useGithub } from "../contexts/github";

const { REACT_APP_ROOT_URL } = process.env;

const GithubConnectPage = ({ location }) => {
  const [{ client, user }, dispatch] = useGithub();
  const [tokenCookie, setTokenCookie] = useCookie("github_token");
  const history = useHistory();

  React.useEffect(() => {
    const getUser = async () => {
      const user = await client.apiGet("/user");

      if (user && user.id) {
        dispatch({ type: "SET_USER", user });
      }
    };

    if (tokenCookie) {
      client.setToken(tokenCookie);
      getUser();
    }
  }, [client, dispatch, tokenCookie]);

  React.useEffect(() => {
    const getCode = async code => {
      try {
        const res = await client.authPost("/github/token", { code });

        if (res && res.access_token) {
          client.setToken(res.access_token);
          setTokenCookie(res.access_token);

          const user = await client.apiGet("/user");

          if (user && user.id) {
            dispatch({ type: "SET_USER", user });
          }
        }
      } catch (error) {}
    };

    const urlParams = qs.parse(location.search);

    if (client && urlParams && urlParams.code) {
      getCode(urlParams.code);
    }
  }, [location.search, client, dispatch, setTokenCookie]);

  const handleConnect = React.useCallback(() => {
    client.authorize({ redirectUri: `${REACT_APP_ROOT_URL}/auth` });
  }, [client]);

  const handleAppOpening = React.useCallback(() => {
    history.push("/");
  }, [history]);

  return (
    <Page alignItem="center" justifyContent="center" alignItems="center">
      <Box>
        {user ? (
          <Box>
            <Box mb="3">
              Welcome <Text fontWeight="bold">{user.name}</Text>
            </Box>
            <Flex justifyContent="center">
              <Button variant="primary" onClick={handleAppOpening}>
                Let's Go
              </Button>
            </Flex>
          </Box>
        ) : (
          <Button variant="github" onClick={handleConnect}>
            Authorize application
          </Button>
        )}
      </Box>
    </Page>
  );
};

export default GithubConnectPage;
