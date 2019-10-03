import qs from "query-string";

const API_BASE_URL = process.env.REACT_APP_API_ROOT_URL;
const APP_BASE_URL = process.env.REACT_APP_ROOT_URL;
const GITHUB_AUTH_BASE_URL = "https://github.com";
const GITHUB_API_BASE_URL = "https://api.github.com";

export default class GithubClient {
  options;
  token;

  constructor(options) {
    this.options = options;
  }

  authorize() {
    const query = {
      client_id: this.options.clientId,
      redirect_uri: APP_BASE_URL
    };

    const authUrl = `${GITHUB_AUTH_BASE_URL}/login/oauth/authorize?${qs.stringify(
      query
    )}`;

    window.open(authUrl, "_self");
  }

  async getToken(code) {
    const res = await this.fetchAndThrow(
      "/github/token",
      { code },
      {
        baseUrl: API_BASE_URL
      }
    );

    this.token = res.access_token;
    return this.fetchAndThrow("/user", null, { method: "GET" });
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
      return res.json();
    } catch (error) {
      throw new Error(
        `Failed Github call. path: ${path} data: ${JSON.stringify(data)}`
      );
    }
  }
}
