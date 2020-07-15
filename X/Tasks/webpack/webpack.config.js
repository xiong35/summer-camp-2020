const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.jsx?$/,
        loaders: [
          "react-hot-loader/webpack",
          "babel-loader",
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function () {
          return [precss, autoprefixer];
        },
        devServer: {
          historyApiFallback: true,
          hot: true,
          inline: true,
          progress: true,
        },
      },
    }),
  ],
};
