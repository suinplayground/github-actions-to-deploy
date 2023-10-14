import { Octokit } from "@octokit/core";
const accessToken = process.env["GITHUB_TOKEN"];
const owner = "suinplayground";
const repo = "github-actions-to-deploy";
const octokit = new Octokit({ auth: accessToken });
await octokit.request("POST /repos/{owner}/{repo}/deployments", {
  owner,
  repo,
  ref: "topic-branch",
  payload: '{ "deploy": "migrate" }',
  description: "Deploy request from hubot",
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  },
});
