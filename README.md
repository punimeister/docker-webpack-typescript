# punimeister/webpack-typescript

[![Docker Stars](https://img.shields.io/docker/stars/punimeister/webpack-typescript.svg)](https://hub.docker.com/r/punimeister/webpack-typescript/)
[![Docker Pulls](https://img.shields.io/docker/pulls/punimeister/webpack-typescript.svg)](https://hub.docker.com/r/punimeister/webpack-typescript/)
[![Docker Automated](https://img.shields.io/docker/automated/punimeister/webpack-typescript.svg)](https://hub.docker.com/r/punimeister/webpack-typescript/)
[![Docker Build](https://img.shields.io/docker/build/punimeister/webpack-typescript.svg)](https://hub.docker.com/r/punimeister/webpack-typescript/)

## Source Code

### [webpack-typescript:latest](https://github.com/punimeister/docker-webpack-typescript/tree/master/latest)

## Environment Variables

### `MODE`

Will be used for webpack mode

### `ENTRY_*`

Will be used for webpack entry points  
(See example for details)

### `OUT_DIR`

Will be used for webpack output directory

### `OUT_FILE`

Will be used for webpack output filename

## Example

### Directory structure

```
.
├── .gitignore
├── docker-compose.yml
└── web
    ├── public
    │   └── index.html
    └── src
        ├── entry.ts
        ├── module.ts
        └── sub.ts
```

### .gitignore

```
node_modules
*.js.map
```

### docker-compose.yml

```
version: '3'

services:

  webpack-typescript:
    image: 'punimeister/webpack-typescript'
    restart: 'on-failure'
    environment:
      MODE: 'development'
      ENTRY_main: './web/src/entry.ts'
      ENTRY_sub: './web/src/sub.ts'
      OUT_DIR: './web/public'
      OUT_FILE: '[name].js'
    volumes:
      - '.:/app'
```

### index.html

```
<!doctype html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>webpack typescript testing</title>
</head>
<body>
  <script src="main.bundle.js"></script>
  <script src="sub.bundle.js"></script>
</body>
</html>
```

### entry.ts

```
import greeting from './module';

let message: string = 'hello webpack';
greeting(message);
```

### module.ts

```
export default function greeting(msg: string) {
  alert(msg);
}
```

### sub.ts

```
import greeting from './module';

let message: string = 'nice to meet you';
greeting(message);
```
