const WebpackDevConfigFile = require("./webpack.dev.config");

module.exports = {
  target: "node",
  mode: "development",
  devtool: "inline-cheap-module-source-map",
  resolve: {
    modules: WebpackDevConfigFile.resolve.modules,
    extensions: ['.wasm', '.mjs', '.js', '.json'],
    // The order is important:
    // If target = node, then mainFields = [module, main],
    // but our test should not recompile ts files, instead
    // the compiled js files should be taken.
    mainFields: ["browser", "module", "main"]
  },
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
};