import { Octokit } from "@octokit/core";
import Koa from "koa";
import zodRouter from "koa-zod-router";
import { z } from "zod";

const app = new Koa();
const router = zodRouter();

router.register({
  name: "createDeployment",
  method: "post",
  path: "/post/:id",
  handler: async (ctx, next) => {
    const { accessToken, owner, repo, deployment_id } = ctx.request.body;
    ctx.body = { hello: `world: ${accessToken}` };
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
    await octokit.request(
      "POST /repos/{owner}/{repo}/deployments/{deployment_id}/statuses",
      {
        owner,
        repo,
        deployment_id,
        environment: "production",
        state: "success",
        log_url: "https://example.com/deployment/42/output",
        description: "Deployment finished successfully.",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );
    await next();
  },
  validate: {
    params: z.object({ id: z.coerce.number() }),
    body: z.object({
      accessToken: z.string(),
      owner: z.string(),
      repo: z.string(),
      deployment_id: z.number(),
    }),
    response: z.object({ hello: z.string() }),
  },
});

app.use(router.routes());

app.listen(3000, () => {
  console.log("app listening on http://localhost:3000");
});
