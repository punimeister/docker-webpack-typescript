/*************************************************
 * webpack.config.js
 * @link https://webpack.js.org/configuration/
 ************************************************/

if (!process.env.OUT_DIR) {
  console.log('Environment variable "OUT_DIR" is required.');
  process.exit();
}
if (!process.env.OUT_FILE) {
  console.log('Environment variable "OUT_FILE" is required.');
  process.exit();
}

function pickEntriesFromEnv() {
  let entries = {};
  let prefix = 'ENTRY_';
  let environments = process.env;
  for (let key in environments) {
    if (environments.hasOwnProperty(key) && (new RegExp(`^${prefix}`)).test(key)) {
      entries[key.replace(prefix, '')] = environments[key];
    }
  }
  if (Object.keys(entries).length === 0 && entries.constructor === Object) {
    console.log('Please set entry points.');
    process.exit();
  }
  return entries;
}

const path = require('path');
const merge = require('webpack-merge');

const commonConfig = {
  entry: pickEntriesFromEnv(),
  output: {
    path: path.resolve(__dirname, process.env.OUT_DIR),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
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
