import { Server } from "node:http";

const server = new Server(async (req, res) => {
  const messages = [
    "Cloning into '/tmp/test-1q2w3e4r5t6y/examples'...\n",
    "POST git-upload-pack (gzip 1139 to 585 bytes)\n",
    "remote: Enumerating objects: 3, done.\n",
    "remote: Counting objects: 33% (1/3)\n",
    "remote: Counting objects: 66% (2/3)\n",
    "remote: Counting objects: 100% (3/3)\n",
    "remote: Counting objects: 100% (3/3), done.\n",
    "remote: Compressing objects:  33% (1/3)\n",
    "remote: Compressing objects:  66% (2/3)\n",
    "remote: Compressing objects: 100% (3/3)\n",
    "remote: Compressing objects: 100% (3/3), done.\n",
    "Receiving objects:   0% (1/1117)\n",
    "Receiving objects:   1% (12/1117)\n",
    "Receiving objects:   2% (23/1117)\n",
    "Receiving objects:   3% (34/1117)\n",
    "Receiving objects:   4% (45/1117)\n",
    "Receiving objects:   5% (56/1117)\n",
    "Receiving objects:   6% (67/1117)\n",
    "Receiving objects:   7% (78/1117)\n",
    "Receiving objects:   8% (90/1117)\n",
    "Receiving objects:   9% (101/1117)\n",
    "Receiving objects:  10% (112/1117)\n",
    "Receiving objects:  11% (123/1117)\n",
    "Receiving objects:  12% (134/1117)\n",
    "Receiving objects:  13% (145/1117)\n",
    "Receiving objects:  14% (157/1117)\n",
    "Receiving objects:  15% (168/1117)\n",
    "Receiving objects:  16% (179/1117)\n",
    "Receiving objects:  17% (190/1117)\n",
    "Receiving objects:  18% (201/1117)\n",
    "Receiving objects:  19% (213/1117)\n",
    "Receiving objects:  20% (224/1117)\n",
    "Receiving objects:  21% (235/1117)\n",
    "Receiving objects:  22% (246/1117)\n",
    "Receiving objects:  23% (257/1117)\n",
    "Receiving objects:  50% (559/1117)\n",
    "Receiving objects:  60% (671/1117)\n",
    "Receiving objects:  70% (782/1117)\n",
    "Receiving objects:  80% (894/1117)\n",
    "Receiving objects:  90% (1006/1117)\n",
    "Receiving objects: 100% (1117/1117)\n",
    "Done\n",
  ];
  res.appendHeader("Content-Type", "application/octet-stream");
  for (const message of messages) {
    res.write(message);
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  res.end();
});
server.listen(3000, () => {
  console.log("Server started");
});
