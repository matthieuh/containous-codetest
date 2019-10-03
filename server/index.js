require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetchImpl = require("node-fetch");
const FormData = require("form-data");

const { PORT, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

const app = express();

app.set("host", "0.0.0.0");
app.set("port", PORT || 8080);
app.use(cors());
app.use(bodyParser.json());

app.post("/github/token", async (req, res) => {
  const formData = new FormData();

  formData.append("code", req.body.code);
  formData.append("client_id", GITHUB_CLIENT_ID);
  formData.append("client_secret", GITHUB_CLIENT_SECRET);

  try {
    const response = await fetchImpl(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "user-Agent": "Containous Code Test",
          accept: "application/json",
          ...formData.getHeaders()
        },
        body: formData
      }
    );

    const result = await response.json();

    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.listen(app.get("port"), () => {
  console.log(
    "%s App is running at http://localhost:%d in %s mode",
    "✓",
    app.get("port"),
    app.get("env")
  );
});
