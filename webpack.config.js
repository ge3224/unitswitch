
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "production",
  watch: true,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "swc-loader",
        }
      }
    ]
  },
  resolve: {
    extensions: [".js"],
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "public"),
  },
};
