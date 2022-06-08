/* config-overrides.js */
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  // config.plugins.push(new NodePolyfillPlugin());
  config.resolve.fallback = {
    fs: false,
    path: require.resolve("path-browserify"),
    vm: require.resolve("vm-browserify"),
  };
  return config;
};
