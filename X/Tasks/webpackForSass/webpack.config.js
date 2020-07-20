const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const MyScssPlugin = require("./plugins/MyScssPlugin.js");

const { resolve } = require("path");

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new MiniCssExtractPlugin({
      filename: "css/main.css",
    }),
    new MyScssPlugin(),
  ],
};
