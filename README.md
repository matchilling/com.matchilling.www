# Personal website - matchilling.com

This repository contains the source code for [www.matchilling.com](https://www.matchilling.com).

## Running in development

`gatsby develop`

## How to use

### Build with Docker

```bash
# Build the Docker image:
$ docker build -f Dockerfile -t www .

# To build the static site, run:
$ docker run --rm -v "$(pwd)/docs:/app/public" www npm run build

# To serve the built site, run:
$ docker run --rm -p 8000:8000 -v "$(pwd)/public:/app/public" www npm run start -- -H 0.0.0.0 -p 8000

# Deploy to GitHub Pages:
$ docker run --rm -v "$(pwd)/public:/app/public" -www npm run deploy
```