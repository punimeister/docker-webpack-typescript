/*************************************************
 * webpack.config.js
 * @link https://webpack.js.org/configuration/
 ************************************************/

if (!process.env.ENTRY) {
  console.log('Environment variable "ENTRY" is required.');
  process.exit();
}
if (!process.env.OUT_DIR) {
  console.log('Environment variable "OUT_DIR" is required.');
  process.exit();
}
if (!process.env.OUT_FILE) {
  console.log('Environment variable "OUT_FILE" is required.');
  process.exit();
}

const path = require('path');
const merge = require('webpack-merge');

const commonConfig = {
  entry: process.env.ENTRY,
  output: {
    path: path.resolve(__dirname, process.env.OUT_DIR),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: [
      '.ts',
    ],
  },
};

const developmentConfig = {
  mode: 'development',
  output: {
    filename: process.env.OUT_FILE,
  },
  devtool: 'source-map',
  watch: true,
  watchOptions: {
    poll: 500,
    ignored: /node_modules/,
  },
};

const productionConfig = {
  mode: 'production',
  output: {
    filename: process.env.OUT_FILE.replace(/(.+)\.js$/, '$1.min.js'),
  },
};

module.exports = merge(commonConfig, process.env.MODE === 'production' ? productionConfig : developmentConfig);
