const path = require("path");
module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  watch: process.env.NODE_ENV === "development",
  devServer: {
    static: "./build",
    compress: true,
    port: 9900,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build"),
  },
};
