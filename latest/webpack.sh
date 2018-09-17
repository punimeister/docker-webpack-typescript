#! /bin/sh
if [ ! -e /app/package.json ]; then
  cp /tmp/package.json /app/
fi
if [ ! -e /app/webpack.config.js ]; then
  cp /tmp/webpack.config.js /app/
fi
if [ ! -e /app/tsconfig.json ]; then
  cp /tmp/tsconfig.json /app/
fi
yarn install --no-progress
npx webpack
