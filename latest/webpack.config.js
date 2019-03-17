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
 * entry points
 * @type {{}|string}
 * @link https://webpack.js.org/concepts/entry-points/
 */
const entryPoints = pickEntryPointsFromEnv() || '';

/**
 * Directory in which bundle files output
 * (relative path from this file)
 * @type {string}
 */
const outputDirectory = process.env.OUTPUT_DIR || '';

/**
 * output filename
 * @type {string}
 * @link https://webpack.js.org/concepts/output/
 */
const outputFilename = process.env.OUTPUT_FILE || '';
const outputMinFilename = outputFilename.replace(/(.+)\.js$/, '$1.min.js');


/*************************************************
 * Please edit as necessary
 ************************************************/

try {
  validate({ entryPoints, outputDirectory, outputFilename });
} catch (e) {
  console.log(e);
  process.exit();
}

const webpack = require('webpack');
const merge = require('webpack-merge');
const { resolve } = require('path');

const commonConfig = {
  entry: entryPoints,
  output: {
    path: resolve(__dirname, outputDirectory),
    publicPath: `${resolve('/', outputDirectory)}/`,
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode),
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};

const developmentConfig = {
  mode: 'development',
  output: {
    filename: outputFilename,
    chunkFilename: outputFilename,
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
    filename: outputMinFilename,
    chunkFilename: outputMinFilename,
  },
};

module.exports = merge(commonConfig, (mode === 'production' ? productionConfig : developmentConfig));


/*************************************************
 * Functions
 ************************************************/

/**
 * @returns {string}
 */
function pickEntryPointsFromEnv() {
  const entries = {};
  const prefix = 'EP_';
  const environments = process.env;
  for (const key in environments) {
    if (environments.hasOwnProperty(key) && (new RegExp(`^${prefix}`)).test(key)) {
      entries[key.replace(prefix, '')] = environments[key];
    }
  }
  return isEmptyObject(entries) ? '' : entries;
}

/**
 * @param object
 * @returns {boolean}
 */
function isEmptyObject(object) {
  return !Object.keys(object).length;
}

/**
 * @param entryPoints
 * @param outputDirectory
 * @param outputFilename
 */
function validate({ entryPoints, outputDirectory, outputFilename }) {
  let errors = [];

  if (isEmptyObject(entryPoints) || !entryPoints) {
    errors.push(createErrorMessage('entryPoints'));
  }
  if (!outputDirectory) {
    errors.push(createErrorMessage('outputDirectory'));
  }
  if (!outputFilename) {
    errors.push(createErrorMessage('outputFilename'));
  }

  if (errors.length > 0) {
    errors.push('Example: https://github.com/punimeister/docker-webpack-babel#example');
    throw errors.join('\n');
  }
}

/**
 * @param target
 * @returns {string}
 */
function createErrorMessage(target) {
  return `Please set ${target} variable for webpack.config.js.`;
}
