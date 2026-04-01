const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactServerWebpackPlugin = require("react-server-dom-webpack/plugin");
const { Chunk } = require("webpack");
const { run } = require("node:test");
const { runInThisContext } = require("node:vm");

const mode = process.env.NODE_ENV || "development";
const development = mode === "development";

const config = {
  mode,
  entry: "./src/Client.jsx",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      publicPath: "/assets",
      template: "./src/index.html",
    }),
    new ReactServerWebpackPlugin({ isServer: false }),
  ],
  output: {
    chunkFilename: development ? "[id].chunk.js" : "[id].[contenthash].chunk.js",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  optimization: {
    runtimeChunk: "single",
  },
};

module.exports = config;
