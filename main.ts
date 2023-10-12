import { spawn } from "node:child_process";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { Server } from "node:http";

const server = new Server(async (req, res) => {
  const dir = await mkdtemp(`${tmpdir()}/test-`);
  res.appendHeader("Content-Type", "application/octet-stream");
  res.write(`Cloning into ${dir}\n`);
  const child = spawn(
    "git",
    ["clone", "-v", "https://github.com/vercel/examples.git"],
    {
      cwd: dir,
    },
  );
  child.stdout.pipe(res);
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(res);
  child.stderr.pipe(process.stderr);
  req.on("close", () => {
    child.kill();
  });
  child.on("exit", () => {
    res.write("Done\n");
    res.end();
  });
});
server.listen(3000, () => {
  console.log("Server started");
});
