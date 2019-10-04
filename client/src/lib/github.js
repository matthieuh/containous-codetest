import qs from "query-string";

const API_BASE_URL = process.env.REACT_APP_API_ROOT_URL;
const GITHUB_AUTH_BASE_URL = "https://github.com";
const GITHUB_API_BASE_URL = "https://api.github.com";

export default class GithubClient {
  options;
  token;

  constructor(options) {
    this.options = options;
  }

  setToken(newToken) {
    this.token = newToken;
  }

  authorize({ redirectUri }) {
    const query = {
      client_id: this.options.clientId,
      redirect_uri: redirectUri,
      scope: 'repo'
    };

    const authUrl = `${GITHUB_AUTH_BASE_URL}/login/oauth/authorize?${qs.stringify(
      query
    )}`;

    window.open(authUrl, "_self");
  }

  fetch(path, data, opts = {}) {
    const {
      headers = {},
      method = "POST",
      baseUrl = GITHUB_API_BASE_URL
    } = opts;

    const fetchOpts = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
        "user-Agent": "Containous Code Test",
        ...headers
      }
    };

    if (data) {
      fetchOpts.body = JSON.stringify(data);
    }

    return fetch(`${baseUrl}${path}`, fetchOpts);
  }

  async fetchAndThrow(path, data, opts) {
    try {
      const res = await this.fetch(path, data, opts);
      if (res.status === "401") {
        this.token = null;
      }
      return res.json();
    } catch (error) {
      throw new Error(
        `Failed Github call. path: ${path} data: ${JSON.stringify(data)}`
      );
    }
  }

  apiGet(path, data, opts) {
    return this.fetchAndThrow(path, data, { method: "GET", ...opts });
  }

  apiPost(path, data, opts) {
    return this.fetchAndThrow(path, data, { method: "POST", ...opts });
  }

  apiPut(path, data, opts) {
    return this.fetchAndThrow(path, data, { method: "PUT", ...opts });
  }

  authPost(path, data, opts) {
    return this.fetchAndThrow(path, data, {
      method: "POST",
      baseUrl: API_BASE_URL,
      ...opts
    });
  }
}
