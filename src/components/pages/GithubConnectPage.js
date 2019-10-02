import React from "react";
import qs from 'query-string';
import Button from "../ui/Button";
import Box from "../ui/Box";
import { authorize } from "../../lib/github";

const { REACT_APP_GITHUB_CLIENT_ID, REACT_APP_ROOT_URL } = process.env;

const GithubConnectPage = ({ location }) => {
  React.useEffect(() => {
    const params = qs.parse(location.search);

    if (params && params.code) {
      console.log('params.code', params.code);
    }

  }, [location.search]);

  const connect = React.useCallback(() => {
    authorize({
      clientId: REACT_APP_GITHUB_CLIENT_ID,
      redirectUri: REACT_APP_ROOT_URL
    });
  }, []);

  return (
    <Box>
      <Button onClick={connect}>Github connect</Button>
    </Box>
  );
};

export default GithubConnectPage;
