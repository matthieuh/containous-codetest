import React from "react";
import qs from "query-string";
import { useHistory } from "react-router"
import { Page, Button, Flex, Box, Text } from "../core-ui";
import { useGithub } from "../contexts/github";

const { REACT_APP_ROOT_URL } = process.env;

const GithubConnectPage = ({ location }) => {
  const [{ client, user }, dispatch] = useGithub();
  const history = useHistory();

  React.useEffect(() => {
    const getCode = async code => {
      try {
        const res = await client.getToken(code);

        if (res && res.id) {
          dispatch({ type: "SET_USER", user: res });
        }
      } catch (error) {}
    };

    const urlParams = qs.parse(location.search);

    if (client && urlParams && urlParams.code) {
      getCode(urlParams.code);
    }
  }, [location.search, client, dispatch]);

  const handleConnect = React.useCallback(() => {
    client.authorize({ redirectUri: `${REACT_APP_ROOT_URL}/auth` });
  }, [client]);

  const handleAppOpening = React.useCallback(() => {
    history.push("/")
  }, [history])

  return (
    <Page alignItem="center" justifyContent="center" alignItems="center">
      <Box>
        {user ? (
          <Box>
            <Box mb="3">
              Welcome <Text fontWeight="bold">{user.name}</Text>
            </Box>
            <Flex justifyContent="center">
              <Button variant="primary" onClick={handleAppOpening}>Let's Go</Button>
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
