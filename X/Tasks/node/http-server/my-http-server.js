#!/usr/bin/env node

var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");

var fmtTime = require("./get-fmt-time");

var argControlInds = [];
var args = process.argv.slice(2);
var config = {
  port: "8080",
  addr: "0.0.0.0",
};

args.forEach((val, ind) => {
  if (val[0] === "-") {
    argControlInds.push(ind);
  }
});

argControlInds.forEach((ind) => {
  switch (args[ind]) {
    case "-p":
    case "--port":
      config.port = args[ind + 1];
      break;
    case "-a":
      config.addr = args[ind + 1];
      break;
    default:
      console.error("unkown command:", args[ind]);
      process.exit(-1);
  }
});

http.createServer(function (req, res) {
  console.log(req.method, req.url, "\t", fmtTime.getFmtTime());

  let pathname = url.parse(req.url).pathname;
  let targetPath = path.join("./", pathname);
  fs.readFile(targetPath, (err, file) => {
    if (err) {
      console.log(
        "file at:",
        path.resolve(targetPath),
        "is not found"
      );
      res.writeHead(404);
      res.end("not found");
      return;
    }
    res.writeHead(200);
    res.end(file);
  });
});

try {
  http.listen(config.port, config.addr);
} catch (err) {
  console.log("port or address conflict");
  process.exit(-1);
}

console.log(
  `Server running at http://${config.addr}:${config.port}/`
);
