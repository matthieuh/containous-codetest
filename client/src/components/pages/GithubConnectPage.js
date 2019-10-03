import React from "react";
import qs from "query-string";
import Button from "../ui/Button";
import Box from "../ui/Box";
import Text from "../ui/Text";
import { useGithub } from "../../contexts/github";

const { REACT_APP_ROOT_URL } = process.env;

const GithubConnectPage = ({ location }) => {
  const [{ client, user }, dispatch] = useGithub();

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
    client.authorize({ redirectUri: REACT_APP_ROOT_URL });
  }, [client]);

  if (user) {
    return <Text>{user.name}</Text>;
  }

  return (
    <Box>
      <Button onClick={handleConnect}>Github connect</Button>
    </Box>
  );
};

export default GithubConnectPage;
