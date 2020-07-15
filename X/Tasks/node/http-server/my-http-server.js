#!/usr/bin/env node

var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");

var { getFmtTime } = require("./get-fmt-time");
var { autoIndex } = require("./autoIndex/autoindex");

var argControlInds = [];
var args = process.argv.slice(2);
var config = {
  port: "8080",
  addr: "0.0.0.0",
  autoIndex: false,
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
        config.autoIndex = true;
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

  // if(urlPath)
  autoIndex(absPath);

  fs.readFile(targetPath, (err, file) => {
    if (err) {
      console.log("file at:", absPath, "is not found");
      res.writeHead(404);
      res.end("not found");
      return;
    }
    res.writeHead(200);
    res.end(file);
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
