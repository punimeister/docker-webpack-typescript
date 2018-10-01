FROM node:8.12-alpine

COPY package.json tsconfig.json webpack.config.js webpack.sh /tmp/

RUN mkdir -m 755 /app

WORKDIR /app

CMD sh /tmp/webpack.sh
