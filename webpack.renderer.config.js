const rules = require("./webpack.rules");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});

module.exports = {
  // Put your normal webpack config below here
  resolve: {
    fallback: {
      async_hooks: false,
      fs: false,
      net: false,
    },
  },
  plugins: [new NodePolyfillPlugin()],
  module: {
    rules,
  },
};
