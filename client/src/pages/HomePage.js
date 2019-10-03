import React from "react";
import { Page, Box, Text } from "../core-ui";
import { useGithub } from "../contexts/github";

const GithubConnectPage = ({ location }) => {
  return (
    <Page alignItem="center" justifyContent="center" alignItems="center">
      <Box>
        <Text>Containous</Text>
      </Box>
    </Page>
  );
};

export default GithubConnectPage;
