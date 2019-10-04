import React from "react";
import qs from "query-string";
import { ClipLoader } from "react-spinners";
import {
  Page,
  Flex,
  Box,
  Button,
  Select,
  Text,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td
} from "../core-ui";
import { useGithub } from "../contexts/github";

const GithubConnectPage = () => {
  const [{ client, user }] = useGithub();
  const [repos, setRepos] = React.useState([]);
  const [currentRepoId, setCurrentRepoId] = React.useState();
  const [pullRequests, setPullRequests] = React.useState([]);
  const [isLoading, setLoadingState] = React.useState(false);
  const [isMerging, setMergingState] = React.useState();

  // Fetch Repos
  React.useEffect(() => {
    const getRepos = async () => {
      setLoadingState(true);
      try {
        const res = await client.apiGet(
          `/user/repos?${qs.stringify({
            sort: "updated"
          })}`
        );
        if (res && res.length) {
          setRepos(res);
          setCurrentRepoId(res.length ? res[0].id : null);
        }
      } catch (error) {}
      setLoadingState(false);
    };

    getRepos();
  }, [client]);

  const getPullRequests = React.useCallback(
    async repo => {
      setLoadingState(true);
      try {
        const res = await client.apiGet(
          `/repos/${user.login}/${repo.name}/pulls?${qs.stringify({
            base: "master",
            sort: "updated",
            direction: "asc"
          })}`
        );
        setPullRequests(res);
      } catch (error) {}
      setLoadingState(false);
    },
    [client, user.login]
  );

  // Fetch PRs
  React.useEffect(() => {
    if (currentRepoId) {
      setPullRequests([]);
      const repo = repos.find(r => r.id === currentRepoId);
      getPullRequests(repo);
    }
  }, [currentRepoId, getPullRequests, repos]);

  const handleMerge = React.useCallback(
    pr => {
      const merge = async () => {
        setMergingState(pr.id);
        try {
          const repo = repos.find(r => r.id === currentRepoId);
          const res = await client.apiPut(
            `/repos/${user.login}/${repo.name}/pulls/${pr.number}/merge`
          );

          if (res.merged) {
            getPullRequests(repo);
          }
        } catch (error) {}
        setMergingState();
      };

      merge();
    },
    [client, user.login, currentRepoId, repos, getPullRequests]
  );

  if (!repos.length && isLoading) {
    return (
      <Page alignItems="center" justifyContent="center">
        <ClipLoader sizeUnit={"px"} size={100} color={"#09D3AC"} loading />
      </Page>
    );
  }

  return (
    <Page alignItems="center" justifyContent="center">
      <Flex alignItems="baseline" p="5">
        <Text as="label" mr="3">
          Repository
        </Text>
        <Select
          my={4}
          value={currentRepoId}
          onChange={event => setCurrentRepoId(parseInt(event.target.value, 10))}
        >
          {repos.map(r => (
            <option key={r.id} value={r.id}>
              {r.full_name}
            </option>
          ))}
        </Select>
      </Flex>
      <Box>
        <ClipLoader
          sizeUnit={"px"}
          size={22}
          color={"#09D3AC"}
          loading={isLoading}
        />
        {pullRequests.length > 0 && (
          <Table>
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Title</Th>
                <Th>By</Th>
                <Th>Last Update</Th>
                <Th>Link</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {pullRequests.map(pr => (
                <Tr key={pr.id} height="85px">
                  <Td>#{pr.number}</Td>
                  <Td>{pr.title}</Td>
                  <Td>{pr.user.login}</Td>
                  <Td>{new Date(pr.updated_at).toLocaleString()}</Td>
                  <Td>
                    <a
                      href={pr.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link
                    </a>
                  </Td>
                  <Td>
                    {isMerging === pr.id ? (
                      <Flex alignItems="center" justifyContent="center">
                        <ClipLoader
                          sizeUnit={"px"}
                          size={22}
                          color={"#09D3AC"}
                          loading
                        />
                      </Flex>
                    ) : (
                      <Button
                        variant="primary"
                        disabled={pr.locked}
                        onClick={() => handleMerge(pr)}
                      >
                        Merge
                      </Button>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
        {!pullRequests.length && !isLoading && (
          <Text fontSize="2">
            There is no open pull request in this repository...
          </Text>
        )}
      </Box>
    </Page>
  );
};

export default GithubConnectPage;
