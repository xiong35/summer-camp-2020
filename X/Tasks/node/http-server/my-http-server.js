#!/usr/bin/env node

const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const { getFmtTime } = require("./get-fmt-time");
const { autoIndex } = require("./autoIndex");
const { help } = require("./help");

const argControlInds = [];
const args = process.argv.slice(2);
const config = {
  port: "8080",
  addr: "0.0.0.0",
  autoIndex: true,
};

args.forEach((val, ind) => {
  if (val[0] === "-") {
    argControlInds.push(ind);
  }
});

argControlInds.forEach((ind) => {
  try {
    switch (args[ind]) {
      case "-p":
      case "--port":
        config.port = args[ind + 1];
        return;
      case "-a":
        config.addr = args[ind + 1];
        return;
      case "-i":
        config.autoIndex = false;
        return;
      case "-h":
        console.log(help);
        process.exit(0);
    }
  } catch {}
  console.error("unkown command:", args[ind]);
  process.exit(-1);
});

var server = http.createServer(function (req, res) {
  console.log(getFmtTime(), "\t", req.method, req.url);

  let urlPath = url.parse(req.url).pathname;
  let targetPath = path.join("./", urlPath);
  let absPath = path.resolve(targetPath);

  fs.stat(absPath, (err, stats) => {
    if (err || !stats) {
      console.log("file at:", absPath, "is not found");
      res.writeHead(404);
      res.end("not found");
      return;
    } else if (stats.isDirectory && stats.isDirectory()) {
      let tryFiles = ["index.html", "index.htm"].map((it) =>
        path.join(targetPath, it)
      );
      let found = false;

      tryFiles.forEach((path) => {
        if (found) {
          return;
        }
        try {
          data = fs.readFileSync(path);
          if (data) {
            found = true;
            res.writeHead(200);
            res.end(data);
          }
        } catch (err) {}
      });

      if (found) {
        return;
      }
      if (config.autoIndex) {
        res.writeHead(200);
        res.end(autoIndex(targetPath));
        return;
      }

      console.log("file at:", absPath, "is not found");
      res.writeHead(404);
      res.end("not found");
    } else if (stats.isFile && stats.isFile()) {
      fs.readFile(targetPath, (err, file) => {
        res.writeHead(200);
        res.end(file);
      });
    }
  });
});

try {
  server.listen(config.port, config.addr);
} catch (err) {
  console.log("port conflict");
  console.log(err);
  process.exit(-1);
}

console.log(`Server running at http://localhost:${config.port}/`);
