/*************************************************
 * webpack.config.js
 * @link https://webpack.js.org/configuration/
 ************************************************/

/**
 * webpack mode
 * ('development' or 'production')
 * @type {string}
 */
const mode = process.env.MODE || 'development';

/**
 * Directory in which bundle files output
 * (relative path from this file)
 * @type {string}
 */
const outputDir = process.env.OUT_DIR || '';

/**
 * entry points
 * @type {{}|string}
 * @link https://webpack.js.org/concepts/entry-points/
 */
const entry = pickEntriesFromEnv() || '';

/**
 * output filename
 * @type {string}
 * @link https://webpack.js.org/concepts/output/
 */
const outputFile = process.env.OUT_FILE || '';


/*************************************************
 * Please edit as necessary
 ************************************************/

try {
  validate(outputDir, entry, outputFile);
} catch (e) {
  console.log(e);
  process.exit();
}

const path = require('path');
const merge = require('webpack-merge');

const commonConfig = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, outputDir),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
};

const developmentConfig = {
  mode: 'development',
  output: {
    filename: outputFile,
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
    filename: outputFile.replace(/(.+)\.js$/, '$1.min.js'),
  },
};

module.exports = merge(commonConfig, mode === 'production' ? productionConfig : developmentConfig);


/*************************************************
 * Functions
 ************************************************/

/**
 * @param outputDir
 * @param entry
 * @param outputFile
 */
function validate(outputDir, entry, outputFile) {
  let errors = [];

  if (!outputDir) {
    errors.push('Please set `outputDir` variable for webpack.config.js .');
  }
  if (isEmptyObject(entry) || !entry) {
    errors.push('Please set `entry` variable for webpack.config.js .');
  }
  if (!outputFile) {
    errors.push('Please set `outputFile` variable for webpack.config.js .');
  }

  if (errors.length > 0) {
    errors.push('Example: https://github.com/punimeister/docker-webpack-typescript#example');
    throw errors.join('\n');
  }
}

/**
 * @param obj
 * @returns {boolean}
 */
function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

/**
 * @returns {[]}
 */
function pickEntriesFromEnv() {
  let entries = {};
  let prefix = 'ENTRY_';
  let environments = process.env;
  for (let key in environments) {
    if (environments.hasOwnProperty(key) && (new RegExp(`^${prefix}`)).test(key)) {
      entries[key.replace(prefix, '')] = environments[key];
    }
  }
  return isEmptyObject(entries) ? '' : entries;
}
