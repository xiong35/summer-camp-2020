const fs = require("fs");
const path = require("path");

exports.autoIndex = (targetPath) => {
  var files = fs.readdirSync(targetPath);

  urls = files
    .map((f) => path.join(targetPath, f))
    .map((path) => path.replace("\\", "/"));

  htmls = [];

  for (let i = 0; i < urls.length; i++) {
    htmls.push(`<li><a href="${urls[i]}">${files[i]}</a></li>`);
  }

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>Document</title>
  </head>
  <body>
    <h1>Index Of ${targetPath}</h1>
    <ul>
    ${htmls.join("\n")}
    </ul>
  </body>
  <style>
    h1 {
      margin: 20px 0 20px 5px;
    }
    ul {
      list-style: none;
    }
    li {
      padding: 5px 0 0 10px;
    }
  </style>
</html>
`;
};
