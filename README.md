# Supported tags and respective `Dockerfile` links

- [`latest` (latest/Dockerfile)](https://github.com/punimeister/docker-webpack-typescript/blob/master/latest/Dockerfile)

## Environment Variables

### `MODE`

Will be used for webpack mode

### `EP_*`

Will be used for webpack entry points  
(See example for details)

### `OUTPUT_DIR`

Will be used for webpack output directory

### `OUTPUT_FILE`

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
      EP_main: './web/src/entry.ts'
      EP_sub: './web/src/sub.ts'
      OUTPUT_DIR: './web/public'
      OUTPUT_FILE: '[name].js'
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
  <script src="main.js"></script>
  <script src="sub.js"></script>
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
