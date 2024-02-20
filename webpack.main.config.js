const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: "./src/main.js",
  // target: "node",
  externals: {
    react: "React",
  },
  plugins: [new NodePolyfillPlugin()],
  // Put your normal webpack config below here
  module: {
    rules: require("./webpack.rules"),
  },
};
