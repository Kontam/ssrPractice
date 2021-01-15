const path = require("path");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const plugins = [];

if (process.env.ANALYZE) plugins.push(new BundleAnalyzerPlugin());

module.exports = {
  mode: "production",
  entry: "./src/client.tsx",
  module: {
    rules: [
      {
        loader: "ts-loader",
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        options: {
          configFile: "tsconfig.json",
        },
      },
    ],
  },
  plugins,
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "static/js/bundle.js",
    path: path.resolve(__dirname, "dist/public"),
  },
};
